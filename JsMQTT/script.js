let SubmitButton, InputFieldValue;
let client;

const ConnectToMQTT = function() {
	// generate a random client id
	let clientID = 'clientID_' + parseInt(Math.random() * 100);
	//create an MQTT instance
	client = new Paho.Client('/mct-mqtt.westeurope.cloudapp.azure.com', 443, clientID);
	console.log('client made');

	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;
	console.log('handlers set');

	// connect the client
	client.connect({ onSuccess: onConnect });
};

// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log('onConnect');
	// client subscribed op topic!
	client.subscribe(`/luemniro/PiToJs/${InputFieldValue}`);
	// message opbouwen
	message = new Paho.Message(JSON.stringify({ first_name: 'Luka', last_name: 'De Bakker' }));
	// topic beslissen voor op te sturen
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	// bericht versturen
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
	// message versturen
	console.log('onMessageArrived: ' + message.payloadString);
}

const Buttonchecked = function() {
	// waarde van input box ophalen
	InputFieldValue = document.querySelector('.js-input').value;
	ConnectToMQTT();
};

const init = function() {
	console.log('Dom Content Loaded');
	SubmitButton = document.querySelector('.js-submit');
	SubmitButton.addEventListener('click', Buttonchecked);
};

document.addEventListener('DOMContentLoaded', init);
