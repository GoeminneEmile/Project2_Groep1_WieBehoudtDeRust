using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using project2Functions.Models;
using System.Data.SqlClient;
using System.Security.Cryptography;
using System.Text;
using Microsoft.ApplicationInsights;

namespace project2Functions
{
    public static class AddUser
    {
        [FunctionName("AddUser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger logger)
        {
            // Creating Telemetry client for logging events!
            TelemetryClient telemetry = new TelemetryClient();
            // Getting connection string.
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
            // Reading the body of the received json.
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            // Creating the user object from received data.
            User user = JsonConvert.DeserializeObject<User>(requestBody);
            // Hashing the password of the created user.
            Hash hash = new Hash();
            string Password = hash.ComputeHash(user.Password);
            user.Password = Password;
            user.UserGuid = Guid.NewGuid();
            // Getting connection string.
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
                        try
                        {
                            command.Connection = connection;
                            command.CommandText = "insert into Users (UserGuid,UserName,Password) VALUES (@userguid,@username,@password);";
                            command.Parameters.AddWithValue("@userguid", user.UserGuid);
                            command.Parameters.AddWithValue("@username", user.UserName);
                            command.Parameters.AddWithValue("@password", user.Password);

                            var result = command.ExecuteReader();
                            result.Close();
                        }
                        catch (Exception ex)
                        {
                            logger.LogInformation("ERROR with SQL command: " + ex);
                            telemetry.TrackEvent("User_Added_NOK");
                            return new StatusCodeResult(400) ;
                        }
                        
                    }
                }
                logger.LogInformation("User {user.UserName} has been added to database", user.UserName);
                telemetry.TrackEvent("User_Added_OK");
                return new OkObjectResult(201);

            }
            catch (Exception ex)
            {
                logger.LogInformation("ERROR with SQL connection:   " +  ex);
                telemetry.TrackEvent("User_Added_NOK");
                return new StatusCodeResult(500);
            }

        }
    }
}
