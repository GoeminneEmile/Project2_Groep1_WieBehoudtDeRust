// global variables
let SubmitButton, InputFieldValue;
let client;
let Communication;
let players = [];
let selectedAvatars = [];

const ConnectToMQTT = function() {
	// Go from index page to load page
	// generate a random client id
	let clientID = 'clientID_' + parseInt(Math.random() * 100);
	//create an MQTT instance
	client = new Paho.Client('/mct-mqtt.westeurope.cloudapp.azure.com', 443, clientID);
	console.log('client made');
	console.log(client);
	console.log('dit is de client');
	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;
	console.log('handlers set');

	// connect the client
	client.connect({ onSuccess: onConnect, onFailure: onConnectionLost });
};
const disconnectTest = function() {
	client.disconnect();
	console;
};
// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	console.log('onConnect');
	try {
		clearInterval(interval);
	} catch (error) {}
	// client subscribed op topic!
	client.subscribe(`/luemniro/PiToJs/${InputFieldValue}`);
	console.log(InputFieldValue);
	// message opbouwen
	//message = new Paho.Message(JSON.stringify({ first_name: 'Luka', last_name: 'De Bakker' }));
	// topic beslissen voor op te sturen
	//message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	// bericht versturen
	//client.send(message);
	initializeCommunication();
}

// Initializing communication, we send a test and the python back-end sends a test back
const initializeCommunication = function() {
	console.log('Initializing Communication');
	message = new Paho.Message(JSON.stringify({ type: 'test_com' }));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);
};

// called when the client loses its connection
function onConnectionLost(responseObject) {
	//start interval for reconnecting to mqtt server
	interval = setInterval(function() {
		ConnectToMQTT();
	}, 10000);

	console.log('ik ga eruit');
	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:' + responseObject.errorMessage);
	}
}

const checkPlayerCreated = function(player) {
	return player.player != this.id;
};

const stopPlayerInit = function() {
	message = new Paho.Message(JSON.stringify({ type: 'avatar', status: 'end' }));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);
};

// called when a message arrives
function onMessageArrived(message) {
	console.log(message);
	// Receiving message
	// Read it as a JSOn
	let jsonMessage = JSON.parse(message.payloadString);
	console.log(jsonMessage);
	//console.log(jsonMessage);
	switch (jsonMessage.type) {
		// Switch case checks which Type is present in the Json message, this depends on the python back-end
		// Depending on the type in the JSON, we send something specific back
		case 'test_com':
			// We now have connection, now we can send the message for the next step, selecting the avatar
			Communication = true;
			message = new Paho.Message(JSON.stringify({ type: 'avatar', status: 'start' }));
			message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
			client.send(message);
			break;
		case 'avatar':
			console.log(players);
			if (!selectedAvatars.includes(jsonMessage.button) && players.every(checkPlayerCreated, { id: jsonMessage.player })) {
				players.push({ player: jsonMessage.player, avatar: jsonMessage.button, points: 0, time_left: 20 });
				selectedAvatars.push(jsonMessage.button);
				message = new Paho.Message(JSON.stringify({ type: 'avatar', status: 'stop', player: jsonMessage.player }));
				message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
				client.send(message);
			}
			break;
		default:
			break;
	}

	console.log(typeof jsonMessage.type);
}

const Buttonchecked = function() {
	// Change page here, go from load page to avatar selection page
	// waarde van input box ophalen
	InputFieldValue = document.querySelector('#gamePin').value;
	window.location = 'https://website1999.z6.web.core.windows.net/animate.html';
	ConnectToMQTT();
};

const init = function() {
	// Init function
	console.log('Dom Content Loaded');
	SubmitButton = document.querySelector('#js-submit');
	// Need to use this one later
	SubmitButton.addEventListener('click', Buttonchecked);
};

document.addEventListener('DOMContentLoaded', init);
