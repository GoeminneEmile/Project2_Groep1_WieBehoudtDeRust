using project2Functions.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace project2Functions
{
    public class InsertGameID
    {
        // Function to insert a gameId into a database
        public static Boolean InsertId(int iD)
        {
            // Getting connection string
            string connectionString = Environment.GetEnvironmentVariable("connectionString");
            try
            {
                // Using SQL connection
                using (SqlConnection connection = new SqlConnection())
                {
                    // Setting connection strings
                    connection.ConnectionString = connectionString;
                    // Opening connection
                    connection.Open();
                    using (SqlCommand command = new SqlCommand())
                    {
                        // Setting and executing SQL command
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
