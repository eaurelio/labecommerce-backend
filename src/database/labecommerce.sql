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
  category TEXT NOT NULL
);

INSERT INTO products (id, name, price, category)
VALUES
  ('1', 'TECLADO', 120, 'HARDWARE'),
  ('2', 'MOUSE', 90, 'HARDWARE'),
  ('3', 'MONITOR', 950, 'HARDWARE'),
  ('4', 'GABINETE', 300, 'HARDWARE'),
  ('5', 'MOUSEPAD', 45, 'HARDWARE');

  
drop table users;
drop table products;


-- Aprofundando SQL
-- Get All Users
SELECT * FROM users;
ORDER BY email ASC;

-- Get All Products
SELECT * FROM products;

-- Search Product by name
SELECT * FROM products
WHERE name LIKE 'monitor';

-- Create User
INSERT INTO users (id, email, password)
VALUES ('4', 'edson.exe@outlook.com', '65sdf564fsd456');

-- Create Product
INSERT INTO products (id, name, price, category)
VALUES ('6', 'SUPORTE DE PAREDE PARA MONITOR', 190, 'ACESSORIOS');

-- Get Products by id
SELECT * FROM products
WHERE id like '2';

-- Delete User by id
DELETE FROM users
WHERE ID like '1';

-- Delete Product by id
DELETE FROM products
WHERE id LIKE '2';

-- Edit User by id
UPDATE users
SET email = 'beltranus@mail.com', password = '456564456'
WHERE id LIKE '2';

-- Edit Product by id
UPDATE products
SET name = 'SUP. PAREDE P/ MONITOR'
WHERE id like '6';

-- Get All Users Ordenado
SELECT * FROM users
ORDER BY email ASC;

--Get All Products versão 1
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 1;

--Get All Products versão 2
SELECT * FROM products
WHERE price > 100 and price < 300
ORDER BY price ASC;