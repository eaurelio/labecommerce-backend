-- Active: 1679961137506@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT UNIQUE NOT NULL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL
);

INSERT INTO users (id, email, password)
VALUES
  ('1', 'fulano@mail.com', '564456456'),
  ('2', 'beotrano@mail.com', '765127845'),
  ('3', 'ciclano@mail.com', '65445263456dfsdfsfd');

CREATE TABLE products (
  id TEXT PRIMARY KEY UNIQUE NOT NULL,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  categoty TEXT NOT NULL
);

INSERT INTO products (id, name, price, categoty)
VALUES
  ('1', 'TECLADO', 120, 'HARDWARE'),
  ('2', 'MOUSE', 90, 'HARDWARE'),
  ('3', 'MONITOR', 950, 'HARDWARE'),
  ('4', 'GABINETE', 300, 'HARDWARE'),
  ('5', 'MOUSEPAD', 45, 'HARDWARE');

SELECT * FROM users;
SELECT * FROM products;

drop table users;
drop table products;