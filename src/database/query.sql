-- Active: 1682178484315@@127.0.0.1@3306
CREATE TABLE users (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL, 
  password TEXT NOT NULL,
  created_at TEXT DEFAULT current_timestamp
);
DROP TABLE users;
select * from users;

DROP TABLE products;
CREATE TABLE products (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT NOT NULL,
  imageUrl TEXT
);

CREATE TABLE purchases (
  id TEXT PRIMARY KEY NOT NULL UNIQUE,
  buyer TEXT NOT NULL,
  total_price REAL NOT NULL,
  paid INTEGER NOT NULL,
  created_at TEXT DEFAULT current_timestamp,
  Foreign Key (buyer) REFERENCES users(id)
);

drop table purchases;

drop table purchases_products;

select * from products;
select* from purchases;
select * from purchases_products;

CREATE TABLE purchases_products (
  purchase_id TEXT NOT NULL,
  product_id TEXT NOT NULL,
  quantity REAL NOT NULL,

  Foreign Key (purchase_id) REFERENCES purchases(id),
  Foreign Key (product_id) REFERENCES products(id)
);

SELECT * from purchases_products;

--------------------------------------------------------------------------------------
INSERT INTO users (id, name, email, password, created_at)
VALUES
  ('1', 'Aline', 'aline@mail.com', 'vbnbvnbvn', '2023-04-13 01:02:15'),
  ('2', 'Laís', 'lais@mail.com', 'fgssdfwer', '2023-04-13 01:02:15'),
  ('3', 'Claudio', 'claudio@mail.com', 'sdflkjsdfjhk', '2023-04-13 01:02:15'),
  ('4', 'Lana', 'lana@mail.com', 'skjdkjfne4u', '2023-04-13 01:02:15'),
  ('5', 'Edson', 'edson@mail.com', 'ioujmhndff', '2023-04-13 01:02:15'),
  ('6', 'Gianini', 'giani@mail.com', '87jhkjbsdf', '2023-04-13 01:02:15');

INSERT INTO products (id, name, price, description)
VALUES
  ('1', 'TECLADO', 120, 'HARDWARE'),
  ('2', 'MOUSE', 90, 'HARDWARE'),
  ('3', 'MONITOR', 950, 'HARDWARE'),
  ('4', 'GABINETE', 300, 'HARDWARE'),
  ('5', 'MOUSEPAD', 45, 'HARDWARE'),
  ('6', 'SUPORTE DE PAREDE P MONITOR', 89.90, 'HARDWARE'),
  ('7', 'RINGLIGHT SMALL', 33.50, 'HARDWARE');

INSERT INTO purchases (id, buyer, total_price, paid, created_at)
VALUES
  ('1', '6', 120, 1, '2023-04-13 01:06:10'),
  ('2', '4', 90, 1, '2023-04-13 01:06:10'),
  ('3', '3', 950, 1, '2023-04-13 01:06:10'),
  ('4', '2', 33.50, 1, '2023-04-13 01:06:10'),
  ('5', '5', 89.90, 1, '2023-04-13 01:06:10'),
  ('6', '1', 300, 1, '2023-04-13 01:06:10');

delete from purchases_products
where purchase_id = '7';
INSERT INTO purchases_products
VALUES
  ('1', '1', 1),
  ('2', '2', 1),
  ('3', '3', 1),
  ('4', '7', 1),
  ('5', '6', 1),
  ('6', '4', 1);

select * from purchases_products;


select current_timestamp;

select DATETIME('now', 'localtime');

select * from users;
 SELECT * FROM users
      WHERE id = '6';


select buyer as comprador, datetime(purchases.created_at, 'localtime') as data
from purchases;


SELECT 
  purchases.id as 'purchaseId',
  purchases.total_price as 'totalPrice',
  datetime(purchases.created_at, 'localtime') as 'createdAt',
  purchases.paid as 'isPaid',
  purchases.buyer as 'buyerId',
  users.email as 'email',
  users.name as 'name'
  FROM purchases
  INNER JOIN users
  ON purchases.buyer = users.id;