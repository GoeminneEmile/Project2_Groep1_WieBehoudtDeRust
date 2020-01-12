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
    public static class DeleteQuestion
    {
        [FunctionName("DeleteQuestion")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string guid = req.Query["guid"];
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
                        command.CommandText = "DELETE FROM ProjectQuestions WHERE QuestionID = @questionguid";
                        command.Parameters.AddWithValue("@questionguid", guid);
                        var resultQuestion = await command.ExecuteReaderAsync();
                        command.Parameters.Clear();
                        resultQuestion.Close();
                        command.Connection = connection;
                        command.CommandText = "DELETE FROM ProjectAnswers WHERE QuestionAnswer = @questionguid";
                        command.Parameters.AddWithValue("@questionguid", guid);
                        var resultAnswer = await command.ExecuteReaderAsync();
                        return new OkObjectResult(201);


                    }
                }
            }
            // catching an error
            catch (Exception ex)
            {
                return new OkObjectResult(400);
            }
        }
    }
}
