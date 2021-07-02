using Project_API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Project_API.SQLProcedures
{
    public class ProductProcedures
    {
        private SqlConnection sqlConnection = new SqlConnection("data source=MSI;initial catalog=SuperMarketDB;integrated security=True;MultipleActiveResultSets=True;");

        public bool AddProduct(ProductTable product)
        {
            SqlCommand command = new SqlCommand("AddProduct", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@productID", product.productID);
            command.Parameters.AddWithValue("@productName", product.productName);
            command.Parameters.AddWithValue("@productQuantity", product.productQuantity);
            command.Parameters.AddWithValue("@productPrice", product.productPrice);
            command.Parameters.AddWithValue("@productCategory", product.productCategory);

            sqlConnection.Open();
            int error = command.ExecuteNonQuery();
            sqlConnection.Close();

            if (error >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<ProductTable> GetAllProducts()
        {
            List<ProductTable> products = new List<ProductTable>();
            SqlCommand command = new SqlCommand("DisplayAllProducts", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            products = (from DataRow dataRow in dataTable.Rows
                        select new ProductTable()
                        {
                            productID = Convert.ToInt32(dataRow["productID"]),
                            productName = Convert.ToString(dataRow["productName"]),
                            productQuantity = Convert.ToInt32(dataRow["productQuantity"]),
                            productPrice = Convert.ToInt32(dataRow["productPrice"]),
                            productCategory = Convert.ToString(dataRow["productCategory"])
                        }).ToList();

            return products;
        }

        public bool DeleteProduct(int id)
        {
            SqlCommand command = new SqlCommand("DeleteProduct", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@productID", id);

            sqlConnection.Open();
            int error = command.ExecuteNonQuery();
            sqlConnection.Close();

            if (error >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public bool UpdateProduct(ProductTable product)
        {
            SqlCommand command = new SqlCommand("UpdateProduct", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@productID", product.productID);
            command.Parameters.AddWithValue("@productName", product.productName);
            command.Parameters.AddWithValue("@productQuantity", product.productQuantity);
            command.Parameters.AddWithValue("@productPrice", product.productPrice);
            command.Parameters.AddWithValue("@productCategory", product.productCategory);

            sqlConnection.Open();
            int error = command.ExecuteNonQuery();
            sqlConnection.Close();

            if (error >= 1)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        public List<String> GetProductNames()
        {
            List<String> productNames = new List<String>();
            SqlCommand command = new SqlCommand("GetProductNames", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            productNames = (from DataRow dataRow in dataTable.Rows
                            select dataRow["productName"].ToString()).ToList();

            return productNames;
        }

        public List<ProductTable> GetProductsByCategory(String category)
        {
            List<ProductTable> products = new List<ProductTable>();
            SqlCommand command = new SqlCommand("GetProductsByCategory", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@productCategory", category);
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            products = (from DataRow dataRow in dataTable.Rows
                        select new ProductTable()
                        {
                            productID = Convert.ToInt32(dataRow["productID"]),
                            productName = Convert.ToString(dataRow["productName"]),
                            productQuantity = Convert.ToInt32(dataRow["productQuantity"]),
                            productPrice = Convert.ToInt32(dataRow["productPrice"]),
                            productCategory = Convert.ToString(dataRow["productCategory"])
                        }).ToList();

            return products;
        }

        public DataTable GetProductNamePriceQuantity()
        {
            SqlCommand command = new SqlCommand("GetPdNamePriceQuantity", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            return dataTable;
        }

        public DataTable GetProductNamePriceQuantityByCategory(String category)
        {
            SqlCommand command = new SqlCommand("GetPdNamePriceQuantityByCategory", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@categoryName", category);
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            return dataTable;
        }
    }
}
