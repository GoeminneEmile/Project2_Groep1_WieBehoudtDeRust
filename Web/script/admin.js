//#region adminPage
let adminPage = `            
<div class="o-container c-admin c-background--white js-questionsForm">


<div class="o-layout u-pb-lg">
	<div class="o-layout__item u-align-middle-svg u-pt-md">
		<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
		  <g id="Page-1" transform="translate(0 0.414)">
			<g id="Artboard" transform="translate(1 1)">
			  <g id="plus-square" transform="translate(0 0)">
				<rect id="Rectangle-path" width="17" height="17" rx="1" stroke-width="2" transform="translate(0 -0.414)" stroke="#e2887c" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
				<path id="Shape" d="M9,5v7.371" transform="translate(-0.707 -0.393)" fill="none" stroke="#e2887c" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill-rule="evenodd"/>
				<path id="Shape-2" data-name="Shape" stroke="#e2887c" d="M5,9h7.371" fill="none" transform="translate(-0.393 -0.707)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill-rule="evenodd"/>
			  </g>
			</g>
		  </g>
		</svg>
	</div>
</div>`;
//#endregion

let username = 'Luka';
let customheaders = new Headers();

const generateAdminQuestionHtml = function(question) {
	let html = '';
	html += `<form class="u-border-bottom">
	<div class="o-layout">
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4>Question ID : ${question.questionID}</h4>
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4>Vraag</h4>
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4  data-question="${question.questionID}" id="js-saveQuestion">Antwoorden</h4>
		</div>
	</div>
		<div class="o-layout">
		<div class="o-layout__item u-align-middle-svg u-align-center-clear u-1-of-3">
			<div class="o-layout o-layout--gutter-lg u-pt-clear">
				<div  class="o-layout__item u-border-right u-1-of-2 ">
						<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 512 512" xml:space="preserve"><path fill="#57AB18" d="M461.6 109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4-2.4 0-4.6 1-6.3 2.5L194.5 323s-78.5-75.5-80.7-77.7c-2.2-2.2-5.1-5.9-9.5-5.9s-6.4 3.1-8.7 5.4c-1.7 1.8-29.7 31.2-43.5 45.8-.8.9-1.3 1.4-2 2.1-1.2 1.7-2 3.6-2 5.7 0 2.2.8 4 2 5.7l2.8 2.6s139.3 133.8 141.6 136.1c2.3 2.3 5.1 5.2 9.2 5.2 4 0 7.3-4.3 9.2-6.2l249.1-320c1.2-1.7 2-3.6 2-5.8 0-2.5-1-4.6-2.4-6.4z"/><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="checkmark" dc:description="checkmark" dc:publisher="Iconscout" dc:date="2017-09-24" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Benjamin J Sperry</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
				</div>
				<div class="o-layout__item u-align-middle-svg u-1-of-2">
					<svg class=""xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="48px" height="48px" viewBox="0 0 48 48"><path fill="#E2887C" d="M36,44H12a3,3,0,0,1-3-3V12a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V41A3,3,0,0,1,36,44ZM11,13V41a1,1,0,0,0,1,1H36a1,1,0,0,0,1-1V13Z"/><path fill="#E2887C" d="M35,12V38a2,2,0,0,1-2,2H10v1a2,2,0,0,0,2,2H36a2,2,0,0,0,2-2V12Z" opacity=".35"/><path fill="#E2887C" d="M43 13H5a1 1 0 0 1 0-2H43a1 1 0 0 1 0 2zM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 17 35zM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 31 35zM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0V36A1 1 0 0 1 24 37z"/><path fill="#E2887C" d="M33,13H15a1,1,0,0,1-1-1V7a3,3,0,0,1,3-3H31a3,3,0,0,1,3,3v5A1,1,0,0,1,33,13ZM16,11H32V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1Z"/></svg>
				</div>
			</div>
		</div>
		<div class="o-layout__item u-1-of-3">
			<input id="question-${question.questionID}" class="c-input c-input--xs" type="text" name="question" id="question" value="${question.questionName}" />
		</div>
		<div class="o-layout__item o-layout--column u-align-middle-svg u-1-of-3">`;
	let svgClass = '';
	for (let answer of question.questionAnswers) {
		if (answer.correct) {
			svgClass = 'c-svg__active';
		} else {
			console.log('incorrect');
			svgClass = '';
		}

		html += `<div class="o-layout u-mb-md">
			<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pt-clear">
				<svg class="c-svg__check ${svgClass} js-check" xmlns="http://www.w3.org/2000/svg" width="18.684" height="18.684" viewBox="0 0 18.684 18.684">
				  <path id="Icon_22_" d="M80.608,64H66.076A2.082,2.082,0,0,0,64,66.076V80.608a2.082,2.082,0,0,0,2.076,2.076H80.608a2.082,2.082,0,0,0,2.076-2.076V66.076A2.082,2.082,0,0,0,80.608,64ZM71.266,78.532l-5.19-5.19,1.453-1.453,3.737,3.737,7.889-7.889,1.453,1.453Z" transform="translate(-64 -64)" fill="#192a9a"/>
				</svg>
			</div>
			<div class="o-layout__item u-align-middle-svg u-2-of-3">
				<input id="answer-${question.questionID}" class="c-input c-input--xs c-input__answer" type="text" name="answer" id="answer" value="${answer.answer}" />
			</div>
		</div>`;
	}

	html += `
			<svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19">
			  <g id="Page-1" transform="translate(0 0.414)">
				<g id="Artboard" transform="translate(1 1)">
				  <g id="plus-square" transform="translate(0 0)">
					<rect id="Rectangle-path" width="17" height="17" rx="1" stroke-width="2" transform="translate(0 -0.414)" stroke="#e2887c" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
					<path id="Shape" d="M9,5v7.371" transform="translate(-0.707 -0.393)" fill="none" stroke="#e2887c" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill-rule="evenodd"/>
					<path id="Shape-2" data-name="Shape" stroke="#e2887c" d="M5,9h7.371" fill="none" transform="translate(-0.393 -0.707)" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" fill-rule="evenodd"/>
				  </g>
				</g>
			  </g>
			</svg>
		</div>
		</div>
		</form>`;
	return html;
};

// Function to GET all questions
const GetQuestions = async function() {
	let serverEndPoint = `https://project2functions.azurewebsites.net/api/GetQuestions?username=${username}`;
	const response = await fetch(serverEndPoint, { headers: customheaders });
	const data = await response.json();
	//console.log(data);
	return data;
};

const changeAnswerCorrect = function() {
	this.classList.toggle('c-svg__active');
};

const loadAdminPage = function() {
	ReplaceRow.innerHTML = adminPage;
	let form = document.querySelector('.js-questionsForm');
	GetQuestions().then((x) => {
		let htmlQuestions = '';
		for (let i of x) {
			console.log(i);
			htmlQuestions += generateAdminQuestionHtml(i);
		}
		form.innerHTML = htmlQuestions;
		const saveQuestions = document.querySelectorAll('#js-saveQuestion');
		const checkBoxes = document.querySelectorAll('.js-check');
		for (let checkBox of checkBoxes) {
			checkBox.addEventListener('click', changeAnswerCorrect);
		}
		for (let saveQuestion of saveQuestions) {
			console.log('yeeeeeeeeeeeeee');
			saveQuestion.addEventListener('click', saveQuestion);
		}
	});
};

const init = function() {
	// Init function
	ReplaceRow = document.querySelector('.js-row');
	console.log('Dom Loaded');
	loadAdminPage();
};

document.addEventListener('DOMContentLoaded', init);
