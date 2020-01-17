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
using project2Functions.Models;

namespace project2Functions
{
    public static class PostQuestion
    {
        [FunctionName("PostQuestion")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {

            try
            {
                string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
                Question question = JsonConvert.DeserializeObject<Question>(requestBody);
                string connectionString = Environment.GetEnvironmentVariable("connectionString");
                // opening SQL connection
                try
                {
                    // Opening SQL connection
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
                            command.Parameters.AddWithValue("@questionguid", question.QuestionID);
                            var resultQuestion = await command.ExecuteReaderAsync();
                            command.Parameters.Clear();
                            resultQuestion.Close();
                            command.Connection = connection;
                            command.CommandText = "DELETE FROM ProjectAnswers WHERE QuestionAnswer = @questionguid";
                            command.Parameters.AddWithValue("@questionguid", question.QuestionID);
                            var resultAnswer = await command.ExecuteReaderAsync();
                            resultAnswer.Close();
                            command.Parameters.Clear();
                            question.QuestionID = Guid.NewGuid();
                            command.Connection = connection;
                            command.CommandText = "insert into ProjectQuestions (QuestionID,Question,UserID) VALUES (@id,@question,@userid);";
                            command.Parameters.AddWithValue("@id", question.QuestionID);
                            command.Parameters.AddWithValue("@question", question.QuestionName);
                            command.Parameters.AddWithValue("@userid", question.UserId);
                            var result = command.ExecuteReader();
                            result.Close();
                            command.Parameters.Clear();

                            // for every answer in a question, we insert the answer with the SAME guid as the question into the database, this is how we link a question to an answer
                            foreach (QuestionAnswers questionAnswer in question.questionAnswers)
                            {
                                questionAnswer.QuestionAnswer = Guid.NewGuid();
                                command.Connection = connection;
                                command.CommandText = "insert into ProjectAnswers (QuestionAnswer,Answer,correct) VALUES (@questionid,@answer,@correct);";
                                command.Parameters.AddWithValue("@questionid", question.QuestionID);
                                command.Parameters.AddWithValue("@answer", questionAnswer.Answer);
                                command.Parameters.AddWithValue("@correct", questionAnswer.Correct);
                                result = command.ExecuteReader();
                                command.Parameters.Clear();
                                result.Close();
                            }
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
            catch (Exception ex)
            {

                return new StatusCodeResult(400);
            }
            
        }
    }
}
