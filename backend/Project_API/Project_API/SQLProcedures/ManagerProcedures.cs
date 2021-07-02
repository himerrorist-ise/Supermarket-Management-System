using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using Project_API.Models;
using System.Linq;

namespace Project_API.SQLProcedures
{
    public class ManagerProcedures
    {
        private SqlConnection sqlConnection = new SqlConnection("data source=MSI;initial catalog=SuperMarketDB;integrated security=True;MultipleActiveResultSets=True;");

        public List<ManagerTable> DisplayAllManagers()
        {
            List<ManagerTable> managers = new List<ManagerTable>();
            SqlCommand command = new SqlCommand("DisplayAllManagers", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            SqlDataAdapter dataAdapter = new SqlDataAdapter(command);
            DataTable dataTable = new DataTable();

            sqlConnection.Open();
            dataAdapter.Fill(dataTable);
            sqlConnection.Close();

            managers = (from DataRow dataRow in dataTable.Rows
                        select new ManagerTable()
                        {
                            managerID = Convert.ToInt32(dataRow["managerID"]),
                            managerName = Convert.ToString(dataRow["managerName"]),
                            managerAge = Convert.ToInt32(dataRow["managerAge"]),
                            managerPhone = Convert.ToString(dataRow["managerPhone"]),
                            managerPassword = Convert.ToString(dataRow["managerPassword"]),
                            managerAddress = Convert.ToString(dataRow["managerAddress"])
                        }).ToList();

            return managers;
        }

        public bool AddManger(ManagerTable manager)
        {
            SqlCommand command = new SqlCommand("AddManager", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@managerID", manager.managerID);
            command.Parameters.AddWithValue("@managerName", manager.managerName);
            command.Parameters.AddWithValue("@managerAge", manager.managerAge);
            command.Parameters.AddWithValue("@managerPhone", manager.managerPhone);
            command.Parameters.AddWithValue("@managerAddress", manager.managerAddress);
            command.Parameters.AddWithValue("@managerPassword", manager.managerPassword);

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

        public bool DeleteManger(int id)
        {
            SqlCommand command = new SqlCommand("DeleteManager", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@managerID", id);

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

        public bool UpdateManager(ManagerTable manager)
        {
            SqlCommand command = new SqlCommand("UpdateManager", sqlConnection);
            command.CommandType = CommandType.StoredProcedure;
            command.Parameters.AddWithValue("@managerID", manager.managerID);
            command.Parameters.AddWithValue("@managerName", manager.managerName);
            command.Parameters.AddWithValue("@managerAge", manager.managerAge);
            command.Parameters.AddWithValue("@managerPhone", manager.managerPhone);
            command.Parameters.AddWithValue("@managerAddress", manager.managerAddress);
            command.Parameters.AddWithValue("@managerPassword", manager.managerPassword);

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
