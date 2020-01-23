let username, password, confirmPassword;
//#region loader
let loader = `<div class="o-row">
<div class="c-loader">
  <svg class="c-loader__symbol" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg"
	xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 128 128">
	<g id="Loader">
	  <g id="Heart">
		<image id="like" class="c-path-1" width="512" height="512" transform="translate(43 46) scale(0.08)"
		  xlink:href="data:image/png;base64,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" />
	  </g>
	  <g class="rotate-center" id="Strokes">
		<path id="yellow" class="c-path-2" d="M36.18,87.09A35.6,35.6,0,0,0,59,99.21"
		  transform="translate(1 -0)" />
		<path id="green" class="c-path-3" d="M40.71,36a35.63,35.63,0,0,0-13,23.56"
		  transform="translate(1.5 0.1)" />
		<path id="Blue" class="c-path-4" d="M98.58,69.4A35.58,35.58,0,0,1,85.44,91.68"
		  transform="translate(-0.2 -0)" />
		<path id="red" class="c-path-5" d="M73.18,29.39A35.6,35.6,0,0,1,94.33,46"
		  transform="translate(-0.15 -0)" />
	  </g>
	</g>
  </svg>
</div>
</div>
<div class="c-message__loader js-loading-message">
</div>`;
//#endregion
// global customheaders for GET request
let customheaders = new Headers();
// Adding the user to the database
const AddUser = async function() {
	console.log('Adding user');
	let serverEndPoint = `https://project2functions.azurewebsites.net/api/AddUser`;
	const Body = {
		username: username,
		password: password
	};
	const response = await fetch(serverEndPoint, { method: 'POST', body: JSON.stringify(Body) });
	const data = await response.json();
	console.log(data);
	if (data == 201) {
		window.location.href = 'index.html';
	} else {
		window.location.href = 'register.html';
	}
	return data;
};

// Signing in and checking if the given password and confirm password are the same
const SignUpFunction = function() {
	username = document.querySelector('#username').value;
	password = document.querySelector('#password').value;
	confirmPassword = document.querySelector('#confirm_password').value;
	errorMessage = document.querySelector('.js-password-error-message');
	if (password == confirmPassword) {
		errorMessage.style.display = 'none';
		if (password != '' && confirmPassword != '' && username != '') {
			AddUser();
		}
	} else {
		errorMessage.style.display = 'block';
	}
};

const returnToLogin = function() {
	console.log('clicked');
	window.location.href = 'index.html';
};

// Init function for loading DOM and loading first page
const init = function() {
	let BackButton = document.querySelector('.js-button-back');
	let SignUpButton = document.querySelector('.js-sign-up-button');
	BackButton.addEventListener('click', returnToLogin);
	SignUpButton.addEventListener('click', SignUpFunction);
};

document.addEventListener('DOMContentLoaded', init);