using System;
using System.Collections.Generic;
using System.Linq;
using Project_API.Models;
using System.Data.SqlClient;
using System.Data;

namespace Project_API.SQLProcedures
{
    public class SellerProcedures
    {
        private SqlConnection sqlConnection = new SqlConnection("data source=MSI;initial catalog=SuperMarketDB;integrated security=True;MultipleActiveResultSets=True;");

        public bool AddSeller(SellerTable seller)
        {
            SqlCommand command = new SqlCommand("AddSeller", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@sellerID", seller.sellerID);
            command.Parameters.AddWithValue("@sellerName", seller.sellerName);
            command.Parameters.AddWithValue("@sellerAge", seller.sellerAge);
            command.Parameters.AddWithValue("@sellerPhone", seller.sellerPhone);
            command.Parameters.AddWithValue("@sellerPassword", seller.sellerPassword);

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

        public List<SellerTable> GetAllSellers()
        {
            List<SellerTable> sellers = new List<SellerTable>();
            SqlCommand command = new SqlCommand("DisplayAllSellers", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            sellers = (from DataRow dataRow in dataTable.Rows
                       select new SellerTable()
                       {
                           sellerID = Convert.ToInt32(dataRow["sellerID"]),
                           sellerName = Convert.ToString(dataRow["sellerName"]),
                           sellerAge = Convert.ToInt32(dataRow["sellerAge"]),
                           sellerPhone = Convert.ToString(dataRow["sellerPhone"]),
                           sellerPassword = Convert.ToString(dataRow["sellerPassword"])
                       }).ToList();

            return sellers;
        }

        public bool DeleteSeller(int id)
        {
            SqlCommand command = new SqlCommand("DeleteSeller", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@sellerID", id);

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

        public bool UpdateSeller(SellerTable seller)
        {
            SqlCommand command = new SqlCommand("UpdateSeller", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@sellerID", seller.sellerID);
            command.Parameters.AddWithValue("@sellerName", seller.sellerName);
            command.Parameters.AddWithValue("@sellerAge", seller.sellerAge);
            command.Parameters.AddWithValue("@sellerPhone", seller.sellerPhone);
            command.Parameters.AddWithValue("@sellerPassword", seller.sellerPassword);

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
    }
}
