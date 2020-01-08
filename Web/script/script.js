let SubmitButton, InputFieldValue;
let client;
let Communication;
let players = [];
let selectedAvatars = [];
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
	console.log(InputFieldValue);
	// message opbouwen
	message = new Paho.Message(JSON.stringify({ first_name: 'Luka', last_name: 'De Bakker' }));
	// topic beslissen voor op te sturen
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	// bericht versturen
	client.send(message);
}

const initializeCommunication = function() {
	message = new Paho.Message(JSON.stringify({ type: 'test_com' }));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);
};

// called when the client loses its connection
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:' + responseObject.errorMessage);
	}
}
const checkPlayerCreated = function(player){
	return player.player != this.id;
}
const stopPlayerInit = function(){
	message = new Paho.Message(JSON.stringify({type: "avatar",status: "end"}));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);
	
}
// called when a message arrives
function onMessageArrived(message) {
	// message versturen
	let jsonMessage = JSON.parse(message.payloadString);
	switch (jsonMessage.type) {
		case 'test_com':
			Communication = true;
			message = new Paho.Message(JSON.stringify({type: "avatar",status: "start"}));
			message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
			client.send(message);
			break;
		case 'avatar':
			console.log(players);
			if (!selectedAvatars.includes(jsonMessage.button) && players.every(checkPlayerCreated,{id:jsonMessage.player})) {
				players.push({ player: jsonMessage.player, avatar: jsonMessage.button, points: 0, time_left: 20 });
				selectedAvatars.push(jsonMessage.button);
				message = new Paho.Message(JSON.stringify({type: "avatar",status: "stop",player: jsonMessage.player}));
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
	// waarde van input box ophalen
	InputFieldValue = document.querySelector('#gamePin').value;
	ConnectToMQTT();
};

const init = function() {
	console.log('Dom Content Loaded');
	SubmitButton = document.querySelector('#js-submit');
	//InitializeButton = document.querySelector('#js-initialize');
	SubmitButton.addEventListener('click', Buttonchecked);
	//InitializeButton.addEventListener('click', initializeCommunication);
};

document.addEventListener('DOMContentLoaded', init);
