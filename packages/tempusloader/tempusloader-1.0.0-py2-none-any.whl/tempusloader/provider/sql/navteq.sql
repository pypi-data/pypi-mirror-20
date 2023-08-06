-- Tempus - Navteq SQL import Wrapper

-- Handle direction type
CREATE OR REPLACE FUNCTION _tempus_import.navteq_transport_direction(character varying, character varying, character varying, character varying, character varying, boolean)
RETURNS integer AS $$

DECLARE
        tt integer;
BEGIN
        tt :=0;
        IF $1 = 'Y' THEN tt := 4; END IF; -- cars
        IF $2 = 'Y' THEN tt := tt + 2 ; END IF; -- bicycles
        IF ($3 = 'Y' AND $2 = 'N') THEN tt := tt + 2 + 1 ; -- pedestrians and bicycles
        ELSIF ($3 = 'Y' AND $2 = 'Y') THEN tt := tt + 1 ; END IF ; -- pedestrians only (bicycles already inserted for $2 = 'Y')
        IF $4 = 'Y' THEN tt := tt + 8; END IF; -- taxis

        IF    (($5 IS NULL) OR ($5='B') OR ($5 = 'F' AND $6) OR ($5= 'T' AND NOT $6)) THEN RETURN tt;
        ELSIF (($5='T' AND $6 AND tt & 1 >0) OR ($5 = 'F' AND NOT $6 AND tt & 1 >0)) THEN RETURN 1; -- pedestrians are allowed to go back a one-way street
        ELSE RETURN 0;
        END IF;

        RETURN NULL;
END;
$$ LANGUAGE plpgsql;


-- TABLE road_node
INSERT INTO tempus.road_node
	SELECT
                DISTINCT id,
                false as bifurcation
        FROM
		(SELECT ref_in_id AS id  FROM _tempus_import.streets
		 UNION
                 SELECT nref_in_id AS id FROM _tempus_import.streets) as t;

update tempus.road_node
set
        geom = ST_Force_3DZ(ST_Transform(ST_StartPoint(st.geom),%(native_srid)))
from
        _tempus_import.streets as st
where
        id = ref_in_id;

update tempus.road_node
set
        geom = ST_Force_3DZ(ST_Transform(ST_EndPoint(st.geom),%(native_srid)))
from
        _tempus_import.streets as st
where
        id = nref_in_id;


-- TABLE road_section

-- Begin to remove all related constraints and index (performances concern)
ALTER TABLE tempus.road_section DROP CONSTRAINT road_section_node_from_fkey;
ALTER TABLE tempus.road_section DROP CONSTRAINT road_section_node_to_fkey;
ALTER TABLE tempus.road_section_speed DROP CONSTRAINT road_section_speed_road_section_id_fkey;
ALTER TABLE tempus.poi DROP CONSTRAINT poi_road_section_id_fkey;
ALTER TABLE tempus.pt_stop DROP CONSTRAINT pt_stop_road_section_id_fkey;
ALTER TABLE tempus.road_section DROP CONSTRAINT road_section_pkey;

-- Proceed to INSERT
INSERT INTO tempus.road_section

SELECT
	link_id AS id,

        CASE func_class
		WHEN '1' THEN 1
		WHEN '2' THEN 1
		WHEN '3' THEN 2
                WHEN '4' THEN 3
                WHEN '5' THEN 4
		ELSE 5 -- others
	END AS road_type,

	ref_in_id AS node_from,
	nref_in_id AS node_to,

        _tempus_import.navteq_transport_direction(ar_auto, ar_bus, ar_pedest, ar_taxis, dir_travel::character varying, true) AS transport_type_ft,
        _tempus_import.navteq_transport_direction(ar_auto, ar_bus, ar_pedest, ar_taxis, dir_travel::character varying, false) AS transport_type_tf,

	ST_Length(geom) AS length,
	fr_spd_lim AS car_speed_limit,

	st_name AS road_name,

	CASE lane_cat::integer
		WHEN 0 THEN NULL
		WHEN 1 THEN 1
		WHEN 2 THEN 2
		WHEN 3 THEN 4
		ELSE NULL
	END AS lane,

	roundabout = 'Y' AS rounadbout,
	bridge = 'Y' AS bridge,
	tunnel = 'Y' AS tunnel,
	ramp = 'Y' AS ramp,
	tollway = 'Y' AS tollway,

	ST_Transform(ST_Force_3DZ(ST_LineMerge(geom)), %(native_srid)) AS geom
	-- FIXME remove ST_LineMerge call as soon as loader will use Simple geometry option

FROM _tempus_import.streets AS st;

-- Restore constraints and index
ALTER TABLE tempus.road_section ADD CONSTRAINT road_section_pkey
	PRIMARY KEY (id);

ALTER TABLE tempus.road_section ADD CONSTRAINT road_section_node_from_fkey
	FOREIGN KEY (node_from) REFERENCES tempus.road_node;
ALTER TABLE tempus.road_section ADD CONSTRAINT road_section_node_to_fkey
	FOREIGN KEY (node_to) REFERENCES tempus.road_node;

ALTER TABLE tempus.road_section_speed ADD CONSTRAINT road_section_speed_road_section_id_fkey
        FOREIGN KEY (road_section_id) REFERENCES tempus.road_section
        ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE tempus.poi ADD CONSTRAINT poi_road_section_id_fkey
        FOREIGN KEY (road_section_id) REFERENCES tempus.road_section;
ALTER TABLE tempus.pt_stop ADD CONSTRAINT pt_stop_road_section_id_fkey
	FOREIGN KEY (road_section_id) REFERENCES tempus.road_section;



INSERT INTO tempus.road_daily_profile
(
    SELECT row_number() over ( ORDER BY speed_cat ) as id,
                0 as begin_time,
                5 as speed_rule,
                24*60-1 as end_time,
                CASE streets.speed_cat::integer
                WHEN 1 THEN 130
                WHEN 2 THEN 115
                WHEN 3 THEN 95
                WHEN 4 THEN 80
                WHEN 5 THEN 60
                WHEN 6 THEN 40
                WHEN 7 THEN 20
                WHEN 8 THEN 10
                ELSE NULL
               END AS average_speed
    FROM _tempus_import.streets
    GROUP BY speed_cat
    ORDER BY speed_cat
);



INSERT INTO tempus.road_section_speed
(
    SELECT link_id as road_section_id,
            0 as period_id,
            speed_cat::integer as road_daily_profile
    FROM _tempus_import.streets
);



-- Set bifurcation flag
update tempus.road_node
set
        bifurcation = true
where id in
(
        select
                rn.id as id
        from
                tempus.road_node as rn,
                tempus.road_section as rs
        where
                rs.node_from = rn.id
        or
                rs.node_to = rn.id
        group by
	        rn.id
        having count(*) > 2
);


-- TABLE road_restriction
INSERT INTO tempus.road_restriction
SELECT
	mcond_id AS id,
	array_agg(link ORDER BY mseq_number) AS sections
FROM
(
-- select first link id of the sequence
	(
	SELECT
		cdms.cond_id::bigint AS mcond_id,
		rdms.link_id::bigint AS link,
		0 as mseq_number -- first item of the sequence
	FROM _tempus_import.cdms AS cdms
	JOIN _tempus_import.rdms AS rdms
	ON cdms.cond_id = rdms.cond_id
	WHERE (cond_type = 7 OR cond_type = 1) -- 7 for driving manoeuvres, 1 for tolls
		AND seq_number = 1 -- only select the first item of the sequence
	)
	UNION
	(
	-- union with remaining link ids
	SELECT
		cdms.cond_id::bigint as mcond_id,
		man_linkid::bigint as link,
		seq_number as mseq_number -- here seq_number >= 1
	FROM _tempus_import.cdms as cdms
	JOIN _tempus_import.rdms as rdms
	ON cdms.cond_id = rdms.cond_id
	WHERE (cond_type = 7 OR cond_type = 1)  -- 7 for driving manoeuvres, 1 for tolls
	)
) AS t
GROUP BY mcond_id
;

--
-- TABLE tempus.road_restriction_time_penalty
INSERT INTO tempus.road_restriction_time_penalty
SELECT
        cond_id::bigint as restriction_id,
        0 as period_id,
        case when ar_pedstrn = 'Y' then 1 else 0 end
        + case when ar_bus = 'Y' then 2 else 0 end  -- restrictions applied to buses, are considered applied to bicycles
        + case when ar_auto = 'Y' then 4 else 0 end
        + case when ar_taxis = 'Y' then 8 else 0 end
	as traffic_rules,
        'Infinity'::float as time_value
FROM
	_tempus_import.cdms as cdms
WHERE
        cond_type = 7
        AND (ar_pedstrn = 'Y' OR ar_bus = 'Y' or ar_auto = 'Y' or ar_taxis = 'Y');

INSERT INTO tempus.road_restriction_toll
SELECT
        cond_id::bigint as restriction_id,
        0 as period_id,
        case when ar_pedstrn = 'Y' then 1 else 0 end
        + case when ar_auto = 'Y' then 4 else 0 end
        + case when ar_taxis = 'Y' then 8 else 0 end
        as toll_rules,
        NULL AS toll_value
FROM
	_tempus_import.cdms as cdms
WHERE
        cond_type = 1
        AND (ar_pedstrn = 'Y' or ar_auto = 'Y' or ar_taxis = 'Y');

-- Updates the road traffic direction with table cdms (cond_type = 5)
UPDATE tempus.road_section
SET traffic_rules_ft = traffic_rules_ft
        + case when ar_pedstrn = 'Y'  and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'FROM REFERENCE NODE')) AND ((traffic_rules_ft & 1) = 0) then 1 else 0 end
        + case when ar_bus = 'Y' and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'FROM REFERENCE NODE' )) AND ((traffic_rules_ft & 2) = 0) then 2 else 0 end -- bicycles are considered allowed to ride on bus lanes
        + case when ar_auto = 'Y' and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'FROM REFERENCE NODE')) AND ((traffic_rules_ft & 4) = 0) then 4 else 0 end
        + case when ar_taxis = 'Y' and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'FROM REFERENCE NODE')) AND ((traffic_rules_ft & 8) = 0) then 8 else 0 end,
    traffic_rules_tf = traffic_rules_tf
        + case when ar_pedstrn = 'Y'  and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'TO REFERENCE NODE')) AND ((traffic_rules_tf & 1) = 0)then 1 else 0 end
        + case when ar_bus = 'Y' and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'TO REFERENCE NODE' )) AND ((traffic_rules_tf & 2) = 0) then 2 else 0 end
        + case when ar_auto = 'Y' and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'TO REFERENCE NODE')) AND ((traffic_rules_tf & 4) = 0) then 4 else 0 end
        + case when ar_taxis = 'Y' and ((cond_val1 = 'BOTH DIRECTIONS') OR (cond_val1 = 'TO REFERENCE NODE')) AND ((traffic_rules_tf & 8) = 0) then 8 else 0 end
FROM _tempus_import.cdms as cdms
WHERE cdms.cond_type = 5 AND cdms.link_id = road_section.id;

-- TABLE tempus.poi : insert car parks
INSERT INTO tempus.poi(id, poi_type, name, parking_transport_modes, road_section_id, abscissa_road_section, geom)
SELECT poi_id as id,
        1 as poi_type,
        poi_name as name,
        array[3] as parking_transport_modes,
        link_id as road_section_id,
        st_LineLocatePoint(road_section.geom, ST_Transform(parking.geom,%(native_srid)))::double precision as abscissa_road_section,
        st_force3DZ(st_setsrid(st_transform(parking.geom, %(native_srid)), %(native_srid)))
FROM _tempus_import.parking, tempus.road_section
WHERE road_section.id = parking.link_id;


-- Deleting road sections with no traffic rules allowed
DELETE FROM tempus.road_section
WHERE traffic_rules_ft=0 AND traffic_rules_tf=0;

-- Deleting road restrictions associated to unreferenced road sections
DELETE FROM tempus.road_restriction_time_penalty WHERE restriction_id IN
(
	SELECT distinct id
	FROM
	(
		SELECT q.id, q.road_section, q.rang, s.node_from, s.node_to
		FROM
		(SELECT road_restriction.id, unnest(road_restriction.sections) as road_section, tempus.array_search(unnest(road_restriction.sections), sections) as rang
		  FROM tempus.road_restriction) as q
		LEFT JOIN tempus.road_section as s
			ON s.id=q.road_section
	) t
	WHERE node_from IS NULL
);

DELETE FROM tempus.road_restriction_toll WHERE restriction_id IN
(
	SELECT distinct id
	FROM
	(
		SELECT q.id, q.road_section, q.rang, s.node_from, s.node_to
		FROM
		(
		SELECT road_restriction.id, unnest(road_restriction.sections) as road_section, tempus.array_search(unnest(road_restriction.sections), sections) as rang
		  FROM tempus.road_restriction) as q
		LEFT JOIN tempus.road_section as s
			ON s.id=q.road_section
	) t
	WHERE node_from is null
);

DELETE FROM tempus.road_restriction WHERE id IN
(
	SELECT distinct id
	FROM
	(
		SELECT q.id, q.road_section, q.rang, s.node_from, s.node_to
		FROM
		(
		SELECT road_restriction.id, unnest(road_restriction.sections) as road_section, tempus.array_search(unnest(road_restriction.sections), sections) as rang
		  FROM tempus.road_restriction) as q
		LEFT JOIN tempus.road_section as s
			ON s.id=q.road_section
	) t
	WHERE node_from is null
);

-- Removing import function (direction type)
DROP FUNCTION _tempus_import.navteq_transport_direction(character varying, character varying, character varying, character varying, character varying, boolean);

-- Vacuuming database
VACUUM FULL ANALYSE;


