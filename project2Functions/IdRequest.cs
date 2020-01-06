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
using System.Text;

namespace project2Functions
{
    public static class IdRequest
    {
        [FunctionName("IdRequest")]
        public static void Run(
        [MqttTrigger("/luemniro/id/request")] IMqttMessage message, [Mqtt] out IMqttMessage outMessage, ILogger logger)
        {
            var body = message.GetMessage();
            var bodyString = Encoding.UTF8.GetString(body);
            logger.LogInformation($"{DateTime.Now:g} Message for topic {message.Topic}: {bodyString}");
            //Payment payment = JsonConvert.DeserializeObject<Payment>(bodyString);
            //SendPayment sendPayment = new SendPayment();
            //sendPayment.SendCosmosPayment(payment);
            var response = new { id = bodyString, status = "OK" };
            var jsonResponse = JsonConvert.SerializeObject(response);
            outMessage = new MqttMessage("luemniro/id/response", Encoding.ASCII.GetBytes(jsonResponse), MqttQualityOfServiceLevel.AtLeastOnce, true);
        }
    }
}
