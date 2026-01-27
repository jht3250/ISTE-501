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
  common_id, category, scientific_name
) VALUES
('bluebird', 'bird', 'Sialia sialis'),
('sparrow', 'bird', 'Passer domesticus');

-- Events
INSERT INTO event (
  device_id, box_id, species_id,
  common_name, timestamp, occupancy_flag, temperature
) VALUES
(1, 1, 1, 'Eastern Bluebird', strftime('%s','now'), 1, 22.5),
(2, 2, 2, 'House Sparrow', strftime('%s','now'), 0, 18.2);
