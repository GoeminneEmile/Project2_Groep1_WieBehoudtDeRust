/* -------------------------------------------------------------------------- */
// Alle interactieve onderdelen voor onze site. We maken van alle inputs een object met zijn eigen eigenschappen.
let userlogin = {},
	user = {},
	password = {},
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
	if (isEmpty(userlogin.input.value)) {
		// Stop met dit veld in de gaten te houden; het is in orde.
		userlogin.input.removeEventListener('input', doubleCheckuserloginAddress);
		removeErrors(userlogin);
	} else {
		// Stuk herhalende code.
		if (isEmpty(userlogin.input.value)) {
			user.errorMessage.innerText = 'This field is required';
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
			user.errorMessage.innerText = 'This field is required';
			console.log(user.errorMessage.innerText)
		}

		addErrors(userlogin);

		// Gebruik een named function (doubleCheckPassword), om die er weer af te kunnen halen. Dit vermijd ook het dubbel toevoegen ervan.
		userlogin.input.addEventListener('input', doubleCheckuserloginAddress);
	});

	signInButton.addEventListener('click', function(e) {
		// We gaan de form zelf versturen wanneer nodig.
		e.preventDefault();

		if (
			isEmpty(userlogin.input.value) == false) {
			console.log('Form is good to go!');
		} else {
			addErrors(userlogin);
			userlogin.input.addEventListener('oninput', doubleCheckuserloginAddress);
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
