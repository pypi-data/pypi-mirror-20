/*
        Substitutions options
        network: name of the PT network
        native_srid: SRID code of the road network
        create_road_nodes: if true, new nodes and sections will be created for PT stops that are too far from the road network.
                           this allows to import a GTFS network without an underlying road network
*/
do $$
begin
raise notice '==== Init ===';
end$$;
-- pt_stop_id_map
drop table if exists _tempus_import.pt_stop_idmap;
create table _tempus_import.pt_stop_idmap
(
        id serial primary key,
        vendor_id varchar
);

select setval('_tempus_import.pt_stop_idmap_id_seq', (select case when max(id) is null then 1 else max(id)+1 end from tempus.pt_stop), false);
insert into _tempus_import.pt_stop_idmap (vendor_id)
       select stop_id from _tempus_import.stops;
create index pt_stop_idmap_vendor_idx on _tempus_import.pt_stop_idmap(vendor_id);

-- pt_route_id_map
drop table if exists _tempus_import.pt_route_idmap;
create table _tempus_import.pt_route_idmap
(
        id serial primary key,
        vendor_id varchar
);
select setval('_tempus_import.pt_route_idmap_id_seq', (select case when max(id) is null then 1 else max(id)+1 end from tempus.pt_route), false);
insert into _tempus_import.pt_route_idmap (vendor_id)
       select route_id from _tempus_import.routes;
create index pt_route_idmap_vendor_idx on _tempus_import.pt_route_idmap(vendor_id);

-- pt_agency_id_map
drop table if exists _tempus_import.pt_agency_idmap;
create table _tempus_import.pt_agency_idmap
(
	id serial primary key,
	vendor_id varchar
);
select setval('_tempus_import.pt_agency_idmap_id_seq', (select case when max(id) is null then 1 else max(id)+1 end from tempus.pt_agency), false);
insert into _tempus_import.pt_agency_idmap(vendor_id)
	select agency_id from _tempus_import.agency;
	create index pt_agency_idmap_vendor_idx on _tempus_import.pt_agency_idmap(vendor_id);

-- pt_trip_id_map
drop table if exists _tempus_import.pt_trip_idmap;
create table _tempus_import.pt_trip_idmap
(
        id serial primary key,
        vendor_id varchar
);
select setval('_tempus_import.pt_trip_idmap_id_seq', (select case when max(id) is null then 1 else max(id)+1 end from tempus.pt_trip), false);
insert into _tempus_import.pt_trip_idmap (vendor_id)
       select trip_id from _tempus_import.trips;
create index pt_trip_idmap_vendor_idx on _tempus_import.pt_trip_idmap(vendor_id);

-- pt_service_id_map
drop table if exists _tempus_import.pt_service_idmap;
create table _tempus_import.pt_service_idmap
(
	id serial primary key,
	vendor_id varchar
);
select setval('_tempus_import.pt_service_idmap_id_seq', (select case when max(service_id) is null then 1 else max(service_id)+1 end from ((select service_id from tempus.pt_calendar) union (select service_id from tempus.pt_calendar_date)) r ), false);
insert into _tempus_import.pt_service_idmap( vendor_id )
	select service_id from _tempus_import.calendar union select service_id from _tempus_import.calendar_dates;
create index pt_service_idmap_vendor_idx on _tempus_import.pt_service_idmap(vendor_id);

-- copy to pt_service
-- (_tempus_import is local for this import session)
insert into tempus.pt_service (service_id, vendor_id)
select id, vendor_id from _tempus_import.pt_service_idmap;

-- pt_fare_id_map
drop table if exists _tempus_import.pt_fare_idmap;
create table _tempus_import.pt_fare_idmap
(
        id serial primary key,
        vendor_id varchar
);
select setval('_tempus_import.pt_fare_idmap_id_seq', (select case when max(id) is null then 1 else max(id)+1 end from tempus.pt_fare_attribute));
insert into _tempus_import.pt_fare_idmap (vendor_id)
       select fare_id from _tempus_import.fare_attributes;
create index pt_fare_idmap_vendor_idx on _tempus_import.pt_fare_idmap(vendor_id);

do $$
begin
raise notice '==== PT network ====';
end$$;
/* ==== PT network ==== */
-- insert a new network (with null name for now) FIXME get the name from the command line
insert into tempus.pt_network(pnname)
select '%(network)';

insert into
	tempus.pt_agency (id, paname, network_id)
select
	(select id from _tempus_import.pt_agency_idmap where vendor_id=agency_id) as id,
	agency_name,
	(select id from tempus.pt_network as pn order by import_date desc limit 1) as network_id
from
	_tempus_import.agency;

/* ==== Stops ==== */

-- add geometry index on stops import table
-- geometries should have been created in stops table
-- during importation with 2154 srid from x, y latlon fields
-- st_transform(st_setsrid(st_point(stop_lon, stop_lat), 4326), 2154)
drop table if exists _tempus_import.stops_geom;
create table
	_tempus_import.stops_geom as
select
	stop_id
	, st_force_3DZ(st_transform(st_setsrid(st_point(stop_lon, stop_lat), 4326), %(native_srid))) as geom
from
	_tempus_import.stops;

drop index if exists _tempus_import.idx_stops_geom;
create index idx_stops_geom on _tempus_import.stops_geom using gist(geom);
drop index if exists _tempus_import.idx_stops_stop_id;
create index idx_stops_stop_id on _tempus_import.stops (stop_id);
drop index if exists _tempus_import.idx_stops_geom_stop_id;
create index idx_stops_geom_stop_id on _tempus_import.stops_geom (stop_id);

-- remove constraint on tempus stops and dependencies
alter table tempus.pt_stop drop CONSTRAINT if exists pt_stop_road_section_id_fkey;
alter table tempus.pt_stop drop CONSTRAINT if exists pt_stop_parent_station_fkey;
alter table tempus.pt_stop_time drop constraint if exists pt_stop_time_stop_id_fkey;
alter table tempus.pt_section drop constraint if exists pt_section_stop_from_fkey;
alter table tempus.pt_section drop constraint if exists pt_section_stop_to_fkey;

do $$
begin
if %(create_road_nodes) then
    raise notice '==== Insert new road nodes if needed ====';

   /* ==== Stops ==== */

    drop sequence if exists tempus.seq_road_node_id;
    create sequence tempus.seq_road_node_id start with 1;
    perform setval('tempus.seq_road_node_id', (select max(id) from tempus.road_node));
    
    drop table if exists _tempus_import.new_nodes;
    create /*temporary*/
    table _tempus_import.new_nodes as
    select
       stop_id,
       nextval('tempus.seq_road_node_id')::bigint as node_id,
       nextval('tempus.seq_road_node_id')::bigint as node_id2
    from
    (
    select
    		distinct stops.stop_id
    	from
    		_tempus_import.stops
    	join
    		_tempus_import.stops_geom
    	on
    		stops.stop_id = stops_geom.stop_id
    	left join
    		tempus.road_section as rs
    	on
    		-- only consider road sections within xx meters
    		-- stops further than this distance will not be included
    		st_dwithin(stops_geom.geom, rs.geom, case when %(native_srid) = 4326 then 0.015 else 500 end)
    	where
    	     rs.id is null
    ) as t;
    
    insert into tempus.road_node
    select
       nn.node_id as id,
       false as bifurcation,
       st_force3DZ( st_translate(geom, case when %(native_srid) = 4326 then -0.0001 else -10 end,0,0) ) as geom
       from _tempus_import.new_nodes as nn,
            _tempus_import.stops_geom as sg
       where
            nn.stop_id = sg.stop_id
    union all
    select
       nn.node_id2 as id,
       false as bifurcation,
       st_force3DZ( st_translate(geom,case when %(native_srid) = 4326 then 0.0001 else 10 end,0,0) ) as geom
       from _tempus_import.new_nodes as nn,
            _tempus_import.stops_geom as sg
       where
            nn.stop_id = sg.stop_id
    ;
    
    drop sequence if exists tempus.seq_road_section_id;
    create sequence tempus.seq_road_section_id start with 1;
    perform setval('tempus.seq_road_section_id', (select max(id) from tempus.road_section));
    
    insert into tempus.road_section
            (id, road_type, node_from, node_to, traffic_rules_ft, traffic_rules_tf, length, car_speed_limit, road_name, lane, roundabout, bridge, tunnel, ramp, tollway, geom)
    select
       nextval('tempus.seq_road_section_id')::bigint as id,
       1 as road_type, -- ??
       node_id as node_from,
       node_id2 as node_to,
       32767 as traffic_rules_ft,
       32767 as traffic_rules_tf,
       0 as length,
       0 as car_speed_limit,
       '' as road_name,
       1 as lane,
       false as roundabout,
       false as bridge,
       false as tunnel,
       false as ramp,
       false as tollway,
       -- create an artificial line around the stop
       st_makeline(st_translate(geom, case when %(native_srid) = 4326 then -0.0001 else -10 end,0,0),
                   st_translate(geom, case when %(native_srid) = 4326 then 0.0001 else 10 end,0,0)) as geom
    from
       _tempus_import.new_nodes as nn,
       _tempus_import.stops_geom as sg
    where nn.stop_id = sg.stop_id
    ;
else
    raise notice '==== No additional road nodes ====';
end if;
end$$;

do $$
begin
raise notice '==== PT stops ====';
end$$;

insert into
	tempus.pt_stop
select
	(select id from _tempus_import.pt_stop_idmap where vendor_id=stop_id) as id,
        stop_id as vendor_id
	, stop_name as psname
	, location_type::boolean as location_type
        , (select id from _tempus_import.pt_stop_idmap where vendor_id=parent_station) as parent_station
	, road_section_id::bigint as road_section_id
	, zone_id::integer as zone_id
	-- abscissa_road_section is a float between 0 and 1
	, st_lineLocatePoint(geom_road, geom)::double precision as abscissa_road_section
	, geom
 from (
	select
		stops.*
		, stops_geom.geom as geom
		, first_value(rs.id) over nearest as road_section_id
		, first_value(rs.geom) over nearest as geom_road
		, row_number() over nearest as nth
	from
		_tempus_import.stops
	join
		_tempus_import.stops_geom
	on
		stops.stop_id = stops_geom.stop_id
	join
		tempus.road_section as rs
	on
		-- only consider road sections within xx meters
		-- stops further than this distance will not be included
		st_dwithin(stops_geom.geom, rs.geom, case when %(native_srid) = 4326 then 0.015 else 500 end)
	window
		-- select the nearest road geometry for each stop
		nearest as (partition by stops.stop_id order by st_distance(stops_geom.geom, rs.geom))
) as stops_ratt
where
	-- only take one rattachement
	nth = 1;

-- set parent_station to null when the parent_station is not present (out of road network scope ?)
update tempus.pt_stop
set parent_station=null
where id in
      (
      select
        s1.id
      from
        tempus.pt_stop as s1
      left join
        tempus.pt_stop as s2
      on s1.parent_station = s2.id
      where
        s1.parent_station is not null
        and s2.id is null
);

-- restore constraints on pt_stop
alter table tempus.pt_stop add CONSTRAINT pt_stop_road_section_id_fkey FOREIGN KEY (road_section_id)
      REFERENCES tempus.road_section (id);
alter table tempus.pt_stop add CONSTRAINT pt_stop_parent_station_fkey FOREIGN KEY (parent_station)
	REFERENCES tempus.pt_stop (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

/* ==== /stops ==== */

do $$
begin
raise notice '==== Transport modes ====';
end$$;

CREATE TABLE _tempus_import.transport_mode
(
  id serial NOT NULL,
  name character varying, -- Description of the mode
  public_transport boolean NOT NULL,
  gtfs_route_type integer -- Reference to the equivalent GTFS code (for PT only)
);

drop sequence if exists _tempus_import.transport_mode_id;
create sequence _tempus_import.transport_mode_id start with 1;
select setval('_tempus_import.transport_mode_id', (select max(id) from tempus.transport_mode));

INSERT INTO _tempus_import.transport_mode(id, name, public_transport, gtfs_route_type)
SELECT
        nextval('_tempus_import.transport_mode_id') as id,
	case
        when r.route_type = 0 then 'Tram (%(network))'
        when r.route_type = 1 then 'Subway (%(network))'
        when r.route_type = 2 then 'Train (%(network))'
        when r.route_type = 3 then 'Bus (%(network))'
        when r.route_type = 4 then 'Ferry (%(network))'
        when r.route_type = 5 then 'Cable-car (%(network))'
        when r.route_type = 6 then 'Suspended Cable-Car (%(network))'
        when r.route_type = 7 then 'Funicular (%(network))'
        end,
	TRUE,
	r.route_type
FROM (SELECT DISTINCT route_type FROM _tempus_import.routes) r
;

INSERT INTO tempus.transport_mode(id, name, public_transport, gtfs_route_type)
SELECT
	id, name, public_transport, gtfs_route_type
FROM _tempus_import.transport_mode;

do $$
begin
raise notice '==== PT routes ====';
end$$;
/* ==== GTFS routes ==== */
-- drop constraints
alter table tempus.pt_route drop CONSTRAINT pt_route_agency_id_fkey;

insert into tempus.pt_route( id, vendor_id, short_name, long_name, transport_mode, agency_id )
select * from
(select
	(select id from _tempus_import.pt_route_idmap where vendor_id=route_id) as id
        , route_id as vendor_id
	, route_short_name as short_name
	, route_long_name as long_name
	, transport_mode.id
        -- use the agency_id if available, else set to the only one in agency.txt
        , (select id from _tempus_import.pt_agency_idmap where vendor_id = (case when agency_id is null then (select agency_id from _tempus_import.agency) else agency_id end) ) as agency_id
from
	_tempus_import.routes, _tempus_import.transport_mode
	where transport_mode.gtfs_route_type = routes.route_type::integer
) q;

-- restore constraints
alter table tempus.pt_route add CONSTRAINT pt_route_agency_id_fkey FOREIGN KEY (agency_id)
	REFERENCES tempus.pt_agency (id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;

do $$
begin
raise notice '==== PT sections ====';
end$$;
/* ==== sections ==== */
-- drop constraints
alter table tempus.pt_section drop constraint if exists pt_section_network_id_fkey;;

insert into tempus.pt_section (stop_from, stop_to, network_id, geom)
with pt_seq as (
        select
                trip_id
                -- gtfs stop sequences can have holes
                -- use the dense rank to have then continuous
                , dense_rank() over win as stopseq
                , stop_sequence
                , stop_id
        from
                _tempus_import.stop_times
        window win as (
                partition by trip_id order by stop_sequence
        )
)
select

        distinct foo.stop_from
        , foo.stop_to
        , (select id from tempus.pt_network as pn order by import_date desc limit 1) as network_id
        -- Geometry is a line between stops
        -- FIXME : if we have a shape.txt, could be a full shape
        , st_force_3DZ(st_setsrid(st_makeline(g1.geom, g2.geom), %(native_srid))) as geom
from (
        select
                (select id from _tempus_import.pt_stop_idmap where vendor_id=t1.stop_id) as stop_from,
                (select id from _tempus_import.pt_stop_idmap where vendor_id=t2.stop_id) as stop_to,
                routes.route_type
        from
                pt_seq as t1
        join
                pt_seq as t2
        on
                t1.trip_id = t2.trip_id
                and t1.stopseq = t2.stopseq - 1
        join
                _tempus_import.trips
        on
                t1.trip_id = trips.trip_id
        join
                _tempus_import.routes
        on
                trips.route_id = routes.route_id
        group by
            t1.stop_id, t2.stop_id, route_type
) as foo
join
        -- get the from stop geometry
        tempus.pt_stop as g1
on
        stop_from = g1.id
join
        -- get the to stop geometry
        tempus.pt_stop as g2
on
        stop_to = g2.id ;

-- restore constraints
alter table tempus.pt_section add constraint pt_section_stop_from_fkey FOREIGN KEY (stop_from)
      REFERENCES tempus.pt_stop(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;
alter table tempus.pt_section add constraint pt_section_stop_to_fkey FOREIGN KEY (stop_to)
      REFERENCES tempus.pt_stop(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;


/* ==== GTFS calendar ==== */

do $$
begin
raise notice '==== PT calendar ====';
end$$;
insert into tempus.pt_calendar
select
	(select id from _tempus_import.pt_service_idmap where vendor_id=service_id) as service_id
	, monday::boolean as monday
	, tuesday::boolean as tuesday
	, wednesday::boolean as wednesday
	, thursday::boolean as thursday
	, friday::boolean as friday
	, saturday::boolean as saturday
	, sunday::boolean as sunday
	, start_date::date as start_date
	, end_date::date as end_date
from
	_tempus_import.calendar;


do $$
begin
raise notice '==== PT trips ====';
end$$;
-- drop constraints
alter table tempus.pt_trip drop constraint if exists pt_trip_route_id_fkey;;

insert into tempus.pt_trip(id, vendor_id, route_id, service_id, short_name)
	select * from
	(
	select
		(select id from _tempus_import.pt_trip_idmap where vendor_id=trip_id)
		, trip_id
		, (select id from _tempus_import.pt_route_idmap where vendor_id=route_id) as rid
		, (select id from _tempus_import.pt_service_idmap where vendor_id=service_id) as sid
		, trip_short_name
	from
		_tempus_import.trips) q
	where sid is not null and rid is not null;

-- restore constraints
alter table tempus.pt_trip add constraint pt_trip_route_id_fkey FOREIGN KEY(route_id)
	REFERENCES tempus.pt_route(id) MATCH SIMPLE ON UPDATE CASCADE ON DELETE CASCADE;;

do $$
begin
raise notice '==== PT calendar dates ====';
end$$;

insert into
	tempus.pt_calendar_date(service_id, calendar_date, exception_type)
select
        (select id from _tempus_import.pt_service_idmap where vendor_id=service_id) as service_id
	, "date"::date as calendar_date
	, exception_type::integer as exception_type
from
	_tempus_import.calendar_dates;


do $$
begin
raise notice '==== PT stop times ====';
end$$;

-- convert GTFS time to regular time
-- GTFS time may be greater than 24
-- we apply here a modulo 24
-- when arrival is < departure, it means the arrival occurs the next day
CREATE OR REPLACE FUNCTION _tempus_import.format_gtfs_time(text)
RETURNS time without time zone AS $$
BEGIN
        IF substr($1,1,2)::integer > 23 THEN
           RETURN ((substr($1,1,2)::integer % 24) || substr($1,3,6))::time without time zone;
        ELSE
           RETURN $1::time without time zone;
        END IF;
END;
$$ LANGUAGE plpgsql;


insert into
	tempus.pt_stop_time (trip_id, arrival_time, departure_time, stop_id, stop_sequence, stop_headsign
	, pickup_type, drop_off_type, shape_dist_traveled)
select * from
(
	select
		(select id from _tempus_import.pt_trip_idmap where vendor_id=trip_id) as trip_id
		, _tempus_import.format_gtfs_time(arrival_time) as arrival_time
		, _tempus_import.format_gtfs_time(departure_time) as departure_time
		, (select id from _tempus_import.pt_stop_idmap where vendor_id=stop_id) as stop_id
		, stop_sequence::integer as stop_sequence
		, stop_headsign
		, pickup_type::integer as pickup_type
		, drop_off_type::integer as drop_off_type
		, shape_dist_traveled::double precision as shape_dist_traveled
	from
		_tempus_import.stop_times) q
where trip_id in (select id from tempus.pt_trip) and stop_id in (select id from tempus.pt_stop);

-- restore constraints

do $$
begin
raise notice '==== Update PT networks ====';
end$$;

-- Update network begin and end calendar dates
UPDATE tempus.pt_network
SET calendar_begin = req.min, calendar_end = req.max
FROM
(
	WITH req_min AS (
	SELECT service_id, min(calendar_date)
	FROM
	(
	SELECT service_id, start_date as calendar_date FROM tempus.pt_calendar
	UNION
	SELECT service_id, calendar_date FROM tempus.pt_calendar_date
	) r
	GROUP BY service_id
	ORDER BY service_id
	),
	req_max AS (
	SELECT service_id, max(calendar_date)
	FROM
	(
	SELECT service_id, start_date as calendar_date FROM tempus.pt_calendar
	UNION
	SELECT service_id, calendar_date FROM tempus.pt_calendar_date
	) r
	GROUP BY service_id
	ORDER BY service_id
	)
	SELECT pt_agency.network_id, min(req_min.min), max(req_max.max)
	  FROM tempus.pt_trip, tempus.pt_route, tempus.pt_agency, req_min, req_max
	  WHERE pt_agency.id = pt_route.agency_id AND pt_route.id = pt_trip.route_id AND pt_trip.service_id = req_min.service_id AND pt_trip.service_id = req_max.service_id
	  GROUP BY pt_agency.network_id
	  ORDER BY network_id
) req
WHERE req.network_id = pt_network.id;

do $$
begin
raise notice '==== PT fare attribute ====';
end$$;

insert into
	tempus.pt_fare_attribute
select
	(select id from _tempus_import.pt_fare_idmap where vendor_id=fare_id) as fare_id
        , fare_id as vendor_id
	, price::double precision as price
	, currency_type::char(3) as currency_type
	-- FIXME : same in tempus than GTFS ?
	, transfers::integer as transfers
	, transfer_duration::integer as transfer_duration
from
	_tempus_import.fare_attributes;

do $$
begin
raise notice '==== PT frequency ====';
end$$;
insert into
	tempus.pt_frequency (trip_id, start_time, end_time, headway_secs)
select
	(select id from _tempus_import.pt_trip_idmap where vendor_id=trip_id) as trip_id
	, _tempus_import.format_gtfs_time(start_time) as start_time
	, _tempus_import.format_gtfs_time(end_time) as end_time
	, headway_secs::integer as headway_secs
from
	_tempus_import.frequencies;


do $$
begin
raise notice '==== PT fare rule ====';
end$$;
insert into
	tempus.pt_fare_rule (fare_id, route_id, origin_id, destination_id, contains_id)
select
	(select id from _tempus_import.pt_fare_idmap where vendor_id=fare_id) as fare_id
	, (select id from _tempus_import.pt_route_idmap where vendor_id=route_id) as route_id
	, (select id from _tempus_import.pt_stop_idmap where vendor_id=origin_id) as origin_id
	, (select id from _tempus_import.pt_stop_idmap where vendor_id=destination_id) as destination_id
	, (select id from _tempus_import.pt_stop_idmap where vendor_id=contains_id) as contains_id
from
	_tempus_import.fare_rules;

do $$
begin
raise notice '==== PT transfer ====';
end$$;

drop sequence if exists seq_transfer_id;
create sequence seq_transfer_id start with 1;
select setval('seq_transfer_id', (select max(id) from tempus.road_section));

drop sequence if exists seq_node_id;
create sequence seq_node_id start with 1;
select setval('seq_node_id', (select max(id) from tempus.road_node));

-- add a road_node for each pt_stop involved in a transfer
insert into
	tempus.road_node
select
        nextval('seq_node_id')::bigint as id,
        false as bifurcation,
        geom
from
(
select
        distinct pt_stop.id, pt_stop.geom
from
        _tempus_import.transfers,
        tempus.pt_stop
where
	transfer_type::integer = 2
and
        (pt_stop.id = (select id from _tempus_import.pt_stop_idmap where vendor_id=from_stop_id)
or
        pt_stop.id = (select id from _tempus_import.pt_stop_idmap where vendor_id=to_stop_id))
)
t;

-- add a road_section for each transfer
insert into
	tempus.road_section
        (id, road_type, node_from, node_to, traffic_rules_ft, traffic_rules_tf, length, car_speed_limit, road_name, lane, roundabout, bridge, tunnel, ramp, tollway, geom)
select
   nextval('seq_transfer_id')::bigint as id,
   5 as road_type, -- "other"
   node1.id as node_from,
   node2.id as node_to,
   1 as traffic_rules_ft,
   0 as traffic_rules_tf,
   min_transfer_time::float * 5000 / 3600.0 as length, -- convert from time to distance (multiply by walking speed)
   0 as car_speed_limit,
   '' as road_name,
   1 as lane,
   false as roundabout,
   false as bridge,
   false as tunnel,
   false as ramp,
   false as tollway,
   -- create an artificial line
   st_makeline(node1.geom, node2.geom)
from
   _tempus_import.transfers,
   tempus.pt_stop as node1,
   tempus.pt_stop as node2
where
   transfer_type::integer = 2
and
   node1.id = (select id from _tempus_import.pt_stop_idmap where vendor_id = from_stop_id)
and
   node2.id = (select id from _tempus_import.pt_stop_idmap where vendor_id = to_stop_id)
;

alter table tempus.pt_stop_time add constraint pt_stop_time_stop_id_fkey FOREIGN KEY (stop_id)
      REFERENCES tempus.pt_stop (id)  ON UPDATE CASCADE ON DELETE CASCADE;


do $$
begin
raise notice '==== Adding views and cleaning data';
end
$$;

select tempus.update_pt_views();

-- delete stops not involved in a section and not parent of another stop
delete from tempus.pt_stop
where id IN
(

select stop.id
from
   tempus.pt_stop as stop
left join
   tempus.pt_stop as stop2
on stop.id = stop2.parent_station
left join
   tempus.pt_section as s1
on s1.stop_from = stop.id
left join
   tempus.pt_section as s2
on s2.stop_to = stop.id
where
   s1.stop_from is null and
   s2.stop_to is null and
   stop2.parent_station is null
)
;
