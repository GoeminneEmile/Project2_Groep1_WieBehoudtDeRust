using System;
using System.Data.SqlClient;
using Microsoft.ApplicationInsights;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Extensions.Logging;

namespace project2Functions
{
    public static class TimerTriggerDelete
    {
        [FunctionName("TimerTriggerDelete")]
        public static async System.Threading.Tasks.Task RunAsync([TimerTrigger("0 30 4 * * *")]TimerInfo myTimer, ILogger logger)
        {
            TelemetryClient telemetry = new TelemetryClient();
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
                        command.CommandText = "TRUNCATE TABLE dbo.ProjectIDs";
                        var result = await command.ExecuteReaderAsync();
                        
                    }
                    telemetry.TrackEvent("Table_Truncate");
                    logger.LogInformation("Table truncated succesfully");
                }
            }
            catch (Exception ex)
            {
                logger.LogInformation("Error while truncating table: " + ex);
                throw;
            }
               
             



        }
    }
}
