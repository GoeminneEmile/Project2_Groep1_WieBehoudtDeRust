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

namespace project2Functions
{
    public static class AddQuestion
    {
        [FunctionName("AddQuestion")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger log)
        {   
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            Question question = JsonConvert.DeserializeObject<Question>(requestBody);
            question.QuestionID = Guid.NewGuid();
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
                        command.CommandText = "insert into ProjectQuestions (QuestionID,Question) VALUES (@id,@question);";
                        command.Parameters.AddWithValue("@id", question.QuestionID);
                        command.Parameters.AddWithValue("@question", question.QuestionName);

                        var result = command.ExecuteReader();
                        result.Close();
                        foreach(QuestionAnswer questionAnswer in question.questionAnswers)
                        {
                            questionAnswer.QuestionAnswerGuid = Guid.NewGuid();
                            command.Connection = connection;
                            command.CommandText = "insert into ProjectAnswers (QuestionAnswer,Answer,correct) VALUES (@questionid,@answer,@correct);";
                            command.Parameters.AddWithValue("@questionid", question.QuestionID);
                            command.Parameters.AddWithValue("@answer", questionAnswer.Answer);
                            command.Parameters.AddWithValue("@correct", questionAnswer.Correct);
                            result = command.ExecuteReader();
                            command.Parameters.Clear();
                            result.Close();
                        }
                    }
                }
                return new OkObjectResult(201);

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(500) ;
            }
        }
    }
}
