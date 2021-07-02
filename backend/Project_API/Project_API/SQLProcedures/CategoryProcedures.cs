using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Data.SqlClient;
using Project_API.Models;

namespace Project_API.SQLProcedures
{
    public class CategoryProcedures
    {
        private SqlConnection sqlConnection = new SqlConnection("data source=MSI;initial catalog=SuperMarketDB;integrated security=True;MultipleActiveResultSets=True;");

        public bool AddCategory(CategoryTable category)
        {
            SqlCommand command = new SqlCommand("AddCategory", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@categoryID", category.categoryID);
            command.Parameters.AddWithValue("@categoryName", category.categoryName);
            command.Parameters.AddWithValue("@categoryDescription", category.categoryDescription);

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

        public List<CategoryTable> GetAllCategories()
        {
            List<CategoryTable> categories = new List<CategoryTable>();
            SqlCommand command = new SqlCommand("DisplayAllCategories", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            categories = (from DataRow dataRow in dataTable.Rows
                          select new CategoryTable()
                          {
                              categoryID = Convert.ToInt32(dataRow["categoryID"]),
                              categoryName = Convert.ToString(dataRow["categoryName"]),
                              categoryDescription = Convert.ToString(dataRow["categoryDescription"])
                          }).ToList();

            return categories;
        }

        public bool DeleteCategory(int id)
        {
            SqlCommand command = new SqlCommand("DeleteCategory", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@categoryID", id);

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

        public bool UpdateCategory(CategoryTable category)
        {
            SqlCommand command = new SqlCommand("UpdateCategory", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@categoryID", category.categoryID);
            command.Parameters.AddWithValue("@categoryName", category.categoryName);
            command.Parameters.AddWithValue("@categoryDescription", category.categoryDescription);

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

        public List<String> GetCategoryNames()
        {
            List<String> categoryNames = new List<String>();
            SqlCommand command = new SqlCommand("GetCategoryNames", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            categoryNames = (from DataRow dataRow in dataTable.Rows
                             select dataRow["categoryName"].ToString()).ToList();

            return categoryNames;
        }
    }
}
