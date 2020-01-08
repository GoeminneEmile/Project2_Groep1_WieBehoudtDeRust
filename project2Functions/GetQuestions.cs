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
using Microsoft.Build.Utilities;


namespace project2Functions
{
    public static class GetQuestions
    {
        [FunctionName("GetQuestions")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = null)] HttpRequest req,
            ILogger logger)
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
                        command.CommandText = "Select * From ProjectAnswers as a left join ProjectQuestions as b on a.QuestionAnswer = b.QuestionID";
                        var result = await command.ExecuteReaderAsync();
                        string QuestionIDCurrent = "";
                        Question newQuestion = new Question();
                        while (await result.ReadAsync())
                        {
                            if(result["QuestionID"].ToString() != QuestionIDCurrent)
                            {
                                Question question = new Question() { QuestionID = result["QuestionID"].ToString(), QuestionName = result["Question"].ToString() };
                                questions.Add(question);
                                QuestionIDCurrent = result["QuestionID"].ToString();
                                QuestionAnswer questionAnswer = new QuestionAnswer() { Answer = result["Answer"].ToString(), QuestionAnswerGuid = result["QuestionID"].ToString(), Correct = Int32.Parse(result["Correct"].ToString()) };
                                questions[questions.Count - 1].questionAnswers.Add(questionAnswer);

                            }
                            else
                            {
                                QuestionAnswer questionAnswer = new QuestionAnswer() { Answer = result["Answer"].ToString(), QuestionAnswerGuid = result["QuestionID"].ToString(), Correct = Int32.Parse(result["Correct"].ToString()) };
                                questions[questions.Count - 1].questionAnswers.Add(questionAnswer);
                            }
                            logger.LogInformation("GET has been succesfully executed");
                           Console.WriteLine(result.ToString());
                        }
                    }
                }
                return new OkObjectResult(questions);

            }
            catch (Exception ex)
            {
                
                Console.WriteLine(ex);
                logger.LogInformation("GET ERROR: " + ex);
                return new StatusCodeResult(500);

            }
        }
    }
}
