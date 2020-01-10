using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;

namespace project2Functions
{
    public static class GetUser
    {
        [FunctionName("GetUser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            string name = req.Query["user"];
            string password = req.Query["password"];
            Hash hash = new Hash();
            string passwordHash = hash.ComputeHash(password);
            string connectionString = Environment.GetEnvironmentVariable("connectionString");
            // opening SQL connection
            try
            {
                using (SqlConnection connection = new SqlConnection())
                {
                    // Setting connection string
                    connection.ConnectionString = connectionString;
                    // opening connection
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand())
                    {
                        // setting and executing a command
                        command.Connection = connection;
                        command.CommandText = "Select * from Users Where UserName = @username and Password = @password";
                        command.Parameters.AddWithValue("@username", name);
                        command.Parameters.AddWithValue("@password", passwordHash);

                        using (SqlDataReader reader = command.ExecuteReader())
                        {
                            if (reader.Read())
                            {
                                string UserName = reader["UserName"].ToString() ;
                                return new OkObjectResult(200);

                            }
                            else
                            {
                                return new OkObjectResult(400);
                            }
                        }
                    }
                }
            }
            // catching an error
            catch (Exception ex)
            {
                // logging an error
                return new StatusCodeResult(500);
                throw;
            }
        }
    }
}
