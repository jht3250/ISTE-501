-- ============================================================
-- Bird Boxes  (box_id 1-5 are the real locations)
-- ============================================================
INSERT INTO bird_box (name, location_lat, location_lng, status, status_updated_at, installed_at, notes, image_url) VALUES
('Salmon Creek',   43.0843, -77.6740, 'active', strftime('%s','now'), strftime('%s','now'), 'Near tree line',  '/SalmonCreek.png'),
('Irene Gossin',   43.0860, -77.6700, 'active', strftime('%s','now'), strftime('%s','now'), 'Open field',      '/IreneGossin.png'),
('Macyville Woods',43.0900, -77.6650, 'active', strftime('%s','now'), strftime('%s','now'), 'Near pond',       '/MacyvilleWoods.png'),
('Corbett''s Glen',43.0920, -77.6680, 'active', strftime('%s','now'), strftime('%s','now'), 'Hilltop',         '/CorbettGlen.png'),
('Kraai Preserve', 43.0930, -77.6660, 'active', strftime('%s','now'), strftime('%s','now'), 'Near creek',      '/KraaiPreserve.png');

-- Corrupted / test boxes (box_id 6-7, excluded from dashboard)
INSERT INTO bird_box (name, location_lat, location_lng, status, status_updated_at, installed_at, notes) VALUES
('Invalid Location', 43.0850, -77.6720, 'active', strftime('%s','now'), strftime('%s','now'), NULL),
('???',              43.0870, -77.6710, 'active', strftime('%s','now'), strftime('%s','now'), NULL);

-- ============================================================
-- Devices
-- ============================================================
INSERT INTO device (box_id, serial_number, power_type, last_seen_at, maintenance_status) VALUES
(1, 'DEV-001',    'solar',   strftime('%s','now'),            'ok'),
(2, 'DEV-002',    'battery', strftime('%s','now'),            'ok'),
(3, 'DEV-003',    'solar',   strftime('%s','now'),            'ok'),
(4, 'DEV-004',    'battery', strftime('%s', 'now', '-72 hours'), 'issue'),
(5, 'DEV-005',    'solar',   strftime('%s','now'),            'ok'),
(6, 'DEV-006',    'solar',   strftime('%s','now'),            'ok'),
(7, 'DEV-007',    'battery', strftime('%s','now'),            'ok');

-- ============================================================
-- Species
-- ============================================================
INSERT INTO species (names) VALUES
('Kestrel'),
('Bat'),
('Other'),
('Unknown Bird'),
('ERROR_SPECIES');

-- ============================================================
-- Power logs  (device 1 has low battery; device 4 = Corbett's Glen disconnected)
-- ============================================================
INSERT INTO power_log (device_id, timestamp, battery_voltage, status) VALUES
(1, strftime('%s', 'now', '-7 days'), 4.2, 'ok'),
(1, strftime('%s', 'now', '-5 days'), 4.0, 'ok'),
(1, strftime('%s', 'now', '-3 days'), 3.8, 'ok'),
(1, strftime('%s', 'now', '-1 day'),  3.4, 'low'),
(2, strftime('%s', 'now', '-6 days'), 4.1, 'ok'),
(2, strftime('%s', 'now', '-4 days'), 3.9, 'ok'),
(2, strftime('%s', 'now'),            3.6, 'ok'),
(3, strftime('%s', 'now', '-10 days'),4.0, 'ok'),
(3, strftime('%s', 'now'),            3.2, 'critical');

-- ============================================================
-- Events — Salmon Creek (box 1, device 1)  Feb 2026
-- ============================================================
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature) VALUES
(1,1,1, strftime('%s','2026-02-01 05:54:00'), '/images/kestrel/k1.jpg',  1, 22.5),
(1,1,2, strftime('%s','2026-02-02 14:23:00'), '/images/bat/b1.jpg',      0, 18.2),
(1,1,3, strftime('%s','2026-02-03 09:18:00'), '/images/other/o2.jpg',    1, 19.8),
(1,1,2, strftime('%s','2026-02-04 11:45:00'), '/images/bat/b2.jpg',      0, 17.5),
(1,1,3, strftime('%s','2026-02-05 16:20:00'), '/images/other/o3.jpg',    1, 21.8),
(1,1,1, strftime('%s','2026-02-06 07:15:00'), '/images/kestrel/k5.jpg',  1, 24.1),
(1,1,1, strftime('%s','2026-02-07 22:30:00'), '/images/kestrel/k6.jpg',  1, 20.5),
(1,1,3, strftime('%s','2026-02-08 06:25:00'), '/images/other/o5.jpg',    1, 22.7),
(1,1,2, strftime('%s','2026-02-09 03:15:00'), '/images/bat/b4.jpg',      0, 15.9),
(1,1,3, strftime('%s','2026-02-10 17:55:00'), '/images/other/o6.jpg',    1, 21.2),
(1,1,1, strftime('%s','2026-02-11 09:20:00'), '/images/kestrel/k10.jpg', 1, 24.6),
(1,1,1, strftime('%s','2026-02-12 18:45:00'), '/images/kestrel/k11.jpg', 1, 23.4),
(1,1,2, strftime('%s','2026-02-13 04:50:00'), '/images/bat/b6.jpg',      0, 17.2),
(1,1,3, strftime('%s','2026-02-14 08:10:00'), '/images/other/o9.jpg',    1, 21.9),
(1,1,2, strftime('%s','2026-02-15 19:15:00'), '/images/bat/b7.jpg',      0, 19.3),
(1,1,1, strftime('%s','2026-02-16 06:40:00'), '/images/kestrel/k15.jpg', 1, 22.8),
(1,1,2, strftime('%s','2026-02-17 02:55:00'), '/images/bat/b8.jpg',      0, 16.5),
(1,1,3, strftime('%s','2026-02-18 16:45:00'), '/images/other/o11.jpg',   1, 22.3),
(1,1,1, strftime('%s','2026-02-19 07:50:00'), '/images/kestrel/k18.jpg', 1, 24.5),
(1,1,1, strftime('%s','2026-02-20 18:50:00'), '/images/kestrel/k19.jpg', 1, 23.8),
(1,1,2, strftime('%s','2026-02-21 05:35:00'), '/images/bat/b10.jpg',     0, 17.8),
(1,1,3, strftime('%s','2026-02-22 09:40:00'), '/images/other/o14.jpg',   1, 22.4),
(1,1,2, strftime('%s','2026-02-23 03:45:00'), '/images/bat/b11.jpg',     0, 16.2),
(1,1,1, strftime('%s','2026-02-24 17:30:00'), '/images/other/o15.jpg',   1, 21.5),
(1,1,1, strftime('%s','2026-02-25 08:25:00'), '/images/kestrel/k24.jpg', 1, 23.6),
(1,1,1, strftime('%s','2026-02-26 19:50:00'), '/images/kestrel/k25.jpg', 1, 22.9),
(1,1,1, strftime('%s','2026-02-27 15:35:00'), '/images/kestrel/k26.jpg', 1, 24.3),
(1,1,2, strftime('%s','2026-02-28 04:20:00'), '/images/bat/b14.jpg',     0, 17.4);

-- ============================================================
-- Events — Irene Gossin (box 2, device 2)  Feb 2026
-- ============================================================
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature) VALUES
(2,2,3, strftime('%s','2026-02-02 05:54:00'), '/images/other/o1.jpg',    1, 20.1),
(2,2,1, strftime('%s','2026-02-03 05:54:00'), '/images/kestrel/k2.jpg',  1, 21.3),
(2,2,1, strftime('%s','2026-02-04 16:20:00'), '/images/kestrel/k3.jpg',  1, 23.1),
(2,2,1, strftime('%s','2026-02-05 08:30:00'), '/images/kestrel/k4.jpg',  1, 23.2),
(2,2,3, strftime('%s','2026-02-06 13:40:00'), '/images/other/o4.jpg',    1, 22.3),
(2,2,2, strftime('%s','2026-02-07 19:42:00'), '/images/bat/b3.jpg',      0, 16.8),
(2,2,1, strftime('%s','2026-02-08 13:50:00'), '/images/kestrel/k7.jpg',  1, 25.3),
(2,2,1, strftime('%s','2026-02-09 12:30:00'), '/images/kestrel/k8.jpg',  1, 21.7),
(2,2,1, strftime('%s','2026-02-10 10:40:00'), '/images/kestrel/k9.jpg',  1, 23.8),
(2,2,2, strftime('%s','2026-02-10 21:10:00'), '/images/bat/b5.jpg',      0, 18.4),
(2,2,3, strftime('%s','2026-02-11 15:45:00'), '/images/other/o7.jpg',    1, 20.9),
(2,2,3, strftime('%s','2026-02-12 12:35:00'), '/images/other/o8.jpg',    1, 22.1),
(2,2,1, strftime('%s','2026-02-13 14:25:00'), '/images/kestrel/k12.jpg', 1, 25.7),
(2,2,1, strftime('%s','2026-02-14 19:25:00'), '/images/kestrel/k13.jpg', 1, 24.0),
(2,2,1, strftime('%s','2026-02-15 11:30:00'), '/images/kestrel/k14.jpg', 1, 24.2),
(2,2,3, strftime('%s','2026-02-16 15:20:00'), '/images/other/o10.jpg',   1, 20.7),
(2,2,1, strftime('%s','2026-02-17 11:10:00'), '/images/kestrel/k16.jpg', 1, 23.5),
(2,2,1, strftime('%s','2026-02-18 10:15:00'), '/images/kestrel/k17.jpg', 1, 23.9),
(2,2,2, strftime('%s','2026-02-18 20:30:00'), '/images/bat/b9.jpg',      0, 18.1),
(2,2,3, strftime('%s','2026-02-19 14:35:00'), '/images/other/o12.jpg',   1, 21.1),
(2,2,3, strftime('%s','2026-02-20 13:25:00'), '/images/other/o13.jpg',   1, 21.6),
(2,2,1, strftime('%s','2026-02-21 14:10:00'), '/images/kestrel/k20.jpg', 1, 25.1),
(2,2,1, strftime('%s','2026-02-22 18:20:00'), '/images/kestrel/k21.jpg', 1, 23.7),
(2,2,1, strftime('%s','2026-02-23 12:55:00'), '/images/kestrel/k22.jpg', 1, 24.4),
(2,2,1, strftime('%s','2026-02-24 11:55:00'), '/images/kestrel/k23.jpg', 1, 24.8),
(2,2,2, strftime('%s','2026-02-25 15:40:00'), '/images/bat/b12.jpg',     0, 18.9),
(2,2,2, strftime('%s','2026-02-26 12:40:00'), '/images/bat/b13.jpg',     0, 19.1),
(2,2,3, strftime('%s','2026-02-27 06:15:00'), '/images/other/o16.jpg',   1, 20.8),
(2,2,1, strftime('%s','2026-02-28 13:45:00'), '/images/kestrel/k27.jpg', 1, 25.2),
(2,2,3, strftime('%s','2026-02-28 20:10:00'), '/images/other/o17.jpg',   1, 22.6);

-- ============================================================
-- Events — Macyville Woods (box 3, device 3)  Mar–Apr 2026
-- ============================================================
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature, confidence) VALUES
(3,3,1, strftime('%s','2026-03-02 07:00:00'), '/images/kestrel/k1.jpg',  1, 21.1, 91.2),
(3,3,2, strftime('%s','2026-03-05 20:00:00'), '/images/bat/b2.jpg',      1, 16.4, 88.5),
(3,3,1, strftime('%s','2026-03-08 06:00:00'), '/images/kestrel/k3.jpg',  1, 22.3, 93.1),
(3,3,3, strftime('%s','2026-03-11 09:00:00'), '/images/other/o2.jpg',    1, 19.8, 77.4),
(3,3,1, strftime('%s','2026-03-14 08:00:00'), '/images/kestrel/k5.jpg',  1, 23.5, 90.7),
(3,3,2, strftime('%s','2026-03-17 21:00:00'), '/images/bat/b4.jpg',      1, 15.9, 85.3),
(3,3,1, strftime('%s','2026-03-20 07:00:00'), '/images/kestrel/k7.jpg',  1, 22.8, 94.6),
(3,3,3, strftime('%s','2026-03-23 10:00:00'), '/images/other/o4.jpg',    1, 20.1, 72.9),
(3,3,1, strftime('%s','2026-03-26 06:00:00'), '/images/kestrel/k9.jpg',  1, 23.2, 89.8),
(3,3,2, strftime('%s','2026-03-29 19:00:00'), '/images/bat/b6.jpg',      1, 17.2, 87.1),
(3,3,1, strftime('%s','2026-04-01 08:00:00'), '/images/kestrel/k11.jpg', 1, 22.0, 92.4),
(3,3,3, strftime('%s','2026-04-03 11:00:00'), '/images/other/o6.jpg',    1, 19.5, 74.6),
(3,3,1, strftime('%s','2026-04-05 07:00:00'), '/images/kestrel/k13.jpg', 1, 24.1, 95.2);

-- ============================================================
-- Events — Corbett's Glen (box 4, device 4)  Mar–Apr 2026
-- ============================================================
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature, confidence) VALUES
(4,4,2, strftime('%s','2026-03-01 20:00:00'), '/images/bat/b1.jpg',      1, 15.3, 89.7),
(4,4,1, strftime('%s','2026-03-04 07:00:00'), '/images/kestrel/k2.jpg',  1, 21.8, 88.3),
(4,4,2, strftime('%s','2026-03-07 21:00:00'), '/images/bat/b3.jpg',      1, 16.1, 91.5),
(4,4,1, strftime('%s','2026-03-10 08:00:00'), '/images/kestrel/k4.jpg',  1, 22.6, 87.9),
(4,4,2, strftime('%s','2026-03-13 20:00:00'), '/images/bat/b5.jpg',      1, 17.4, 93.2),
(4,4,3, strftime('%s','2026-03-16 10:00:00'), '/images/other/o3.jpg',    1, 20.3, 71.8),
(4,4,2, strftime('%s','2026-03-19 21:00:00'), '/images/bat/b1.jpg',      1, 16.8, 90.4),
(4,4,1, strftime('%s','2026-03-22 07:00:00'), '/images/kestrel/k6.jpg',  1, 23.1, 86.7),
(4,4,2, strftime('%s','2026-03-25 20:00:00'), '/images/bat/b2.jpg',      1, 15.7, 92.8),
(4,4,1, strftime('%s','2026-03-28 08:00:00'), '/images/kestrel/k8.jpg',  1, 22.4, 89.1),
(4,4,2, strftime('%s','2026-03-31 21:00:00'), '/images/bat/b3.jpg',      1, 16.5, 94.3),
(4,4,1, strftime('%s','2026-04-02 07:00:00'), '/images/kestrel/k10.jpg', 1, 23.7, 87.5),
(4,4,2, strftime('%s','2026-04-04 20:00:00'), '/images/bat/b4.jpg',      1, 17.0, 91.9),
(4,4,1, strftime('%s','2026-04-06 08:00:00'), '/images/kestrel/k12.jpg', 1, 24.5, 90.2);

-- Corbett's Glen disconnected event (recent, for notification test)
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature) VALUES
(4,4,1, strftime('%s', 'now', '-80 hours'), '/images/kestrel/k_disc.jpg', 1, 22.5);

-- ============================================================
-- Events — Kraai Preserve (box 5, device 5)  Mar–Apr 2026
-- ============================================================
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature, confidence) VALUES
(5,5,1, strftime('%s','2026-03-03 07:00:00'), '/images/kestrel/k14.jpg', 1, 22.0, 90.5),
(5,5,2, strftime('%s','2026-03-06 21:00:00'), '/images/bat/b5.jpg',      1, 16.7, 88.2),
(5,5,1, strftime('%s','2026-03-09 08:00:00'), '/images/kestrel/k15.jpg', 1, 23.3, 92.7),
(5,5,3, strftime('%s','2026-03-12 10:00:00'), '/images/other/o5.jpg',    1, 20.6, 76.1),
(5,5,1, strftime('%s','2026-03-15 07:00:00'), '/images/kestrel/k16.jpg', 1, 22.9, 94.0),
(5,5,2, strftime('%s','2026-03-18 20:00:00'), '/images/bat/b6.jpg',      1, 15.4, 87.6),
(5,5,1, strftime('%s','2026-03-21 08:00:00'), '/images/kestrel/k17.jpg', 1, 23.8, 91.3),
(5,5,3, strftime('%s','2026-03-24 11:00:00'), '/images/other/o7.jpg',    1, 19.9, 73.5),
(5,5,2, strftime('%s','2026-03-27 21:00:00'), '/images/bat/b1.jpg',      1, 17.1, 89.9),
(5,5,1, strftime('%s','2026-03-30 07:00:00'), '/images/kestrel/k18.jpg', 1, 24.2, 93.6),
(5,5,2, strftime('%s','2026-04-02 20:00:00'), '/images/bat/b2.jpg',      1, 16.3, 86.8),
(5,5,1, strftime('%s','2026-04-05 08:00:00'), '/images/kestrel/k19.jpg', 1, 23.5, 95.1);

-- Kraai Preserve unused box (last event 45 days ago, for notification test)
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature) VALUES
(5,5,1, strftime('%s', 'now', '-45 days'), '/images/kestrel/k_old.jpg', 1, 22.0);

-- ============================================================
-- Corrupted data (boxes 6-7, for notification test)
-- ============================================================
INSERT INTO event (device_id, box_id, species_id, timestamp, image_url, occupancy_flag, temperature) VALUES
-- Null image
(1,1,1, strftime('%s', 'now', '-1 day'),  NULL, 1, 22.0),
(2,2,2, strftime('%s', 'now', '-2 days'), NULL, 0, 18.5),
-- Empty image
(1,1,3, strftime('%s', 'now', '-3 days'), '', 1, 21.0),
(2,2,1, strftime('%s', 'now', '-4 days'), '', 1, 23.5),
-- Corrupted timestamp
(1,1,1, 0, '/images/kestrel/k1.jpg', 1, 20.0),
(2,2,2, 0, '/images/bat/b1.jpg',     0, 19.0),
-- Corrupted species
(1,1,4, strftime('%s', 'now', '-1 day'),  '/images/kestrel/k2.jpg', 1, 21.5),
(2,2,5, strftime('%s', 'now', '-2 days'), '/images/other/o1.jpg',   1, 20.5),
-- Corrupted box location
(6,6,1, strftime('%s', 'now', '-1 day'),  '/images/kestrel/k3.jpg', 1, 23.0),
(7,7,2, strftime('%s', 'now', '-2 days'), '/images/bat/b2.jpg',     0, 17.5);
