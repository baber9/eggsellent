### Schema

CREATE DATABASE egg_db;
USE egg_db;

CREATE TABLE eggs
(
	id int NOT NULL AUTO_INCREMENT,
	egg_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);
