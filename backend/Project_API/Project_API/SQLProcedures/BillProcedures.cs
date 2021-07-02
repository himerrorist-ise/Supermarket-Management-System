using Project_API.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace Project_API.SQLProcedures
{
    public class BillProcedures
    {
        private SqlConnection sqlConnection = new SqlConnection("data source=MSI;initial catalog=SuperMarketDB;integrated security=True;MultipleActiveResultSets=True;");

        public bool AddBill(BillTable bill)
        {
            SqlCommand command = new SqlCommand("AddBill", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@billID", bill.billID);
            command.Parameters.AddWithValue("@sellerName", bill.sellerName);
            command.Parameters.AddWithValue("@billDate", bill.billDate);
            command.Parameters.AddWithValue("@totalAmount", bill.totalAmount);

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

        public List<BillTable> GetAllBills()
        {
            List<BillTable> bills = new List<BillTable>();
            SqlCommand command = new SqlCommand("GetAllBIlls", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            bills = (from DataRow dataRow in dataTable.Rows
                     select new BillTable()
                     {
                         billID = Convert.ToInt32(dataRow["billID"]),
                         sellerName = Convert.ToString(dataRow["sellerName"]),
                         billDate = Convert.ToString(dataRow["billDate"]),
                         totalAmount = Convert.ToInt32(dataRow["totalAmount"])
                     }).ToList();

            return bills;
        }

        public bool DeleteBill(int id)
        {
            SqlCommand command = new SqlCommand("DeleteBill", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@billID", id);

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
