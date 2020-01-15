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
using Microsoft.ApplicationInsights;

namespace project2Functions
{
    public static class GetQuestions
    {
        [FunctionName("GetQuestions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger logger)
        {
            // Creating Telemetry client for logging events!
            TelemetryClient telemetry = new TelemetryClient();
            // Take the data out of the reauest
            string name = req.Query["username"];
            // Getting connection strings
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
            string connectionString = Environment.GetEnvironmentVariable("ConnectionString");
            List<Question> questions = new List<Question>();
            try
            {
                // setting up SQL connection
                using (SqlConnection connection = new SqlConnection())
                {
                    // Setting connection strings
                    connection.ConnectionString = connectionString;
                    // Opening the connection
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand())
                    {
                        // Setting up and executing a SQL command
                        command.Connection = connection;
                        command.CommandText = "Select * From ProjectAnswers as a left join ProjectQuestions as b on a.QuestionAnswer = b.QuestionID left join Users as c on b.UserID = c.UserGuid where c.UserName = @username;";
                        command.Parameters.AddWithValue("@username", name);
                        var result = await command.ExecuteReaderAsync();
                        // Creating empty variable to change later
                        string QuestionIDCurrent = "";
                        Question newQuestion = new Question();
                        while (await result.ReadAsync())
                        {
                            // Receiving and structuring the data like we want it to be
                            // We want to get a question, and nest all the answers inside of the question in JSON format
                            if(result["QuestionID"].ToString() != QuestionIDCurrent)
                            {
                                Question question = new Question() { QuestionID = Guid.Parse(result["QuestionID"].ToString()), UserId = Guid.Parse(result["UserId"].ToString()), QuestionName = result["Question"].ToString() };
                                questions.Add(question);
                                QuestionIDCurrent = result["QuestionID"].ToString();
                                QuestionAnswers questionAnswer = new QuestionAnswers() { Answer = result["Answer"].ToString(), QuestionAnswer = Guid.Parse(result["QuestionID"].ToString()), Correct = Int32.Parse(result["Correct"].ToString()) };
                                questions[questions.Count - 1].questionAnswers.Add(questionAnswer);

                            }
                            else
                            {
                                QuestionAnswers questionAnswer = new QuestionAnswers() { Answer = result["Answer"].ToString(), QuestionAnswer = Guid.Parse(result["QuestionID"].ToString()), Correct = Int32.Parse(result["Correct"].ToString()) };
                                questions[questions.Count - 1].questionAnswers.Add(questionAnswer);
                            }
                        }
                    }
                }
                // logging event
                logger.LogInformation("GET has been succesfully executed");
                telemetry.TrackEvent("GetQuestions");
                return new OkObjectResult(questions);

            }
            // Catching error
            catch (Exception ex)
            {
                // Logging error
                Console.WriteLine(ex);
                logger.LogInformation("GET ERROR: " + ex);
                return new StatusCodeResult(500);

            }
        }
    }
}
