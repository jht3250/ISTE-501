PRAGMA foreign_keys = ON;

DROP TABLE IF EXISTS data_export;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS power_log;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS species;
DROP TABLE IF EXISTS device;
DROP TABLE IF EXISTS bird_box;

CREATE TABLE bird_box (
    box_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location_lat REAL NOT NULL,
    location_lng REAL NOT NULL,
    status TEXT NOT NULL,
    status_updated_at INTEGER NOT NULL,
    installed_at INTEGER NOT NULL,
    notes TEXT
);

CREATE TABLE device (
    device_id INTEGER PRIMARY KEY AUTOINCREMENT,
    box_id INTEGER NOT NULL,
    serial_number TEXT NOT NULL UNIQUE,
    power_type TEXT NOT NULL,
    last_seen_at INTEGER NOT NULL,
    maintenance_status TEXT NOT NULL,
    FOREIGN KEY (box_id) REFERENCES bird_box(box_id) ON DELETE CASCADE
);

CREATE TABLE species (
    species_id INTEGER PRIMARY KEY AUTOINCREMENT,
    names TEXT NOT NULL UNIQUE
);

CREATE TABLE event (
    event_id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id INTEGER NOT NULL,
    box_id INTEGER NOT NULL,
    species_id INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    image_url TEXT,
    occupancy_flag INTEGER NOT NULL,
    temperature REAL,
    FOREIGN KEY (device_id) REFERENCES device(device_id) ON DELETE CASCADE,
    FOREIGN KEY (box_id) REFERENCES bird_box(box_id) ON DELETE CASCADE,
    FOREIGN KEY (species_id) REFERENCES species(species_id) ON DELETE RESTRICT
);

CREATE TABLE power_log (
    log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    device_id INTEGER NOT NULL,
    timestamp INTEGER NOT NULL,
    battery_voltage REAL NOT NULL,
    status TEXT NOT NULL,
    FOREIGN KEY (device_id) REFERENCES device(device_id) ON DELETE CASCADE
);

CREATE TABLE user_account (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    reset_token TEXT,
    reset_token_expires_at INTEGER
);

CREATE TABLE data_export (
    export_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    box_id INTEGER NOT NULL,
    date_range_start INTEGER,
    date_range_end INTEGER,
    file_format TEXT NOT NULL,
    created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
    status TEXT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user_account(user_id) ON DELETE CASCADE,
    FOREIGN KEY (box_id) REFERENCES bird_box(box_id) ON DELETE CASCADE
);
