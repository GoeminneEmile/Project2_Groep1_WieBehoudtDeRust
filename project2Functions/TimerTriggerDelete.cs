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
            // This is a timer trigger for deleting a table of records every day.
            // Creating Telemetry client for logging events!
            TelemetryClient telemetry = new TelemetryClient();
            // Getting connection strings
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
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
                        command.CommandText = "TRUNCATE TABLE dbo.ProjectIDs";
                        var result = await command.ExecuteReaderAsync();
                        
                    }
                    // logging, we can see these events appear on azure
                    telemetry.TrackEvent("Table_Truncate");
                    logger.LogInformation("Table truncated succesfully");
                }
            }
            // catching an error
            catch (Exception ex)
            {
                // logging an error
                logger.LogInformation("Error while truncating table: " + ex);
                throw;
            }
               
             



        }
    }
}
