DROP DATABASE IF EXISTS yelgat;
CREATE DATABASE yelgat;
USE yelgat;
DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  location VARCHAR(80) NOT NULL,
  reviews INT NULL,
  friends INT NULL,
  thumbnail VARCHAR(300) NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS  restaurants ;
CREATE TABLE  restaurants  (
   id  INT NOT NULL AUTO_INCREMENT,
   name_city_number  VARCHAR(80) NOT NULL, -- primary means of looking up stuff --
   name  VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);
DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
   id  INT NOT NULL AUTO_INCREMENT,
   id_users  INT NOT NULL,
   id_restaurants  INT NOT NULL,
   text  VARCHAR(5000) NULL,
   createdAt  INT NOT NULL,
   stars  INT NULL,
  PRIMARY KEY (id)
);
ALTER TABLE  reviews  ADD FOREIGN KEY (id_users) REFERENCES  users  ( id );
ALTER TABLE  reviews  ADD FOREIGN KEY (id_restaurants) REFERENCES  restaurants  ( id );
