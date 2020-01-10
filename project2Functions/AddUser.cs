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

namespace project2Functions
{
    public static class AddUser
    {
        [FunctionName("AddUser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            User user = JsonConvert.DeserializeObject<User>(requestBody);
            Hash hash = new Hash();
            string Password = hash.ComputeHash(user.Password);
            user.Password = Password;
            user.UserGuid = Guid.NewGuid();

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
                        catch (Exception)
                        {

                            return new StatusCodeResult(400) ;
                        }
                        
                    }
                }
                return new OkObjectResult(201);

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(500);
            }

        }
    }
}
