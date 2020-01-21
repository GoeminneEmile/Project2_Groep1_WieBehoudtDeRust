/* -------------------------------------------------------------------------- */
// Alle interactieve onderdelen voor onze site. We maken van alle inputs een object met zijn eigen eigenschappen.
let userlogin = {},
	user = {},
	password = {},
	confirmPass = {},
	signInButton;
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// Twee standaard functies, nog basic, maar kan je nog uitbreiden.

const isEmpty = function(fieldValue) {
	return !fieldValue || !fieldValue.length;
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
const doubleCheckuserloginAddress = function() {
	if (isEmpty(userlogin.input.value) == false) {
		removeErrors(userlogin);
	} else {
		// Stuk herhalende code.
		if (isEmpty(userlogin.input.value)) {
			user.errorMessage.innerText = 'Dit veld moet ingevuld zijn.';
		}
	}
};

const doubleCheckPasswd = function() {
	if (isEmpty(confirmPass.input.value)) {
		// Stop met dit veld in de gaten te houden; het is in orde.
		confirmPass.input.removeEventListener('input', doubleCheckPasswd);
		removeErrors(confirmPass);
	}else if (password.input.value == confirmPass.input.value){
		// Stop met dit veld in de gaten te houden; het is in orde.
		confirmPass.input.removeEventListener('input', doubleCheckPasswd);
		removeErrors(confirmPass);
	} else {
		// Stuk herhalende code.
		if (isEmpty(confirmPass.input.value)) {
			confirmPass.errorMessage.innerText = 'Dit veld moet ingevuld zijn.';
		}
	}
};


const addErrors = function(formField) {
	formField.field.classList.add('has-error');
	formField.errorMessage.classList.add('is-visible');
};

const removeErrors = function(formField) {
	formField.field.classList.remove('has-error');
	formField.errorMessage.classList.remove('is-visible');
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
const getDOMElements = function() {
	userlogin.label = document.querySelector('.js-username-label');
	userlogin.errorMessage = userlogin.label.querySelector('.js-username-error-message');
	userlogin.input = document.querySelector('.js-username-input');
	userlogin.field = document.querySelector('.js-username-field');
	password.input = document.querySelector('.js-password-input');
	confirmPass.label = document.querySelector('.js-confirm-password-label');
	confirmPass.errorMessage = confirmPass.label.querySelector('.js-password-error-message');
	confirmPass.input = document.querySelector('.js-confirm-password-input');
	confirmPass.field = document.querySelector('.js-confirm-password-field');

	// Optional
	// remember.label = document.querySelector('.js-remember-label');
	// remember.errorMessage = null; // Currently not available
	// remember.field = document.querySelector('.js-remember-input');

	signInButton = document.querySelector('.js-sign-in-button');

	// Check jezelf; hover over de gelogde DOM elementen in de console.
	// console.log(
	// 	'userlogin',
	// 	userlogin,
	// 	'password',
	// 	password,
	// 	'remember',
	// 	remember,
	// 	'button',
	// 	signInButton
	// );
};

const enableListeners = function() {
	userlogin.input.addEventListener('input', function() {
		if (isEmpty(userlogin.input.value)) {
			userlogin.errorMessage.innerText = 'Dit veld moet ingevuld zijn';
			console.log(userlogin.errorMessage.innerText)
		}

		addErrors(userlogin);

		// Gebruik een named function (doubleCheckPassword), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
		userlogin.input.addEventListener('input', doubleCheckuserloginAddress);
	});
	confirmPass.input.addEventListener('input', function() {
		if (password.input.value != confirmPass.input.value){
			confirmPass.errorMessage.innerText = 'Wachtwoord is niet hetzelfde.';
			console.log(confirmPass.errorMessage.innerText);
		}

		addErrors(confirmPass);

		// Gebruik een named function (doubleCheckPassword), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
		confirmPass.input.addEventListener('input', doubleCheckPasswd);
	});

	signInButton.addEventListener('click', function(e) {
		// We gaan de form zelf versturen wanneer nodig.
		e.preventDefault();

		if (
			isEmpty(userlogin.input.value) == false) {
			console.log('Form is good to go!');
			removeErrors(userlogin);
		} else {
			addErrors(userlogin);
			userlogin.input.addEventListener('oninput', doubleCheckuserloginAddress);
		}

		if (
			isEmpty(confirmPass.input.value) == false) {
			console.log('Form is good to go!');
		} else {
			addErrors(confirmPass);
			confirmPass.input.addEventListener('oninput', doubleCheckPasswd);
		}
	});
};
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
// We kunnen pas iets doen met onze html-content (DOM) als die geladen is.
document.addEventListener('DOMContentLoaded', function() {
	// Ook even testen of ik DoMConteeentLoeaaded goed geschreven heb...
	console.log('DOM loaded 🥳!');

	// We splitsen alles netjes op in verschillende functies.
	// 1. Alle linken leggen naar onze HTML.
	getDOMElements();

	// 2. We voegen listeners toe om te wachten op interactie
	enableListeners();
});
/* -------------------------------------------------------------------------- */
