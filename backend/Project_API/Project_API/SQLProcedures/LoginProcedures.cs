using System;
using System.Data;
using System.Data.SqlClient;

namespace Project_API.SQLProcedures
{
    public class LoginProcedures
    {
        private SqlConnection sqlConnection = new SqlConnection("data source=MSI;initial catalog=SuperMarketDB;integrated security=True;MultipleActiveResultSets=True;");

        public DataTable GetSellerUser(String userName, String userPassword)
        {
            SqlCommand command = new SqlCommand("GetSellerUser", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@sellerName", userName);
            command.Parameters.AddWithValue("@sellerPassword", userPassword);
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            return dataTable;
        }

        public DataTable GetManagerUser(String userName, String userPassword)
        {
            SqlCommand command = new SqlCommand("GetManagerUser", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@managerName", userName);
            command.Parameters.AddWithValue("@managerPassword", userPassword);
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            return dataTable;
        }
    }
}
