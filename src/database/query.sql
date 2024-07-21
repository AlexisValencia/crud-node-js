CREATE DATABASE Prueba01;
CREATE USER 'alexisnode'@'localhost' IDENTIFIED BY 'alexis';
GRANT ALL PRIVILEGES ON Prueba01.* TO 'alexisnode'@'localhost';
FLUSH PRIVILEGES;
USE Prueba01;
CREATE TABLE IF NOT EXISTS personas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    idtoken CHAR(36) DEFAULT (UUID()),
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    age INT
);

SELECT * FROM personas
