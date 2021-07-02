USE SuperMarketDB
GO

/* LOGIN */
CREATE PROCEDURE GetSellerUser(
	@sellerName VARCHAR(50),
	@sellerPassword VARCHAR(50)
)
	AS
		BEGIN
			SELECT COUNT(1) FROM SellerTable
				WHERE sellerName = @sellerName and sellerPassword = @sellerPassword
		END;
GO

CREATE PROCEDURE GetManagerUser(
	@managerName VARCHAR(50),
	@managerPassword VARCHAR(50)
)
	AS
		BEGIN
			SELECT COUNT(1) FROM ManagerTable
				WHERE managerName = @managerName and managerPassword = @managerPassword
		END;
GO

/* CATEGORY */
CREATE PROCEDURE AddCategory (
	@categoryID INT,
	@categoryName VARCHAR(50),
	@categoryDescription VARCHAR(50)
)
	AS
		BEGIN
			INSERT INTO CategoryTable VALUES (@categoryID, @categoryName, @categoryDescription)
		END;
GO

CREATE PROCEDURE DisplayAllCategories
	AS
		BEGIN
			SELECT * FROM CategoryTable
		END;
GO

CREATE PROCEDURE DeleteCategory (
	@categoryID INT
)
	AS
		BEGIN
			DELETE FROM CategoryTable WHERE categoryID = @categoryID
		END;
GO

CREATE PROCEDURE UpdateCategory (
	@categoryID INT,
	@categoryName VARCHAR(50),
	@categoryDescription VARCHAR(50)
)
	AS
		BEGIN
			UPDATE CategoryTable
				SET categoryName = @categoryName,
					categoryDescription = @categoryDescription
					WHERE categoryID = @categoryID
		END;
GO

CREATE PROCEDURE GetCategoryNames
	AS
		BEGIN
			SELECT categoryName from CategoryTable
		END;
GO

/* PRODUCT */
CREATE PROCEDURE AddProduct (
	@productID INT,
	@productName VARCHAR(50),
	@productQuantity VARCHAR(50),
	@productPrice INT,
	@productCategory VARCHAR(50)
)
	AS
		BEGIN
			INSERT INTO ProductTable VALUES (@productID, @productName, @productQuantity, @productPrice, @productCategory)
		END;
GO

CREATE PROCEDURE DisplayAllProducts
	AS
		BEGIN
			SELECT * FROM ProductTable
		END;
GO

CREATE PROCEDURE DeleteProduct (
	@productID INT
)
	AS
		BEGIN
			DELETE FROM ProductTable WHERE productID = @productID
		END;
GO

CREATE PROCEDURE UpdateProduct (
	@productID INT,
	@productName VARCHAR(50),
	@productQuantity INT,
	@productPrice INT,
	@productCategory VARCHAR(50)
)
	AS
		BEGIN
			UPDATE ProductTable
				SET productName = @productName,
					productQuantity = @productQuantity,
					productPrice = @productPrice,
					productCategory = @productCategory
					WHERE productID = @productID
		END;
GO

CREATE PROCEDURE GetProductNames
	AS
		BEGIN
			SELECT productName from ProductTable
		END;
GO

CREATE PROCEDURE GetProductsByCategory (
	@productCategory VARCHAR(50)
)
	AS
		BEGIN
			SELECT * FROM ProductTable WHERE productCategory = @productCategory
		END;
GO

/* Manager */

CREATE PROCEDURE DisplayAllManagers
	AS
		BEGIN
			SELECT * FROM ManagerTable
		END;
GO

CREATE PROCEDURE AddManager (
	@managerID INT,
	@managerName VARCHAR(50),
	@managerAge INT,
	@managerPhone VARCHAR(50),
	@managerAddress VARCHAR(100) = NULL,
	@managerPassword VARCHAR(50)
)
	AS
		BEGIN
			INSERT INTO ManagerTable VALUES
				(@managerID, @managerName, @managerAge, @managerPhone, @managerAddress, @managerPassword)
		END;
GO

CREATE PROCEDURE DeleteManager ( @managerID INT )
	AS
		BEGIN
			DELETE FROM ManagerTable WHERE managerID = @managerID
		END;
GO

CREATE PROCEDURE UpdateManager (
	@managerID INT,
	@managerName VARCHAR(50),
	@managerAge INT,
	@managerPhone VARCHAR(50),
	@managerAddress VARCHAR(100) = NULL,
	@managerPassword VARCHAR(50)
)
	AS
		BEGIN
			UPDATE ManagerTable
				SET managerName = @managerName,
					managerAge = @managerAge,
					managerPhone = @managerPhone,
					managerAddress = @managerAddress,
					managerPassword = @managerPassword
				WHERE managerId = @managerID
		END;
GO

/* SELLER */
CREATE PROCEDURE AddSeller (
	@sellerID INT,
	@sellerName VARCHAR(50),
	@sellerAge INT,
	@sellerPhone VARCHAR(50),
	@sellerPassword VARCHAR(50)
)
	AS
		BEGIN
			INSERT INTO SellerTable VALUES (@sellerID, @sellerName, @sellerAge, @sellerPhone, @sellerPassword)
		END;
GO

CREATE PROCEDURE DisplayAllSellers
	AS
		BEGIN
			SELECT * FROM SellerTable
		END;
GO

CREATE PROCEDURE DeleteSeller (
	@sellerID INT
)
	AS
		BEGIN
			DELETE FROM SellerTable WHERE sellerID = @sellerID
		END;
GO

CREATE PROCEDURE UpdateSeller (
	@sellerID INT,
	@sellerName VARCHAR(50),
	@sellerAge INT,
	@sellerPhone VARCHAR(50),
	@sellerPassword VARCHAR(50)
)
	AS
		BEGIN
			UPDATE SellerTable
				SET sellerName = @sellerName,
					sellerAge = @sellerAge,
					sellerPhone = @sellerPhone,
					sellerPassword = @sellerPassword
					WHERE sellerID = @sellerID
		END;
GO

/* SELLING */
CREATE PROCEDURE GetPdNamePriceQuantity
	AS
		BEGIN
			SELECT productName, productPrice, productQuantity FROM ProductTable
		END;
GO

CREATE PROCEDURE GetPdNamePriceQuantityByCategory(
	@categoryName VARCHAR(50)
)
	AS
		BEGIN
			SELECT productName, productPrice, productQuantity FROM ProductTable
				WHERE productCategory = @categoryName
		END;
GO

/* BILL */
CREATE PROCEDURE AddBill (
	@billID INT,
	@sellerName VARCHAR(50),
	@billDate VARCHAR(50),
	@totalAmount INT
)
	AS
		BEGIN
			INSERT INTO BillTable VALUES (@billID, @sellerName, @billDate, @totalAmount)
		END;
GO

CREATE PROCEDURE GetAllBills
	AS
		BEGIN
			SELECT * FROM BillTable
		END;
GO

CREATE PROCEDURE DeleteBill(@billID INT)
	AS
		BEGIN
			DELETE FROM BillTable WHERE billID = @billID
		END;
GO