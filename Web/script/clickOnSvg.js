/* -------------------------------------------------------------------------- */
// Alle interactieve onderdelen voor onze site. We maken van alle inputs een object met zijn eigen eigenschappen.
let	checkboxButton;
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
const getDOMElements = function() {
	checkboxButton = document.querySelectorAll('.js-checkbox-button');
	console.log(checkboxButton);
};

const enableListeners = function() {
	for(let checkbox of checkboxButton){
		checkbox.addEventListener('click', function(e) {

			if (checkbox.classList.contains("c-svg__hidden")) {
	            console.log("Hidden svg");
				checkbox.classList.remove("c-svg__hidden");
				checkbox.classList.add("c-svg__active");
			} else {
	            console.log("active");
				checkbox.classList.remove("c-svg__active");
				checkbox.classList.add("c-svg__hidden");
			}
		});
	}

};


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
