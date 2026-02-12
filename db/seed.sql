-- Bird Boxes
INSERT INTO bird_box (
  name, location_lat, location_lng,
  status, status_updated_at, installed_at, notes
) VALUES
('Box A', 43.0843, -77.6740, 'active', strftime('%s','now'), strftime('%s','now'), 'Near tree line'),
('Box B', 43.0860, -77.6700, 'active', strftime('%s','now'), strftime('%s','now'), 'Open field');

-- Devices
INSERT INTO device (
  box_id, serial_number, power_type,
  last_seen_at, maintenance_status
) VALUES
(1, 'DEV-001', 'solar', strftime('%s','now'), 'ok'),
(2, 'DEV-002', 'battery', strftime('%s','now'), 'ok');

-- Species
INSERT INTO species (
  names
) VALUES
('Kestrel'),
('Bat'),
('Other');


-- Events
INSERT INTO event (
  device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature
) VALUES
-- February 1
(1, 1, 1, strftime('%s','2026-02-01 05:54:00'), '/images/kestrel/k1.jpg', 1, 22.5),
-- February 2
(2, 2, 3, strftime('%s','2026-02-02 05:54:00'), '/images/other/o1.jpg', 1, 20.1),
(1, 1, 2, strftime('%s','2026-02-02 14:23:00'), '/images/bat/b1.jpg', 0, 18.2),
-- February 3
(2, 2, 1, strftime('%s','2026-02-03 05:54:00'), '/images/kestrel/k2.jpg', 1, 21.3),
(1, 1, 3, strftime('%s','2026-02-03 09:18:00'), '/images/other/o2.jpg', 1, 19.8),
-- February 4
(1, 1, 2, strftime('%s','2026-02-04 11:45:00'), '/images/bat/b2.jpg', 0, 17.5),
(2, 2, 1, strftime('%s','2026-02-04 16:20:00'), '/images/kestrel/k3.jpg', 1, 23.1),
-- February 5
(2, 2, 1, strftime('%s','2026-02-05 08:30:00'), '/images/kestrel/k4.jpg', 1, 23.2),
(1, 1, 3, strftime('%s','2026-02-05 16:20:00'), '/images/other/o3.jpg', 1, 21.8),
-- February 6
(1, 1, 1, strftime('%s','2026-02-06 07:15:00'), '/images/kestrel/k5.jpg', 1, 24.1),
(2, 2, 3, strftime('%s','2026-02-06 13:40:00'), '/images/other/o4.jpg', 1, 22.3),
-- February 7
(2, 2, 2, strftime('%s','2026-02-07 19:42:00'), '/images/bat/b3.jpg', 0, 16.8),
(1, 1, 1, strftime('%s','2026-02-07 22:30:00'), '/images/kestrel/k6.jpg', 1, 20.5),
-- February 8
(1, 1, 3, strftime('%s','2026-02-08 06:25:00'), '/images/other/o5.jpg', 1, 22.7),
(2, 2, 1, strftime('%s','2026-02-08 13:50:00'), '/images/kestrel/k7.jpg', 1, 25.3),
-- February 9
(1, 1, 2, strftime('%s','2026-02-09 03:15:00'), '/images/bat/b4.jpg', 0, 15.9),
(2, 2, 1, strftime('%s','2026-02-09 12:30:00'), '/images/kestrel/k8.jpg', 1, 21.7),
-- February 10
(2, 2, 1, strftime('%s','2026-02-10 10:40:00'), '/images/kestrel/k9.jpg', 1, 23.8),
(1, 1, 3, strftime('%s','2026-02-10 17:55:00'), '/images/other/o6.jpg', 1, 21.2),
(2, 2, 2, strftime('%s','2026-02-10 21:10:00'), '/images/bat/b5.jpg', 0, 18.4),
-- February 11
(1, 1, 1, strftime('%s','2026-02-11 09:20:00'), '/images/kestrel/k10.jpg', 1, 24.6),
(2, 2, 3, strftime('%s','2026-02-11 15:45:00'), '/images/other/o7.jpg', 1, 20.9),
-- February 12
(2, 2, 3, strftime('%s','2026-02-12 12:35:00'), '/images/other/o8.jpg', 1, 22.1),
(1, 1, 1, strftime('%s','2026-02-12 18:45:00'), '/images/kestrel/k11.jpg', 1, 23.4),
-- February 13
(1, 1, 2, strftime('%s','2026-02-13 04:50:00'), '/images/bat/b6.jpg', 0, 17.2),
(2, 2, 1, strftime('%s','2026-02-13 14:25:00'), '/images/kestrel/k12.jpg', 1, 25.7),
-- February 14
(1, 1, 3, strftime('%s','2026-02-14 08:10:00'), '/images/other/o9.jpg', 1, 21.9),
(2, 2, 1, strftime('%s','2026-02-14 19:25:00'), '/images/kestrel/k13.jpg', 1, 24.0),
-- February 15
(2, 2, 1, strftime('%s','2026-02-15 11:30:00'), '/images/kestrel/k14.jpg', 1, 24.2),
(1, 1, 2, strftime('%s','2026-02-15 19:15:00'), '/images/bat/b7.jpg', 0, 19.3),
-- February 16
(1, 1, 1, strftime('%s','2026-02-16 06:40:00'), '/images/kestrel/k15.jpg', 1, 22.8),
(2, 2, 3, strftime('%s','2026-02-16 15:20:00'), '/images/other/o10.jpg', 1, 20.7),
-- February 17
(1, 1, 2, strftime('%s','2026-02-17 02:55:00'), '/images/bat/b8.jpg', 0, 16.5),
(2, 2, 1, strftime('%s','2026-02-17 11:10:00'), '/images/kestrel/k16.jpg', 1, 23.5),
-- February 18
(2, 2, 1, strftime('%s','2026-02-18 10:15:00'), '/images/kestrel/k17.jpg', 1, 23.9),
(1, 1, 3, strftime('%s','2026-02-18 16:45:00'), '/images/other/o11.jpg', 1, 22.3),
(2, 2, 2, strftime('%s','2026-02-18 20:30:00'), '/images/bat/b9.jpg', 0, 18.1),
-- February 19
(1, 1, 1, strftime('%s','2026-02-19 07:50:00'), '/images/kestrel/k18.jpg', 1, 24.5),
(2, 2, 3, strftime('%s','2026-02-19 14:35:00'), '/images/other/o12.jpg', 1, 21.1),
-- February 20
(2, 2, 3, strftime('%s','2026-02-20 13:25:00'), '/images/other/o13.jpg', 1, 21.6),
(1, 1, 1, strftime('%s','2026-02-20 18:50:00'), '/images/kestrel/k19.jpg', 1, 23.8),
-- February 21
(1, 1, 2, strftime('%s','2026-02-21 05:35:00'), '/images/bat/b10.jpg', 0, 17.8),
(2, 2, 1, strftime('%s','2026-02-21 14:10:00'), '/images/kestrel/k20.jpg', 1, 25.1),
-- February 22
(1, 1, 3, strftime('%s','2026-02-22 09:40:00'), '/images/other/o14.jpg', 1, 22.4),
(2, 2, 1, strftime('%s','2026-02-22 18:20:00'), '/images/kestrel/k21.jpg', 1, 23.7),
-- February 23
(1, 1, 2, strftime('%s','2026-02-23 03:45:00'), '/images/bat/b11.jpg', 0, 16.2),
(2, 2, 1, strftime('%s','2026-02-23 12:55:00'), '/images/kestrel/k22.jpg', 1, 24.4),
-- February 24
(2, 2, 1, strftime('%s','2026-02-24 11:55:00'), '/images/kestrel/k23.jpg', 1, 24.8),
(1, 1, 3, strftime('%s','2026-02-24 17:30:00'), '/images/other/o15.jpg', 1, 21.5),
-- February 25
(1, 1, 1, strftime('%s','2026-02-25 08:25:00'), '/images/kestrel/k24.jpg', 1, 23.6),
(2, 2, 2, strftime('%s','2026-02-25 15:40:00'), '/images/bat/b12.jpg', 0, 18.9),
-- February 26
(2, 2, 2, strftime('%s','2026-02-26 12:40:00'), '/images/bat/b13.jpg', 0, 19.1),
(1, 1, 1, strftime('%s','2026-02-26 19:50:00'), '/images/kestrel/k25.jpg', 1, 22.9),
-- February 27
(2, 2, 3, strftime('%s','2026-02-27 06:15:00'), '/images/other/o16.jpg', 1, 20.8),
(1, 1, 1, strftime('%s','2026-02-27 15:35:00'), '/images/kestrel/k26.jpg', 1, 24.3),
-- February 28
(1, 1, 2, strftime('%s','2026-02-28 04:20:00'), '/images/bat/b14.jpg', 0, 17.4),
(2, 2, 1, strftime('%s','2026-02-28 13:45:00'), '/images/kestrel/k27.jpg', 1, 25.2),
(1, 1, 3, strftime('%s','2026-02-28 20:10:00'), '/images/other/o17.jpg', 1, 22.6);


-- === NOTIFICATION TEST DATA ===

-- Unused box: Box C with no recent events (last event 45 days ago)
INSERT INTO bird_box (
  name, location_lat, location_lng,
  status, status_updated_at, installed_at, notes
) VALUES
('Box C', 43.0900, -77.6650, 'active', strftime('%s','now'), strftime('%s','now'), 'Near pond');

INSERT INTO device (
  box_id, serial_number, power_type,
  last_seen_at, maintenance_status
) VALUES
(3, 'DEV-003', 'solar', strftime('%s','now'), 'ok');

INSERT INTO event (
  device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature
) VALUES
(3, 3, 1, strftime('%s', 'now', '-45 days'), '/images/kestrel/k_old.jpg', 1, 22.0);

-- Corrupted data: events with NULL or empty image_url
INSERT INTO event (
  device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature
) VALUES
(1, 1, 1, strftime('%s','2026-02-10 08:00:00'), NULL, 1, 23.0),
(2, 2, 2, strftime('%s','2026-02-11 09:30:00'), '', 0, 19.5),
(1, 1, 3, strftime('%s','2026-02-12 10:15:00'), NULL, 1, 21.0);

-- Power log entries (includes low battery readings)
INSERT INTO power_log (
  device_id, timestamp, battery_voltage, status
) VALUES
(1, strftime('%s', 'now', '-7 days'), 4.2, 'ok'),
(1, strftime('%s', 'now', '-5 days'), 4.0, 'ok'),
(1, strftime('%s', 'now', '-3 days'), 3.8, 'ok'),
(1, strftime('%s', 'now', '-1 day'), 3.4, 'low'),
(2, strftime('%s', 'now', '-6 days'), 4.1, 'ok'),
(2, strftime('%s', 'now', '-4 days'), 3.9, 'ok'),
(2, strftime('%s', 'now'), 3.6, 'ok'),
(3, strftime('%s', 'now', '-10 days'), 4.0, 'ok'),
(3, strftime('%s', 'now'), 3.2, 'critical');

-- Disconnected box: Box D with device last seen 72 hours ago
INSERT INTO bird_box (
  name, location_lat, location_lng,
  status, status_updated_at, installed_at, notes
) VALUES
('Box D', 43.0920, -77.6680, 'active', strftime('%s','now'), strftime('%s','now'), 'Hilltop');

INSERT INTO device (
  box_id, serial_number, power_type,
  last_seen_at, maintenance_status
) VALUES
(4, 'DEV-004', 'battery', strftime('%s', 'now', '-72 hours'), 'issue');

INSERT INTO event (
  device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature
) VALUES
(4, 4, 1, strftime('%s', 'now', '-80 hours'), '/images/kestrel/k_disc.jpg', 1, 22.5);