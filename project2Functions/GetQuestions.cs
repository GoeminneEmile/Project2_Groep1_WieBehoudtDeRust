using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Data.SqlClient;
using project2Functions.Models;

namespace project2Functions
{
    public static class GetQuestions
    {
        [FunctionName("GetQuestions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            List<Question> questions = new List<Question>();
            try
            {
                using (SqlConnection connection = new SqlConnection())
                {
                    connection.ConnectionString = connectionString;
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = "SELECT * FROM ProjectQuestions";

                        var result = await command.ExecuteReaderAsync();
                        while (await result.ReadAsync())
                        {
                            Console.WriteLine(result.ToString());
                            Question question = new Question()
                            {
                                QuestionID = result["QuestionID"].ToString(),
                                QuestionName = result["Question"].ToString(),
                            };
                            questions.Add(question);
                        }
                    }
                }
                return new OkObjectResult(questions);

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(500);
            }
        }
    }
}
