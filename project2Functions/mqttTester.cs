using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Text;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt;
using CaseOnline.Azure.WebJobs.Extensions.Mqtt.Messaging;

namespace project2Functions
{
    public static class mqttTester
    {
        [FunctionName("mqttTester")]
        public static void Run(
        [MqttTrigger("/nick/demos")] IMqttMessage message, ILogger logger)
        {
            var body = message.GetMessage();
            var bodyString = Encoding.UTF8.GetString(body);
            logger.LogInformation($"{DateTime.Now:g} Message for topic {message.Topic}: {bodyString}");
            //Payment payment = JsonConvert.DeserializeObject<Payment>(bodyString);
            //SendPayment sendPayment = new SendPayment();
            //sendPayment.SendCosmosPayment(payment);
            //outMessage = new MqttMessage("/parking/received", new byte[] { }, MqttQualityOfServiceLevel.AtLeastOnce, true);
            //[Mqtt] out IMqttMessage outMessage,
        }
    }
}
