DROP DATABASE IF EXISTS traveltile;
CREATE DATABASE traveltile;

\c traveltile;

CREATE TABLE tile (
    ID SERIAL PRIMARY KEY,
    notes VARCHAR,
    itinerary DATE[]
);

CREATE TABLE photos (
    ID SERIAL PRIMARY KEY,
    tileID INT NOT NULL,
    url VARCHAR NOT NULL
);

CREATE TABLE finances (
    ID SERIAL PRIMARY KEY,
    tileID INT NOT NULL,
    categoryName VARCHAR DEFAULT NULL,
    amountInCents INT DEFAULT NULL
);

/*
CREATE TABLE gmaps (
    ID SERIAL PRIMARY KEY,
    tileID INT NOT NULL,
    latitude NUMERIC(9, 6) DEFAULT NULL,
    longitude NUMERIC(9, 6) DEFAULT NULL,
    zoom INT DEFAULT NULL
);

*/
