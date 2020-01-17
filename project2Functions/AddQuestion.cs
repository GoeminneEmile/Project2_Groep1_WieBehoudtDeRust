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
using Microsoft.ApplicationInsights;

namespace project2Functions
{
    public static class AddQuestion
    {
        [FunctionName("AddQuestion")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = null)] HttpRequest req,
            ILogger logger)
        {
            try
            {

            
            
            // Creating Telemetry client for logging events!
            TelemetryClient telemetry = new TelemetryClient();
            // Getting connection string
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
            // Reading the body of the received json.
            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            // Deserializing the json
            dynamic data = JsonConvert.DeserializeObject(requestBody);
            // Converting json to Question Objects
            Question question = JsonConvert.DeserializeObject<Question>(requestBody);
            question.QuestionID = Guid.NewGuid();
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
                        command.Connection = connection;
                        command.CommandText = "insert into ProjectQuestions (QuestionID,Question,UserID) VALUES (@id,@question,@userid);";
                        command.Parameters.AddWithValue("@id", question.QuestionID);
                        command.Parameters.AddWithValue("@question", question.QuestionName);
                        command.Parameters.AddWithValue("@userid", question.UserId);

                        var result = command.ExecuteReader();
                        result.Close();
                        // for every answer in a question, we insert the answer with the SAME guid as the question into the database, this is how we link a question to an answer
                        foreach(QuestionAnswers questionAnswer in question.questionAnswers)
                        {
                            questionAnswer.QuestionAnswer = Guid.NewGuid();
                            command.Connection = connection;
                            command.CommandText = "insert into ProjectAnswers (QuestionAnswer,Answer,correct) VALUES (@questionid,@answer,@correct);";
                            command.Parameters.AddWithValue("@questionid", question.QuestionID);
                            command.Parameters.AddWithValue("@answer", questionAnswer.Answer);
                            command.Parameters.AddWithValue("@correct", questionAnswer.Correct);
                            logger.LogInformation("Question with ID: {question.QuestionID} has been added", question.QuestionID);
                            result = command.ExecuteReader();
                            command.Parameters.Clear();
                            result.Close();
                        }
                    }
                }
                telemetry.TrackEvent("Question_Added_OK");
                return new OkObjectResult(201);

            }
            catch (Exception ex)
            {
                logger.LogInformation("ERROR with SQL Connection: " + ex);
                telemetry.TrackEvent("Question_Added_NOK");
                return new StatusCodeResult(500) ;
            }
            }
            catch (Exception ex)
            {
                return new StatusCodeResult(400);
            }
        }
    }
}
