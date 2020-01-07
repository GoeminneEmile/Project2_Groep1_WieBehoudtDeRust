using project2Functions.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace project2Functions
{
    public class InsertGameID
    {
        public static Boolean InsertId(int iD)
        {
            string connectionString = Environment.GetEnvironmentVariable("connectionString");
            try
            {
                using (SqlConnection connection = new SqlConnection())
                {
                    connection.ConnectionString = connectionString;
                    connection.Open();
                    using (SqlCommand command = new SqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = "insert into ProjectIDs (GameID) VALUES (@id);";
                        command.Parameters.AddWithValue("@id", iD);


                        var result = command.ExecuteReader();
                        
                    }
                }
                return true;

            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
