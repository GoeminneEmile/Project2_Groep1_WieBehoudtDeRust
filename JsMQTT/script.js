// Create a client instance
let topic = '/test/luka';
let clientID = 'clientID_' + parseInt(Math.random() * 100);
let client = new Paho.Client('/mct-mqtt.westeurope.cloudapp.azure.com', 80, clientID);
console.log('client made');

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;
console.log('handlers set');

// connect the client
client.connect({ onSuccess: onConnect });

// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log('onConnect');
	client.subscribe(topic);
	message = new Paho.Message('Connection has been made, first message sent!');
	message.destinationName = topic;
	client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:' + responseObject.errorMessage);
	}
}

// called when a message arrives
function onMessageArrived(message) {
	console.log('onMessageArrived:' + message.payloadString);
}
