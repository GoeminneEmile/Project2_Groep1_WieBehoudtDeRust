using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt.Messaging;
using project2Functions.Models;
using System.Text;
using Microsoft.ApplicationInsights;

namespace project2Functions
{
    public static class GameIdMqtt
    {
        [FunctionName("GameIdMqtt")]    
        public static void Run(
        [MqttTrigger("/luemniro/id/request")] IMqttMessage message, [Mqtt] out IMqttMessage outMessage, ILogger logger)
        {
            // Creating Telemetry client for logging events!
            TelemetryClient telemetry = new TelemetryClient();
            // Getting connection string
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
            // Receiving the message and creating an object from it
            var body = message.GetMessage();
            var bodyString = Encoding.UTF8.GetString(body);
            ID iD = JsonConvert.DeserializeObject<ID>(bodyString);
            // Checking if the ID isn't already in the database
           
            // Checking if the ID is exactly 6 digits long
            if(iD.Id.ToString().Length == 6)
            {
                bool IDResponse = InsertGameID.InsertId(iD.Id);
                // If it's 6 digits long and NOT in the database
                if (IDResponse)
                {
                    var response = new { id = iD.Id, status = "OK" };
                    var jsonResponse = JsonConvert.SerializeObject(response);
                    outMessage = new MqttMessage("/luemniro/id/response", Encoding.ASCII.GetBytes(jsonResponse), MqttQualityOfServiceLevel.AtLeastOnce, true);
                    logger.LogInformation("ID {iD.Id} is OK", iD.Id);
                    telemetry.TrackEvent("ID_Given");
                    telemetry.TrackEvent("ID_OK");
                }
                // If the ID is already in the database
                else
                {
                    var response = new { id = iD.Id, status = "NOK" };
                    var jsonResponse = JsonConvert.SerializeObject(response);
                    outMessage = new MqttMessage("/luemniro/id/response", Encoding.ASCII.GetBytes(jsonResponse), MqttQualityOfServiceLevel.AtLeastOnce, true);
                    logger.LogInformation("ID {iD.Id} is NOK, ID already in database", iD.Id);
                    telemetry.TrackEvent("ID_NOK");
                }
            }
            // If the ID is NOT 6 digits long!
            else
            {
                var response = new { id = iD.Id, status = "NOK" };
                var jsonResponse = JsonConvert.SerializeObject(response);
                outMessage = new MqttMessage("/luemniro/id/response", Encoding.ASCII.GetBytes(jsonResponse), MqttQualityOfServiceLevel.AtLeastOnce, true);
                logger.LogInformation("ID {iD.Id} is NOK, ID does not consist of exactly 6 digits", iD.Id);
                telemetry.TrackEvent("ID_NOK");
            }
            
        }
    }
}
