//#region adminPage
let newQuestionIndex = 0;
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

// Generating all the questions through HTML dynamically
const generateAdminQuestionHtml = function(question) {
	let html = '';
	html += `<form id="form-${question.questionID}" class="u-border-bottom">
	<div class="o-layout">
	<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
	<h4 id="questionHeader-${question.questionID}">Question ID : ${question.questionID}</h4>
</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4 id="questionHeader-${question.questionID}">Question ID : 000000</h4>
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4>Vraag</h4>
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4  data-question="${question.questionID}" >Antwoorden</h4>
		</div>
	</div>
		<div class="o-layout">
		<div class="o-layout__item u-align-middle-svg u-align-center-clear u-1-of-3">
			<div class="o-layout o-layout--gutter-lg u-pt-clear">
				<div  class="o-layout__item u-border-right u-1-of-2 ">
						<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg" id="js-saveQuestion" data-question="${question.questionID}"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 512 512" xml:space="preserve"><path fill="#57AB18" d="M461.6 109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4-2.4 0-4.6 1-6.3 2.5L194.5 323s-78.5-75.5-80.7-77.7c-2.2-2.2-5.1-5.9-9.5-5.9s-6.4 3.1-8.7 5.4c-1.7 1.8-29.7 31.2-43.5 45.8-.8.9-1.3 1.4-2 2.1-1.2 1.7-2 3.6-2 5.7 0 2.2.8 4 2 5.7l2.8 2.6s139.3 133.8 141.6 136.1c2.3 2.3 5.1 5.2 9.2 5.2 4 0 7.3-4.3 9.2-6.2l249.1-320c1.2-1.7 2-3.6 2-5.8 0-2.5-1-4.6-2.4-6.4z"/><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="checkmark" dc:description="checkmark" dc:publisher="Iconscout" dc:date="2017-09-24" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Benjamin J Sperry</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
				</div>
				<div class="o-layout__item u-align-middle-svg u-1-of-2">
					<svg class="js-removeQuestion"xmlns="http://www.w3.org/2000/svg" data-question="${question.questionID}"data-name="Layer 1" width="48px" height="48px" viewBox="0 0 48 48"><path fill="#E2887C" d="M36,44H12a3,3,0,0,1-3-3V12a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V41A3,3,0,0,1,36,44ZM11,13V41a1,1,0,0,0,1,1H36a1,1,0,0,0,1-1V13Z"/><path fill="#E2887C" d="M35,12V38a2,2,0,0,1-2,2H10v1a2,2,0,0,0,2,2H36a2,2,0,0,0,2-2V12Z" opacity=".35"/><path fill="#E2887C" d="M43 13H5a1 1 0 0 1 0-2H43a1 1 0 0 1 0 2zM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 17 35zM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 31 35zM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0V36A1 1 0 0 1 24 37z"/><path fill="#E2887C" d="M33,13H15a1,1,0,0,1-1-1V7a3,3,0,0,1,3-3H31a3,3,0,0,1,3,3v5A1,1,0,0,1,33,13ZM16,11H32V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1Z"/></svg>
				</div>
			</div>
		</div>
		<div class="o-layout__item u-1-of-3">
			<input id="question-${question.questionID}" class="c-input c-input--xs" type="text" name="question" id="question" value="${question.questionName}" />
		</div>
		<div class="o-layout__item o-layout--column u-align-middle-svg u-1-of-3 js-questionAnswersBox-${question.questionID}" data-question="${question.questionID}">`;
	let svgClass = '';
	let index = 0;
	for (let answer of question.questionAnswers) {
		if (answer.correct) {
			svgClass = 'c-svg__active';
		} else {
			svgClass = '';
		}

		html += `<div class="o-layout u-mb-md js-answerDiv-${question.questionID}">
			<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pt-clear">
				<svg class="c-svg__check ${svgClass} js-check js-check-${question.questionID}" data-correct="${answer.correct}" data-question="${question.questionID}" data-index="${index}"  xmlns="http://www.w3.org/2000/svg" width="18.684" height="18.684" viewBox="0 0 18.684 18.684">
				  <path id="Icon_22_" d="M80.608,64H66.076A2.082,2.082,0,0,0,64,66.076V80.608a2.082,2.082,0,0,0,2.076,2.076H80.608a2.082,2.082,0,0,0,2.076-2.076V66.076A2.082,2.082,0,0,0,80.608,64ZM71.266,78.532l-5.19-5.19,1.453-1.453,3.737,3.737,7.889-7.889,1.453,1.453Z" transform="translate(-64 -64)" fill="#192a9a"/>
				</svg>
			</div>
			<div class="o-layout__item u-align-middle-svg u-2-of-3">
				<input class="c-input c-input--xs c-input__answer answer-${question.questionID}" type="text" data-correct="${answer.correct}" data-index="${index}" name="answer" data- value="${answer.answer}" />
			</div>
            <div class="o-layout__item u-align-middle-svg u-1-of-4 u-pt-clear ">
                <div class="c-answer-svg">
                    <svg class="c-answer-svg__garbage c-removeAnswer-${question.questionID}" data-question="${question.questionID}" data-index="${index}"xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 48 48"><path fill="#E2887C" d="M36,44H12a3,3,0,0,1-3-3V12a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V41A3,3,0,0,1,36,44ZM11,13V41a1,1,0,0,0,1,1H36a1,1,0,0,0,1-1V13Z"/><path fill="#E2887C" d="M35,12V38a2,2,0,0,1-2,2H10v1a2,2,0,0,0,2,2H36a2,2,0,0,0,2-2V12Z" opacity=".35"/><path fill="#E2887C" d="M43 13H5a1 1 0 0 1 0-2H43a1 1 0 0 1 0 2zM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 17 35zM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 31 35zM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0V36A1 1 0 0 1 24 37z"/><path fill="#E2887C" d="M33,13H15a1,1,0,0,1-1-1V7a3,3,0,0,1,3-3H31a3,3,0,0,1,3,3v5A1,1,0,0,1,33,13ZM16,11H32V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1Z"/></svg>
                </div>
            </div>
		</div>`;
		index++;
	}

	html += `
			<svg xmlns="http://www.w3.org/2000/svg" class="js-addNewAnswer addAnswer-${question.questionID}" data-question="${question.questionID}" width="19" height="19" viewBox="0 0 19 19">
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

// Changing the correct answer
const changeAnswerCorrect = function() {
	this.classList.toggle('c-svg__active');
	const Answers = document.querySelectorAll(`.answer-${this.dataset.question}`);
	for (let Answer of Answers) {
		console.log(Answer.dataset.index);
		if (Answer.dataset.index == this.dataset.index) {
			console.log(Answer.dataset.correct);
			if (Answer.dataset.correct == 0) {
				Answer.dataset.correct = 1;
				this.dataset.correct = 1;
				break;
			} else {
				Answer.dataset.correct = 0;
				this.dataset.correct = 0;
				break;
			}
		}
	}
};

// Removing an already added answer
const deleteAnswer = function() {
	const questionBox = document.querySelector(`.js-answerDiv-${this.dataset.question}`);
	questionBox.remove();
};

//let's all plus buttons add a new answer to a question
const initializeEventListeners = function() {
	// gets all plus buttons using js-addNewAnswer class
	const allAddNewAnwsers = document.querySelectorAll('.js-addNewAnswer');
	for (let addNewAnswersvg of allAddNewAnwsers) {
		addNewAnswersvg.addEventListener('click', addNewAnswer);
	}
	const saveQuestions = document.querySelectorAll('#js-saveQuestion');
	const deleteAnswers = document.querySelectorAll('.c-answer-svg__garbage');
	const checkBoxes = document.querySelectorAll('.js-check');
	const newQuestion = document.querySelector('#js-addQuestion');
	const deleteQuestions = document.querySelectorAll('.js-removeQuestion');
	for (let deleteAnswer of deleteAnswers) {
		try {
			deleteAnswer.removeEventListener('click', deleteAnswer);
		} catch (error) {}
	}
	for (let deleteAnswerAdd of deleteAnswers) {
		deleteAnswerAdd.addEventListener('click', deleteAnswer);
	}
	for (let deleteQuestion of deleteQuestions) {
		try {
			deleteQuestion.removeEventListener('click', deleteQuestion);
		} catch (error) {}
	}
	console.log(deleteQuestions);

	for (let deleteQuestionButton of deleteQuestions) {
		deleteQuestionButton.addEventListener('click', deleteQuestion);
	}
	for (let checkBox of checkBoxes) {
		try {
			checkBox.removeEventListener('click', changeAnswerCorrect);
		} catch (error) {}
	}
	for (let saveQuestion of saveQuestions) {
		try {
			saveQuestion.removeEventListener('click', saveNewQuestion);
		} catch (error) {}
	}
	for (let checkBox of checkBoxes) {
		checkBox.addEventListener('click', changeAnswerCorrect);
	}

	for (let saveQuestion of saveQuestions) {
		saveQuestion.addEventListener('click', saveNewQuestion);
	}
	newQuestion.addEventListener('click', addQuestion);
};

// Loading the page
const loadAdminPage = function() {
	newQuestion = 0;
	ReplaceRow.innerHTML = adminPage;
	let form = document.querySelector('.js-questionsForm');
	GetQuestions().then((x) => {
		let htmlQuestions = '';
		for (let i of x.reverse()) {
			htmlQuestions += generateAdminQuestionHtml(i);
		}
		htmlQuestions += `<div class="o-layout u-pb-lg js-addQuestionDiv">
		<div class="o-layout__item u-align-middle-svg u-pt-md">
			<svg xmlns="http://www.w3.org/2000/svg" width="19" id="js-addQuestion" height="19" viewBox="0 0 19 19">
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
		form.innerHTML = htmlQuestions;
		initializeEventListeners();
	});
};

// Saving a new question with all the parameters to the database
const saveNewQuestion = function() {
	const Answers = document.querySelectorAll(`.answer-${this.dataset.question}`);
	const Question = document.querySelector(`#question-${this.dataset.question}`).value;

	let answers = [];
	let json = {};
	for (let Answer of Answers) {
		if (this.dataset.question.length < 36) {
			answers.push({ questionAnswer: '00000000-0000-0000-0000-000000000000', answer: Answer.value, correct: Answer.dataset.correct });
		} else {
			answers.push({ questionAnswer: this.dataset.question, answer: Answer.value, correct: Answer.dataset.correct });
		}
	}
	if (this.dataset.question.length < 36) {
		json = {
			questionID: '00000000-0000-0000-0000-000000000000',
			questionName: Question,
			UserId: userGuid,
			questionAnswers: answers
		};
	} else {
		json = {
			questionID: this.dataset.question,
			questionName: Question,
			UserId: userGuid,
			questionAnswers: answers
		};
	}
	postQuestion(json).then((x) => {
		refreshQuestion(this.dataset.question, x.questionID);
		this.dataset.question = x.questionID;
	});
};

// Deleting a question
const deleteQuestion = function() {
	console.log('yes');
	if (this.dataset.question.length < 36) {
		const form = document.querySelector(`#form-${this.dataset.question}`);
		form.remove();
	} else {
		deleteQuestionRequest(this.dataset.question).then((x) => {
			if (x != 400) {
				console.log('deleted');
				const form = document.querySelector(`#form-${this.dataset.question}`);
				form.remove();
			} else {
				console.log('er is een probleem');
			}
		});
	}
};

// WIP
const deleteQuestionRequest = async function(guid) {
	let serverEndPoint = `https://project2functions.azurewebsites.net/api/DeleteQuestion?guid=${guid}`;
	const response = await fetch(serverEndPoint, { headers: customheaders, method: 'GET', mode: 'cors' });
	const data = await response.status;
	//console.log(data);
	return data;
};

// WIP
const refreshQuestion = function(oldId, newId) {
	const trashCans = document.querySelectorAll(`.c-removeAnswer-${oldId}`);
	const answerDiv = document.querySelector(`.js-answerDiv-${oldId}`);
	const header = document.querySelector(`#questionHeader-${oldId}`);
	header.id = `questionHeader-${newId}`;
	header.innerHTML = `Question ID :${newId}`;
	answerDiv.classList.remove(`js-answerDiv-${oldId}`);
	answerDiv.classList.add(`js-answerDiv-${newId}`);
	const question = document.querySelector(`#question-${oldId}`);
	question.id = `question-${newId}`;
	const checkBoxes = document.querySelectorAll(`.js-check-${oldId}`);
	for (let trashCan of trashCans) {
		trashCan.classList.remove(`c-removeAnswer-${oldId}`);
		trashCan.classList.add(`c-removeAnswer-${newId}`);
		trashCan.dataset.question = newId;
	}
	for (let checkBox of checkBoxes) {
		checkBox.classList.remove(`js-check-${oldId}`);
		checkBox.classList.add(`js-check-${newId}`);
		checkBox.dataset.question = newId;
	}
	const answers = document.querySelectorAll(`.answer-${oldId}`);
	for (let answer of answers) {
		console.log('ik ben de answer aan het veranderen');
		answer.classList.remove(`answer-${oldId}`);
		answer.classList.add(`answer-${newId}`);
	}
	const form = document.querySelector(`#form-${oldId}`);
	form.id = `form-${newId}`;
	const deleteQuestions = document.querySelectorAll(`.js-removeQuestion`);
	for (let deleteQuestion of deleteQuestions) {
		deleteQuestion.dataset.question = newId;
	}
};

// Adding a custom answer to your question
const addNewAnswer = function() {
	const currentAnswers = document.querySelectorAll(`.answer-${this.dataset.question}`);
	if (currentAnswers.length < 4) {
		const answersBox = document.querySelector(`.js-questionAnswersBox-${this.dataset.question}`);
		answersBox.insertAdjacentHTML(
			'afterbegin',
			`<div class="o-layout u-mb-md js-answerDiv-${this.dataset.question}">
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pt-clear">
			<svg class="c-svg__check js-check js-check-${this.dataset.question}" data-correct="0" data-question="${this.dataset.question}" data-index="1"  xmlns="http://www.w3.org/2000/svg" width="18.684" height="18.684" viewBox="0 0 18.684 18.684">
			  <path id="Icon_22_" d="M80.608,64H66.076A2.082,2.082,0,0,0,64,66.076V80.608a2.082,2.082,0,0,0,2.076,2.076H80.608a2.082,2.082,0,0,0,2.076-2.076V66.076A2.082,2.082,0,0,0,80.608,64ZM71.266,78.532l-5.19-5.19,1.453-1.453,3.737,3.737,7.889-7.889,1.453,1.453Z" transform="translate(-64 -64)" fill="#192a9a"/>
			</svg>
		</div>
		<div class="o-layout__item u-align-middle-svg u-2-of-3">
			<input  class="c-input c-input--xs c-input__answer answer-${this.dataset.question}" type="text" data-correct="0" data-index="1" name="answer" data- placeholder="....." />
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-4 u-pt-clear ">

		<div class="c-answer-svg">
                <svg class="c-answer-svg__garbage c-removeAnswer-${this.dataset.question}" data-question="${this.dataset.question}" data-index="1"xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 48 48"><path fill="#E2887C" d="M36,44H12a3,3,0,0,1-3-3V12a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V41A3,3,0,0,1,36,44ZM11,13V41a1,1,0,0,0,1,1H36a1,1,0,0,0,1-1V13Z"/><path fill="#E2887C" d="M35,12V38a2,2,0,0,1-2,2H10v1a2,2,0,0,0,2,2H36a2,2,0,0,0,2-2V12Z" opacity=".35"/><path fill="#E2887C" d="M43 13H5a1 1 0 0 1 0-2H43a1 1 0 0 1 0 2zM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 17 35zM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 31 35zM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0V36A1 1 0 0 1 24 37z"/><path fill="#E2887C" d="M33,13H15a1,1,0,0,1-1-1V7a3,3,0,0,1,3-3H31a3,3,0,0,1,3,3v5A1,1,0,0,1,33,13ZM16,11H32V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1Z"/></svg>
                 </div>
        </div>
	</div>`
		);
	}
	initializeEventListeners();
	reassignAnswerIndex(this.dataset.question);
};

// WIP
const reassignAnswerIndex = function(id) {
	const inputs = document.querySelectorAll(`.answer-${id}`);
	const answers = document.querySelectorAll(`.js-check-${id}`);
	index = 0;
	for (let answer of answers) {
		answer.dataset.index = index;
		index++;
	}
	index = 0;
	for (let input of inputs) {
		input.dataset.index = index;
		index++;
	}
};

// Loading in all the questions into the HTML
const addQuestion = function() {
	const form = document.querySelector('.js-questionsForm');
	const addQuestionNode = document.querySelector('.js-addQuestionDiv');
	addQuestionNode.remove();
	const newForm = document.createElement('FORM');
	newForm.innerHTML = `<form class="u-border-bottom">
	<div class="o-layout">
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4 id="questionHeader-${newQuestionIndex}">Question ID : ${newQuestionIndex}</h4>
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4>Vraag</h4>
		</div>
		<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pb-clear">
			<h4>Antwoorden</h4>
		</div>
	</div>
		<div class="o-layout">
		<div class="o-layout__item u-align-middle-svg u-align-center-clear u-1-of-3">
			<div class="o-layout o-layout--gutter-lg u-pt-clear">
				<div class="o-layout__item u-border-right u-1-of-2">
						<?xml version="1.0" encoding="UTF-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg xmlns="http://www.w3.org/2000/svg"  xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="js-saveQuestion" data-question="${newQuestionIndex}" x="0px" y="0px" width="48px" height="48px" viewBox="0 0 512 512" xml:space="preserve"><path fill="#57AB18" d="M461.6 109.6l-54.9-43.3c-1.7-1.4-3.8-2.4-6.2-2.4-2.4 0-4.6 1-6.3 2.5L194.5 323s-78.5-75.5-80.7-77.7c-2.2-2.2-5.1-5.9-9.5-5.9s-6.4 3.1-8.7 5.4c-1.7 1.8-29.7 31.2-43.5 45.8-.8.9-1.3 1.4-2 2.1-1.2 1.7-2 3.6-2 5.7 0 2.2.8 4 2 5.7l2.8 2.6s139.3 133.8 141.6 136.1c2.3 2.3 5.1 5.2 9.2 5.2 4 0 7.3-4.3 9.2-6.2l249.1-320c1.2-1.7 2-3.6 2-5.8 0-2.5-1-4.6-2.4-6.4z"/><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="checkmark" dc:description="checkmark" dc:publisher="Iconscout" dc:date="2017-09-24" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Benjamin J Sperry</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
				</div>
				<div class="o-layout__item u-align-middle-svg u-1-of-2">
					<svg class="js-removeQuestion" data-question="${newQuestionIndex}"xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" width="48px" height="48px" viewBox="0 0 48 48"><path fill="#E2887C" d="M36,44H12a3,3,0,0,1-3-3V12a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V41A3,3,0,0,1,36,44ZM11,13V41a1,1,0,0,0,1,1H36a1,1,0,0,0,1-1V13Z"/><path fill="#E2887C" d="M35,12V38a2,2,0,0,1-2,2H10v1a2,2,0,0,0,2,2H36a2,2,0,0,0,2-2V12Z" opacity=".35"/><path fill="#E2887C" d="M43 13H5a1 1 0 0 1 0-2H43a1 1 0 0 1 0 2zM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 17 35zM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 31 35zM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0V36A1 1 0 0 1 24 37z"/><path fill="#E2887C" d="M33,13H15a1,1,0,0,1-1-1V7a3,3,0,0,1,3-3H31a3,3,0,0,1,3,3v5A1,1,0,0,1,33,13ZM16,11H32V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1Z"/></svg>
				</div>
			</div>
		</div>
		<div class="o-layout__item u-1-of-3">
			<input id="question-${newQuestionIndex}" data-NewQuestion="${newQuestionIndex}" class="c-input c-input--xs js-newQuestion-${newQuestionIndex}" type="text" name="question" id="question" placeholder="....." />
		</div>
		<div class="o-layout__item o-layout--column u-align-middle-svg u-1-of-3 js-questionAnswersBox-${newQuestionIndex}">
			<div class="o-layout u-mb-md js-answerDiv-${newQuestionIndex}">
				<div class="o-layout__item u-align-middle-svg u-1-of-3 u-pt-clear">
					<svg class="c-svg__check js-check js-check-${newQuestionIndex}" xmlns="http://www.w3.org/2000/svg" data-correct="0" data-question="${newQuestionIndex}" width="18.684" height="18.684" viewBox="0 0 18.684 18.684">
					  <path id="Icon_22_" d="M80.608,64H66.076A2.082,2.082,0,0,0,64,66.076V80.608a2.082,2.082,0,0,0,2.076,2.076H80.608a2.082,2.082,0,0,0,2.076-2.076V66.076A2.082,2.082,0,0,0,80.608,64ZM71.266,78.532l-5.19-5.19,1.453-1.453,3.737,3.737,7.889-7.889,1.453,1.453Z" transform="translate(-64 -64)" fill="#192a9a"/>
					</svg>
				</div>
				<div class="o-layout__item u-align-middle-svg u-2-of-3">
					<input  data-question="${newQuestionIndex}" class="c-input c-input--xs c-input__answer answer-${newQuestionIndex}"data-correct="0" type="text" name="answer" id="answer" placeholder="....." />
				</div>
				<div class="o-layout__item u-align-middle-svg u-1-of-4 u-pt-clear ">
                <div class="c-answer-svg">
                    <svg class="c-answer-svg__garbage c-removeAnswer-${newQuestionIndex}" data-question="${newQuestionIndex}" data-index="${newQuestionIndex}" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 48 48"><path fill="#E2887C" d="M36,44H12a3,3,0,0,1-3-3V12a1,1,0,0,1,1-1H38a1,1,0,0,1,1,1V41A3,3,0,0,1,36,44ZM11,13V41a1,1,0,0,0,1,1H36a1,1,0,0,0,1-1V13Z"/><path fill="#E2887C" d="M35,12V38a2,2,0,0,1-2,2H10v1a2,2,0,0,0,2,2H36a2,2,0,0,0,2-2V12Z" opacity=".35"/><path fill="#E2887C" d="M43 13H5a1 1 0 0 1 0-2H43a1 1 0 0 1 0 2zM17 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 17 35zM31 35a1 1 0 0 1-1-1V20a1 1 0 0 1 2 0V34A1 1 0 0 1 31 35zM24 37a1 1 0 0 1-1-1V18a1 1 0 0 1 2 0V36A1 1 0 0 1 24 37z"/><path fill="#E2887C" d="M33,13H15a1,1,0,0,1-1-1V7a3,3,0,0,1,3-3H31a3,3,0,0,1,3,3v5A1,1,0,0,1,33,13ZM16,11H32V7a1,1,0,0,0-1-1H17a1,1,0,0,0-1,1Z"/></svg>
                </div>
            </div>
			</div>
			
			<svg xmlns="http://www.w3.org/2000/svg"  class="js-addNewAnswer addAnswer-${newQuestionIndex}" data-question="${newQuestionIndex}" width="19" height="19" viewBox="0 0 19 19">
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
	</div></form>`;
	newForm.className = 'u-border-bottom';
	newForm.id = `form-${newQuestionIndex}`;
	form.appendChild(newForm);
	const newAddQuestions = document.createElement('div');
	newAddQuestions.className = 'o-layout u-pb-lg js-addQuestionDiv';
	newAddQuestions.innerHTML = `
	<div class="o-layout__item u-align-middle-svg u-pt-md">
		<svg xmlns="http://www.w3.org/2000/svg" width="19" id="js-addQuestion" height="19" viewBox="0 0 19 19">
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
	
	`;
	form.appendChild(newAddQuestions);
	const newQuestion = document.querySelector('#js-addQuestion');
	newQuestion.addEventListener('click', addQuestion);
	newQuestionIndex++;
	initializeEventListeners();
};

// Post Question function, adding a question to the database
const postQuestion = async function(questionJson) {
	console.log(questionJson);
	let serverEndPoint = `https://project2functions.azurewebsites.net/api/PostQuestion`;
	const response = await fetch(serverEndPoint, { headers: customheaders, method: 'POST', mode: 'cors', body: JSON.stringify(questionJson) });
	const data = await response.json();
	//console.log(data);
	return data;
};
