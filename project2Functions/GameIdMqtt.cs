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
            TelemetryClient telemetry = new TelemetryClient();
            telemetry.InstrumentationKey = Environment.GetEnvironmentVariable("insightsString");
            var body = message.GetMessage();
            var bodyString = Encoding.UTF8.GetString(body);
            ID iD = JsonConvert.DeserializeObject<ID>(bodyString);
            bool IDResponse = InsertGameID.InsertId(iD.Id);
            if (IDResponse)
            {
                var response = new { id = iD.Id, status = "OK" };
                var jsonResponse = JsonConvert.SerializeObject(response);
                outMessage = new MqttMessage("/luemniro/id/response", Encoding.ASCII.GetBytes(jsonResponse), MqttQualityOfServiceLevel.AtLeastOnce, true);
                logger.LogInformation("ID {iD.Id} is OK", iD.Id);
                telemetry.TrackEvent("ID_Given");
                telemetry.TrackEvent("ID_OK");
            }
            else
            {
                var response = new { id = iD.Id, status = "NOK" };
                var jsonResponse = JsonConvert.SerializeObject(response);
                outMessage = new MqttMessage("/luemniro/id/response", Encoding.ASCII.GetBytes(jsonResponse), MqttQualityOfServiceLevel.AtLeastOnce, true);
                logger.LogInformation("ID {iD.Id} is NOK, ID already in database", iD.Id);
                telemetry.TrackEvent("ID_NOK");
            }
        }
    }
}
