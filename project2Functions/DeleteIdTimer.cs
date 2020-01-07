using System;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace project2Functions
{
    public static class DeleteIdTimer
    {
        [FunctionName("DeleteIdTimer")]
        public static async System.Threading.Tasks.Task<StatusCodeResult> RunAsync([TimerTrigger("0 */1 * * * *")]TimerInfo myTimer, ILogger log)
        {
           string connectionString = Environment.GetEnvironmentVariable("connectionString");
            try
            {
                using (SqlConnection connection = new SqlConnection())
                {
                    connection.ConnectionString = connectionString;
                    await connection.OpenAsync();
                    using (SqlCommand command = new SqlCommand())
                    {
                        command.Connection = connection;
                        command.CommandText = "DELETE * FROM dbo.ProjectIDs";

                        var result = await command.ExecuteReaderAsync();
                        
                    }
                }
                return new StatusCodeResult(200);

            }
            catch (Exception ex)
            {
                return new StatusCodeResult(500);
            }
        }
    }
}
