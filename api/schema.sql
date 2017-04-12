create database matentus;
use matentus;

create table categories (
	id INT AUTO_INCREMENT,
	title VARCHAR(50),
	PRIMARY KEY(id)
);

create table subcategories (
	id INT AUTO_INCREMENT,
	title VARCHAR(50),
	category_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(category_id) references categories(id)
);

create table properties (
	id INT AUTO_INCREMENT,
	property varchar(50),
	PRIMARY KEYid)
);

create table products (
	id INT AUTO_INCREMENT,
	title VARCHAR(100),
	description TEXT,
	image VARCHAR(100),
	likes INT,
	approved BOOL,
	subcategory_id INT,
	PRIMARY KEYid),
	FOREIGN KEY(subcategory_id) references subcategories(id)
);

create table users (
	id INT AUTO_INCREMENT,
	name VARCHAR(100),
	email VARCHAR(250),
	password VARCHAR(100),
	PRIMARY KEY(id)
);

create table comments (
	id INT AUTO_INCREMENT,
	text TEXT,
	timestamp DATETIME,
	user_id INT,
	product_id INT,
	PRIMARY KEY(id),
	FOREIGN KEY(user_id) references users(id),
	FOREIGN KEY(product_id) references products(id)
);

create table product_property_relations (
	product_id INT,
	property_id INT,
	FOREIGN KEY(product_id) references products(id),
	FOREIGN KEY(property_id) references properties(id)
);