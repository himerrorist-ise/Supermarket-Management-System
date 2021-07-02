CREATE DATABASE SuperMarketDB
GO

USE SuperMarketDB
GO

CREATE TABLE CategoryTable (
	categoryID INT NOT NULL PRIMARY KEY,
	categoryName VARCHAR(50) NOT NULL,
	categoryDescription VARCHAR(100) NOT NULL
)

CREATE TABLE ProductTable (
	productID INT NOT NULL PRIMARY KEY,
	productName VARCHAR(50) NOT NULL,
	productQuantity INT NOT NULL,
	productPrice INT NOT NULL,
	productCategory VARCHAR(50) NOT NULL
)

CREATE TABLE SellerTable (
	sellerID INT NOT NULL PRIMARY KEY,
	sellerName VARCHAR(50) NOT NULL,
	sellerAge INT NOT NULL,
	sellerPhone VARCHAR(50) NOT NULL,
	sellerPassword VARCHAR(50) NOT NULL
)

CREATE TABLE BillTable (
	billID INT NOT NULL PRIMARY KEY,
	sellerName VARCHAR(50) NOT NULL,
	billDate VARCHAR(50) NOT NULL,
	totalAmount INT NOT NULL
)

CREATE TABLE ManagerTable (
	managerID INT NOT NULL PRIMARY KEY,
	managerName VARCHAR(50) NOT NULL,
	managerAge INT NOT NULL,
	managerPhone VARCHAR(50) NOT NULL,
	managerAddress VARCHAR(100),
	managerPassword VARCHAR(50) NOT NULL
)