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
using Microsoft.ApplicationInsights;
using project2Functions.Models;

namespace project2Functions
{
    public static class GetUser
    {
        [FunctionName("GetUser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = null)] HttpRequest req,
            ILogger logger)
        {
            // Creating Telemetry client for logging events!
            TelemetryClient telemetry = new TelemetryClient();
            // Getting connection string.
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
            // Take the data out of the reauest
            string name = req.Query["username"];
            string password = req.Query["password"];
            // Create hash
            Hash hash = new Hash();
            string passwordHash = hash.ComputeHash(password);
            // Get connection string
            string connectionString = Environment.GetEnvironmentVariable("connectionString");
            // opening SQL connection
            try
            {
                // Using SQL connection
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
                            // Correct username and password entered
                            if (reader.Read())
                            {
                                string UserName = reader["UserName"].ToString() ;
                                logger.LogInformation("Login succeeded");
                                telemetry.TrackEvent("User_Login_OK");
                                User user = new User() { UserGuid = Guid.Parse(reader["UserGuid"].ToString()) };
                                return new OkObjectResult(user);

                            }
                            // If the wrong username or password are entered
                            else
                            {
                                logger.LogInformation("Wrong Username or Password");
                                telemetry.TrackEvent("User_Login_NOK");
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
                logger.LogInformation("ERROR with SQL connection" + ex);
                telemetry.TrackEvent("Login_SQLError");
                return new StatusCodeResult(500);
                throw;
            }
        }
    }
}
