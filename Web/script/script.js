// global LET's
let SubmitButton,
	InputFieldValue,
	ReplaceRow,
	AnimateRow,
	QuestionRow,
	RandomQuestion,
	AvatarButton,
	QuestionAvatarsList,
	avatarCounter = 1,
	ScoreList,
	PlayerName,
	userGuid,
	AnswersList,
	juistAntwoord,
	juisteButton,
	TimeLeft,
	indexQuestion,
	username = 'Luka',
	playerCount = 0,
	gameStep = 0,
	IsFirstQuestion = true,
	IsRestBpm = true,
	RestBpmCount = 0,
	playersBpmCount = 0,
	client,
	Communication,
	player1_rest_bpm,
	player2_rest_bpm,
	player3_rest_bpm,
	player4_rest_bpm,
	player1_bpm,
	player2_bpm,
	player3_bpm,
	player4_bpm,
	errorMessageInterval = 10000,
	intervalErrorMessage,
	RandomImage;

// global Lists
let players = [];
let selectedAvatars = [];
let QuestionList = [];
let pulsarList = [];
let PlayerBPMList = [];
let playerAnswers = [];
let playersAnswers = [];
let playersAnswered = [];
let AnswersGotten = [];
let gameOver = false;
let PointsGained = [];
let juisteButtons = [];
let SportsDescriptions = [ 'Stilstaand lopen', 'Push ups', 'Jumping Jacks' ];
let playerRestBPM = [ player1_rest_bpm, player2_rest_bpm, player3_rest_bpm, player4_rest_bpm ];
let playerBPM = [ player1_bpm, player2_bpm, player3_bpm, player4_bpm ];
let Rankings = [];
let sports = [ './img/sports_1.svg', './img/sports_2.svg', './img/sports_3.svg' ];
// global customheaders for GET request
let customheaders = new Headers();

// global array's
let tempPulsarList = { 0: undefined, 1: undefined, 2: undefined, 3: undefined };

//#region Avatars
//#region Panda
let Panda = `
<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
</div>`;
//#endregion
//#region Dolphin
let Dolphin = `
<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1843_"><ellipse id="XMLID_1426_" class="st5" cx="21.8" cy="45.3" rx="11.5" ry="1.5" fill="#45413C" opacity="0.15"/><path id="XMLID_1425_" class="st35" d="M36.7 19c-.5-4.6-3-8.6-6.6-11.2C31.5 3 34 2.5 31.6 1.4c-2.1-.9-6.3 2-8.3 3.6-.3-.1-.6-.1-.9-.1-.6-.1-1.2-.1-1.7-.1C13.4 4.8 8.3 9 7 13.7c-2.8 1.2-6.1 4.5-4.9 6.4C3.2 22 5.9 21.6 9 21.4c2.1 1.2 4 .8 8.6 1.3 6.5.6 7.5 4.2 7.7 6 .2 2.4-.5 4.1-1.6 5.6-.6-.9-2-2.6-4-2.6h-3.6c-.4 0-.6.3-.5.7.6 1.6 2.3 5.3 5.1 5.3-.7 4 3.8 6.3 5.6 7.1.3.1.7-.1.7-.4 0-.7.1-1.8.4-3.6.3-2.5-.6-3.8-1.6-4.4C32.8 34 37.7 27 36.7 19z" fill="#00B8F0"/><path id="XMLID_1424_" class="st36" d="M36.8 19.7c0-.2 0-.5-.1-.7-.5-4.6-3-8.6-6.6-11.2 0 0 .4 2.4 0 4.1 1.8.6 6.1 4.4 6.7 7.8z" fill="#4ACFFF"/><g id="XMLID_1422_"><path id="XMLID_1423_" class="st36" d="M7.8 16.7c1.3-4.8 6.4-9 13.6-9 .6 0 1.2 0 1.7.1.3 0 .6.1.9.1 1.9-1.4 5.5-3.9 7.7-3.7.9-1.6 1.5-2.1-.1-2.8-2.1-.9-6.3 2-8.3 3.6-.3-.1-.6-.1-.9-.1-.6-.1-1.2-.1-1.7-.1C13.4 4.8 8.3 9 7 13.7c-2.8 1.2-6.1 4.5-4.9 6.4.2.3.5.6.8.8.8-1.6 2.9-3.4 4.9-4.2z" fill="#4ACFFF"/></g><path id="XMLID_1421_" class="st10" d="M36.7 19c-.5-4.6-3-8.6-6.6-11.2C31.5 3 34 2.5 31.6 1.4c-2.1-.9-6.3 2-8.3 3.6-.3-.1-.6-.1-.9-.1-.6-.1-1.2-.1-1.7-.1C13.4 4.8 8.3 9 7 13.7c-2.8 1.2-6.1 4.5-4.9 6.4C3.2 22 5.9 21.6 9 21.4c2.1 1.2 4 .8 8.6 1.3 6.5.6 7.5 4.2 7.7 6 .2 2.4-.5 4.1-1.6 5.6-.6-.9-2-2.6-4-2.6h-3.6c-.4 0-.6.3-.5.7.6 1.6 2.3 5.3 5.1 5.3-.7 4 3.8 6.3 5.6 7.1.3.1.7-.1.7-.4 0-.7.1-1.8.4-3.6.3-2.5-.6-3.8-1.6-4.4C32.8 34 37.7 27 36.7 19z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1420_" class="st15" d="M23.1 21.3c-4.7-1.4-10.1 0-13.5-2.5-2.3 1.2-5.8.9-7.7.6 0 .3.1.5.2.8C3.2 22 5.9 21.6 9 21.4c2.1 1.2 4 .8 8.6 1.3 6.5.6 7.5 4.2 7.7 6 .2 2.4-.5 4.1-1.6 5.6-.6-.9-2-2.6-4-2.6h-3.6c-.4 0-.6.3-.5.7.6 1.6 2.3 5.3 5.1 5.3-.7 4 3.8 6.3 5.6 7.1.3.1.7-.1.7-.4 0-.7.1-1.8.4-3.6.3-2.5-.6-3.8-1.6-4.4.6-.2 1.2-.5 1.8-.8.7-.8 1.5-2.1 1.9-3.9 1.2-4.8-1.7-9-6.4-10.4z" fill="#FFF" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1380_" class="st61" d="M20.6 18.3s-3.2 2.1-2.5 6c.4 2.2 1.9 4 3.1 4.7.8.4 1.8 0 1.9-.9.1-.7.4-1.5 1-2.3 1.4-1.8 1.5-6 1.5-6" fill="#00B8F0" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_858_" transform="matrix(5.447540e-02 -0.9985 0.9985 5.447540e-02 -1.3513 26.0797)" class="st78" cx="13.1" cy="13.8" rx="1" ry="1" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_856_" transform="matrix(5.445090e-02 -0.9985 0.9985 5.445090e-02 -2.9484 31.3867)" class="st106" cx="15.1" cy="17.3" rx="1" ry="1" fill="#B8ECFF"/><path id="XMLID_840_" class="st15" d="M23.7 34.4s-.5.9-1.3 1.9" fill="#FFF" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_838_" class="st86" d="M34.6 37.7s1.9-5.5 5.6-8.6c3.8-3.1 6.9-.1 5.6 2.6-1.2 2.6-6.5.2-11.2 6z" fill="#00DFEB"/><path id="XMLID_836_" class="st110" d="M37.2 35.3c.8-1.2 1.8-2.5 3.1-3.5 2.5-2.1 4.7-1.4 5.5 0l.1-.1c1.2-2.7-1.8-5.7-5.6-2.6s-5.6 8.6-5.6 8.6c.8-1.1 1.6-1.8 2.5-2.4z" fill="#4CF4FC"/><path id="XMLID_835_" class="st10" d="M34.6 37.7s1.9-5.5 5.6-8.6c3.8-3.1 6.9-.1 5.6 2.6-1.2 2.6-6.5.2-11.2 6z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_834_" class="st86" d="M16.1 43.8s-2.2-6.6-6.5-8c-3.7-1.2-6.2 2-4 4.5 2.7 3 7.3-.2 10.5 3.5z" fill="#00DFEB"/><path id="XMLID_832_" class="st110" d="M9.6 38.3c1.9.6 3.4 2.3 4.5 3.9.7.3 1.4.7 2 1.5 0 0-2.2-6.6-6.5-8-3.4-1.1-5.7 1.5-4.5 3.8.7-1.1 2.4-1.8 4.5-1.2z" fill="#4CF4FC"/><path id="XMLID_831_" class="st10" d="M16.1 43.8s-2.2-6.6-6.5-8c-3.7-1.2-6.2 2-4 4.5 2.7 3 7.3-.2 10.5 3.5z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_830_" class="st86" d="M34.1 42.8s1.8-3.7 4.5-3.5c2.8.2 2 3.5-.5 3-1.6-.3-4 .5-4 .5z" fill="#00DFEB"/><path id="XMLID_812_" class="st110" d="M38.6 40.7c.8 0 1.3.4 1.5.7.5-.9.1-2.1-1.5-2.2-2.8-.2-4.5 3.5-4.5 3.5s.5-.2 1.2-.3c.8-.9 1.9-1.8 3.3-1.7z" fill="#4CF4FC"/><path id="XMLID_803_" class="st10" d="M34.1 42.8s1.8-3.7 4.5-3.5c2.8.2 2 3.5-.5 3-1.6-.3-4 .5-4 .5z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="dolphin,sea,creature" dc:description="dolphin,sea,creature" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
</div>`;
//#endregion
//#region Elephant
let Elephant = `
<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1969_"><ellipse id="XMLID_990_" class="st5" cx="25.5" cy="44" rx="20.5" ry="1.5" fill="#45413C" opacity="0.15"/><path id="XMLID_989_" class="st44" d="M34 10.3h-5l1.2-5.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v15c0 4.2 3 7.6 7 8.3.8.1 1.5-.5 1.5-1.3v-1c0-.4-.2-.9-.6-1.1-1.6-.9-2.6-2.6-2.6-4.5v-1.7c0-.8.5-1.5 1.2-1.7l5.1-2 .1.4c.4 2.5 1.8 4.7 3.6 6.2.3.3.5.6.5 1v11.2c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3v-8.5c0-.7.6-1.3 1.3-1.3H38v9.8c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3V22c-.1-6.5-5.4-11.7-11.8-11.7z" fill="#C0DCEB"/><g id="XMLID_985_"><path id="XMLID_988_" class="st83" d="M10.6 8H19c2.8-1.7 6.1-2.6 9.4-2.6.7 0 1.2.3 1.5.8l.3-1.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v2.9C2 11.8 5.8 8 10.6 8z" fill="#DAEDF7"/><path id="XMLID_987_" class="st83" d="M34 10.3h-5l-.7 2.9H34c6.5 0 11.7 5.2 11.7 11.7V22c0-6.5-5.3-11.7-11.7-11.7z" fill="#DAEDF7"/></g><path id="XMLID_984_" class="st10" d="M34 10.3h-5l1.2-5.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v15c0 4.2 3 7.6 7 8.3.8.1 1.5-.5 1.5-1.3v-1c0-.4-.2-.9-.6-1.1-1.6-.9-2.6-2.6-2.6-4.5v-1.7c0-.8.5-1.5 1.2-1.7l5.1-2 .1.4c.4 2.5 1.8 4.7 3.6 6.2.3.3.5.6.5 1v11.2c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3v-8.5c0-.7.6-1.3 1.3-1.3H38v9.8c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3V22c-.1-6.5-5.4-11.7-11.8-11.7z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_983_" class="st10" d="M35.9 20.1c-1.2 3.2-.7 6.9 1.4 9.7.4.5.6 1.1.6 1.7v1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_982_" class="st10" d="M14.4 8.3l3-2.2c3.1-2.3 6.9-3.6 10.9-3.6 1.3 0 2.2 1.2 1.9 2.4l-2.5 11.5c-.5 2.2-2.4 3.8-4.7 3.8h-5.1c-1.9 0-3.4-1.5-3.4-3.4" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_981_" class="st20" d="M17.8 20.1h5.1c2.2 0 4.2-1.6 4.7-3.8L29.7 7c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v4.4c0 1.9 1.5 3.5 3.4 3.5z" fill="#FCD"/><path id="XMLID_980_" class="st30" d="M28.3 9.7c.3 0 .6.1.8.2l.6-2.9c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v3.3l3-2.2c3.1-2.3 6.9-3.6 10.9-3.6z" fill="#FFB0CA"/><path id="XMLID_979_" class="st10" d="M17.8 20.1h5.1c2.2 0 4.2-1.6 4.7-3.8L29.7 7c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v4.4c0 1.9 1.5 3.5 3.4 3.5z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_978_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2 20.7h2.6"/><path id="XMLID_977_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2 23.3h2.6"/><path id="XMLID_976_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2 25.9h2"/><path id="XMLID_975_" class="st10" d="M13.5 23.4s3.2-1.2 2.9-3.7" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_974_" transform="matrix(0.2284 -0.9736 0.9736 0.2284 -9.6466 20.1468)" class="st93" cx="7.9" cy="16.2" rx="1.3" ry="1.3" fill="#45413C"/><path id="XMLID_540_" class="st30" d="M13.1 19.6c-.2.5-.9.9-1.6.7-.7-.1-1.1-.7-1-1.2.2-.5.9-.9 1.6-.7.7.2 1.1.7 1 1.2z" fill="#FFB0CA"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="elephant,wild,animal" dc:description="elephant,wild,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
</div>`;
//#endregion
//#region Koala
let Koala = `
<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1958_"><path id="XMLID_2524_" class="st26" d="M17.7 36.9a6.38 6.38 0 0 0-1.5 5.3c1.7.1 3.6-.7 5-2.3 1.4-1.6 1.8-3.6 1.5-5.3-1.8-.1-3.7.7-5 2.3z" fill="#6DD627"/><path id="XMLID_2523_" class="st59" d="M22.6 34.6c-1.7-.1-3.6.7-5 2.3-.3.4-.6.8-.8 1.2.9.9 2.3 1.7 4.2 1.9l.2-.2c1.3-1.6 1.8-3.6 1.4-5.2z" fill="#46B000"/><path id="XMLID_2522_" class="st10" d="M17.7 36.9a6.38 6.38 0 0 0-1.5 5.3c1.7.1 3.6-.7 5-2.3 1.4-1.6 1.8-3.6 1.5-5.3-1.8-.1-3.7.7-5 2.3z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_2521_" class="st76" d="M34.7 3c-4.4.7-6.9 5.3-5.9 9.5s5.2 7.1 9.5 6.1l1.1-2s1.4 2.9 2.4 2c1-.9 1.4-4.8 1.4-4.8s1.4 3.7 2.2 1.7c.8-1.9.4-5.6-.8-7.8C42.5 3.9 39 2.3 34.7 3z" fill="#BDBEC0"/><path id="XMLID_2520_" class="st76" d="M13.3 3c4.4.7 6.9 5.3 5.9 9.5s-5.2 7.1-9.5 6.1l-1.1-2s-1.4 2.9-2.4 2c-1-.9-1.4-4.8-1.4-4.8s-1.4 3.7-2.2 1.7c-.8-1.9-.4-5.6.8-7.8C5.6 3.9 9.1 2.3 13.3 3z" fill="#BDBEC0"/><path id="XMLID_2519_" class="st75" d="M34.7 6.1c4.2-.7 7.7.9 9.9 4.7.6 1 1 2.3 1.1 3.6.4-2-.1-4.9-1.1-6.7C42.5 3.9 39 2.3 34.7 3c-4.2.7-6.8 5.1-6 9.1.7-2.9 2.9-5.5 6-6z" fill="#E0E0E0"/><path id="XMLID_2518_" class="st75" d="M3.4 10.8C5.6 7 9.1 5.4 13.3 6.1c3.2.5 5.4 3.1 6 6 .8-4.1-1.7-8.5-6-9.1-4.2-.7-7.7.9-9.9 4.7-1.1 1.8-1.5 4.7-1.1 6.7.2-1.3.6-2.6 1.1-3.6z" fill="#E0E0E0"/><path id="XMLID_2517_" class="st10" d="M34.7 3c-4.4.7-6.9 5.3-5.9 9.5s5.2 7.1 9.5 6.1l1.1-2s1.4 2.9 2.4 2c1-.9 1.4-4.8 1.4-4.8s1.4 3.7 2.2 1.7c.8-1.9.4-5.6-.8-7.8C42.5 3.9 39 2.3 34.7 3z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_2516_" class="st10" d="M13.3 3c4.4.7 6.9 5.3 5.9 9.5s-5.2 7.1-9.5 6.1l-1.1-2s-1.4 2.9-2.4 2c-1-.9-1.4-4.8-1.4-4.8s-1.4 3.7-2.2 1.7c-.8-1.9-.4-5.6.8-7.8C5.6 3.9 9.1 2.3 13.3 3z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_2515_" class="st5" cx="23.9" cy="43.5" rx="12.8" ry="1.7" fill="#45413C" opacity="0.15"/><path id="XMLID_1120_" class="st76" d="M38.3 20.9V18c0-7.1-6.4-12.9-14.4-12.9C16 5.1 9.5 10.9 9.5 18v2.9c-1.1 1.5-1.8 3.3-1.8 5.2 0 5 4 9.1 9.6 9.1h.3c.8 0 1.6.3 2.3.7 1.1.6 2.4 1 4 1 1.5 0 2.9-.4 4-1 .7-.4 1.5-.7 2.3-.7h.3c5.6 0 9.6-4.1 9.6-9.1 0-1.9-.7-3.7-1.8-5.2z" fill="#BDBEC0"/><path id="XMLID_1119_" class="st75" d="M38.3 20.9V18c0-7.1-6.4-12.9-14.4-12.9C16 5.1 9.5 10.9 9.5 18V21.6c0-7.1 6.4-12.9 14.4-12.9 7.9 0 14.4 5.8 14.4 12.9v-.7z" fill="#E0E0E0"/><path id="XMLID_1118_" class="st10" d="M38.3 20.9V18c0-7.1-6.4-12.9-14.4-12.9C16 5.1 9.5 10.9 9.5 18v2.9c-1.1 1.5-1.8 3.3-1.8 5.2 0 5 4 9.1 9.6 9.1h.3c.8 0 1.6.3 2.3.7 1.1.6 2.4 1 4 1 1.5 0 2.9-.4 4-1 .7-.4 1.5-.7 2.3-.7h.3c5.6 0 9.6-4.1 9.6-9.1 0-1.9-.7-3.7-1.8-5.2z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1117_" class="st77" d="M27.8 27c0 3.4-1.7 4.4-3.9 4.4S20 30.4 20 27c0-3.4 1.7-6.8 3.9-6.8s3.9 3.4 3.9 6.8z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1116_" class="st78" cx="31.7" cy="20.2" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1115_" class="st78" cx="16.1" cy="20.2" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1114_" class="st20" cx="35.8" cy="27.7" rx="2" ry="1" fill="#FCD"/><ellipse id="XMLID_1113_" class="st20" cx="12" cy="27.7" rx="2" ry="1" fill="#FCD"/><path id="XMLID_1112_" class="st10" d="M18.2 35.3s2.2-.1 3.6-.7" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1111_" class="st10" d="M30.5 35.2s-1.6-.1-3.3-.6" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1105_" class="st10" d="M15.1 7.9s-3.6-1.9-6.6.3" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1104_" class="st10" d="M33.1 7.9s3.6-1.9 6.6.3" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="animal" dc:description="animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
</div>`;
//#endregion
//#endregion
// List with correct avatar order in
let avatars = [ Koala, Dolphin, Panda, Elephant ];

// Adding the custom headers to the json
customheaders.append('accept', 'application/json');

// Pre generated HTML code
//#region HTMLCode
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
//#region Avatars
let Avatars = `<div>
<h2>Kies een avatar!</h2>
<div class="o-row">
	<div class="o-container__centered">
		<div class="c-align--middle">
			<div class="o-layout">
				<div class="o-layout__item u-width-full">
					<div class="c-image--xl">
						<?xml version="1.0" encoding="UTF-8"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g class="js-dolphin" id="Icons"><g id="XMLID_1843_"><ellipse id="XMLID_1426_" class="st5" cx="21.8" cy="45.3" rx="11.5" ry="1.5" fill="#45413C" opacity="0.15"/><path id="XMLID_1425_" class="st35" d="M36.7 19c-.5-4.6-3-8.6-6.6-11.2C31.5 3 34 2.5 31.6 1.4c-2.1-.9-6.3 2-8.3 3.6-.3-.1-.6-.1-.9-.1-.6-.1-1.2-.1-1.7-.1C13.4 4.8 8.3 9 7 13.7c-2.8 1.2-6.1 4.5-4.9 6.4C3.2 22 5.9 21.6 9 21.4c2.1 1.2 4 .8 8.6 1.3 6.5.6 7.5 4.2 7.7 6 .2 2.4-.5 4.1-1.6 5.6-.6-.9-2-2.6-4-2.6h-3.6c-.4 0-.6.3-.5.7.6 1.6 2.3 5.3 5.1 5.3-.7 4 3.8 6.3 5.6 7.1.3.1.7-.1.7-.4 0-.7.1-1.8.4-3.6.3-2.5-.6-3.8-1.6-4.4C32.8 34 37.7 27 36.7 19z" fill="#00B8F0"/><path id="XMLID_1424_" class="st36" d="M36.8 19.7c0-.2 0-.5-.1-.7-.5-4.6-3-8.6-6.6-11.2 0 0 .4 2.4 0 4.1 1.8.6 6.1 4.4 6.7 7.8z" fill="#4ACFFF"/><g id="XMLID_1422_"><path id="XMLID_1423_" class="st36" d="M7.8 16.7c1.3-4.8 6.4-9 13.6-9 .6 0 1.2 0 1.7.1.3 0 .6.1.9.1 1.9-1.4 5.5-3.9 7.7-3.7.9-1.6 1.5-2.1-.1-2.8-2.1-.9-6.3 2-8.3 3.6-.3-.1-.6-.1-.9-.1-.6-.1-1.2-.1-1.7-.1C13.4 4.8 8.3 9 7 13.7c-2.8 1.2-6.1 4.5-4.9 6.4.2.3.5.6.8.8.8-1.6 2.9-3.4 4.9-4.2z" fill="#4ACFFF"/></g><path id="XMLID_1421_" class="st10" d="M36.7 19c-.5-4.6-3-8.6-6.6-11.2C31.5 3 34 2.5 31.6 1.4c-2.1-.9-6.3 2-8.3 3.6-.3-.1-.6-.1-.9-.1-.6-.1-1.2-.1-1.7-.1C13.4 4.8 8.3 9 7 13.7c-2.8 1.2-6.1 4.5-4.9 6.4C3.2 22 5.9 21.6 9 21.4c2.1 1.2 4 .8 8.6 1.3 6.5.6 7.5 4.2 7.7 6 .2 2.4-.5 4.1-1.6 5.6-.6-.9-2-2.6-4-2.6h-3.6c-.4 0-.6.3-.5.7.6 1.6 2.3 5.3 5.1 5.3-.7 4 3.8 6.3 5.6 7.1.3.1.7-.1.7-.4 0-.7.1-1.8.4-3.6.3-2.5-.6-3.8-1.6-4.4C32.8 34 37.7 27 36.7 19z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1420_" class="st15" d="M23.1 21.3c-4.7-1.4-10.1 0-13.5-2.5-2.3 1.2-5.8.9-7.7.6 0 .3.1.5.2.8C3.2 22 5.9 21.6 9 21.4c2.1 1.2 4 .8 8.6 1.3 6.5.6 7.5 4.2 7.7 6 .2 2.4-.5 4.1-1.6 5.6-.6-.9-2-2.6-4-2.6h-3.6c-.4 0-.6.3-.5.7.6 1.6 2.3 5.3 5.1 5.3-.7 4 3.8 6.3 5.6 7.1.3.1.7-.1.7-.4 0-.7.1-1.8.4-3.6.3-2.5-.6-3.8-1.6-4.4.6-.2 1.2-.5 1.8-.8.7-.8 1.5-2.1 1.9-3.9 1.2-4.8-1.7-9-6.4-10.4z" fill="#FFF" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1380_" class="st61" d="M20.6 18.3s-3.2 2.1-2.5 6c.4 2.2 1.9 4 3.1 4.7.8.4 1.8 0 1.9-.9.1-.7.4-1.5 1-2.3 1.4-1.8 1.5-6 1.5-6" fill="#00B8F0" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_858_" transform="matrix(5.447540e-02 -0.9985 0.9985 5.447540e-02 -1.3513 26.0797)" class="st78" cx="13.1" cy="13.8" rx="1" ry="1" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_856_" transform="matrix(5.445090e-02 -0.9985 0.9985 5.445090e-02 -2.9484 31.3867)" class="st106" cx="15.1" cy="17.3" rx="1" ry="1" fill="#B8ECFF"/><path id="XMLID_840_" class="st15" d="M23.7 34.4s-.5.9-1.3 1.9" fill="#FFF" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_838_" class="st86" d="M34.6 37.7s1.9-5.5 5.6-8.6c3.8-3.1 6.9-.1 5.6 2.6-1.2 2.6-6.5.2-11.2 6z" fill="#00DFEB"/><path id="XMLID_836_" class="st110" d="M37.2 35.3c.8-1.2 1.8-2.5 3.1-3.5 2.5-2.1 4.7-1.4 5.5 0l.1-.1c1.2-2.7-1.8-5.7-5.6-2.6s-5.6 8.6-5.6 8.6c.8-1.1 1.6-1.8 2.5-2.4z" fill="#4CF4FC"/><path id="XMLID_835_" class="st10" d="M34.6 37.7s1.9-5.5 5.6-8.6c3.8-3.1 6.9-.1 5.6 2.6-1.2 2.6-6.5.2-11.2 6z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_834_" class="st86" d="M16.1 43.8s-2.2-6.6-6.5-8c-3.7-1.2-6.2 2-4 4.5 2.7 3 7.3-.2 10.5 3.5z" fill="#00DFEB"/><path id="XMLID_832_" class="st110" d="M9.6 38.3c1.9.6 3.4 2.3 4.5 3.9.7.3 1.4.7 2 1.5 0 0-2.2-6.6-6.5-8-3.4-1.1-5.7 1.5-4.5 3.8.7-1.1 2.4-1.8 4.5-1.2z" fill="#4CF4FC"/><path id="XMLID_831_" class="st10" d="M16.1 43.8s-2.2-6.6-6.5-8c-3.7-1.2-6.2 2-4 4.5 2.7 3 7.3-.2 10.5 3.5z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_830_" class="st86" d="M34.1 42.8s1.8-3.7 4.5-3.5c2.8.2 2 3.5-.5 3-1.6-.3-4 .5-4 .5z" fill="#00DFEB"/><path id="XMLID_812_" class="st110" d="M38.6 40.7c.8 0 1.3.4 1.5.7.5-.9.1-2.1-1.5-2.2-2.8-.2-4.5 3.5-4.5 3.5s.5-.2 1.2-.3c.8-.9 1.9-1.8 3.3-1.7z" fill="#4CF4FC"/><path id="XMLID_803_" class="st10" d="M34.1 42.8s1.8-3.7 4.5-3.5c2.8.2 2 3.5-.5 3-1.6-.3-4 .5-4 .5z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="dolphin,sea,creature" dc:description="dolphin,sea,creature" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
					</div>
				</div>
			</div>
			<div class="o-layout o-layout--align-center">
				<div class="o-layout__item u-1-of-2">
					<div class="c-image">
						<?xml version="1.0" encoding="UTF-8"?><svg class="c-image__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g class="js-koala" id="Icons"><g id="XMLID_1958_"><path id="XMLID_2524_" class="st26" d="M17.7 36.9a6.38 6.38 0 0 0-1.5 5.3c1.7.1 3.6-.7 5-2.3 1.4-1.6 1.8-3.6 1.5-5.3-1.8-.1-3.7.7-5 2.3z" fill="#6DD627"/><path id="XMLID_2523_" class="st59" d="M22.6 34.6c-1.7-.1-3.6.7-5 2.3-.3.4-.6.8-.8 1.2.9.9 2.3 1.7 4.2 1.9l.2-.2c1.3-1.6 1.8-3.6 1.4-5.2z" fill="#46B000"/><path id="XMLID_2522_" class="st10" d="M17.7 36.9a6.38 6.38 0 0 0-1.5 5.3c1.7.1 3.6-.7 5-2.3 1.4-1.6 1.8-3.6 1.5-5.3-1.8-.1-3.7.7-5 2.3z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_2521_" class="st76" d="M34.7 3c-4.4.7-6.9 5.3-5.9 9.5s5.2 7.1 9.5 6.1l1.1-2s1.4 2.9 2.4 2c1-.9 1.4-4.8 1.4-4.8s1.4 3.7 2.2 1.7c.8-1.9.4-5.6-.8-7.8C42.5 3.9 39 2.3 34.7 3z" fill="#BDBEC0"/><path id="XMLID_2520_" class="st76" d="M13.3 3c4.4.7 6.9 5.3 5.9 9.5s-5.2 7.1-9.5 6.1l-1.1-2s-1.4 2.9-2.4 2c-1-.9-1.4-4.8-1.4-4.8s-1.4 3.7-2.2 1.7c-.8-1.9-.4-5.6.8-7.8C5.6 3.9 9.1 2.3 13.3 3z" fill="#BDBEC0"/><path id="XMLID_2519_" class="st75" d="M34.7 6.1c4.2-.7 7.7.9 9.9 4.7.6 1 1 2.3 1.1 3.6.4-2-.1-4.9-1.1-6.7C42.5 3.9 39 2.3 34.7 3c-4.2.7-6.8 5.1-6 9.1.7-2.9 2.9-5.5 6-6z" fill="#E0E0E0"/><path id="XMLID_2518_" class="st75" d="M3.4 10.8C5.6 7 9.1 5.4 13.3 6.1c3.2.5 5.4 3.1 6 6 .8-4.1-1.7-8.5-6-9.1-4.2-.7-7.7.9-9.9 4.7-1.1 1.8-1.5 4.7-1.1 6.7.2-1.3.6-2.6 1.1-3.6z" fill="#E0E0E0"/><path id="XMLID_2517_" class="st10" d="M34.7 3c-4.4.7-6.9 5.3-5.9 9.5s5.2 7.1 9.5 6.1l1.1-2s1.4 2.9 2.4 2c1-.9 1.4-4.8 1.4-4.8s1.4 3.7 2.2 1.7c.8-1.9.4-5.6-.8-7.8C42.5 3.9 39 2.3 34.7 3z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_2516_" class="st10" d="M13.3 3c4.4.7 6.9 5.3 5.9 9.5s-5.2 7.1-9.5 6.1l-1.1-2s-1.4 2.9-2.4 2c-1-.9-1.4-4.8-1.4-4.8s-1.4 3.7-2.2 1.7c-.8-1.9-.4-5.6.8-7.8C5.6 3.9 9.1 2.3 13.3 3z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_2515_" class="st5" cx="23.9" cy="43.5" rx="12.8" ry="1.7" fill="#45413C" opacity="0.15"/><path id="XMLID_1120_" class="st76" d="M38.3 20.9V18c0-7.1-6.4-12.9-14.4-12.9C16 5.1 9.5 10.9 9.5 18v2.9c-1.1 1.5-1.8 3.3-1.8 5.2 0 5 4 9.1 9.6 9.1h.3c.8 0 1.6.3 2.3.7 1.1.6 2.4 1 4 1 1.5 0 2.9-.4 4-1 .7-.4 1.5-.7 2.3-.7h.3c5.6 0 9.6-4.1 9.6-9.1 0-1.9-.7-3.7-1.8-5.2z" fill="#BDBEC0"/><path id="XMLID_1119_" class="st75" d="M38.3 20.9V18c0-7.1-6.4-12.9-14.4-12.9C16 5.1 9.5 10.9 9.5 18V21.6c0-7.1 6.4-12.9 14.4-12.9 7.9 0 14.4 5.8 14.4 12.9v-.7z" fill="#E0E0E0"/><path id="XMLID_1118_" class="st10" d="M38.3 20.9V18c0-7.1-6.4-12.9-14.4-12.9C16 5.1 9.5 10.9 9.5 18v2.9c-1.1 1.5-1.8 3.3-1.8 5.2 0 5 4 9.1 9.6 9.1h.3c.8 0 1.6.3 2.3.7 1.1.6 2.4 1 4 1 1.5 0 2.9-.4 4-1 .7-.4 1.5-.7 2.3-.7h.3c5.6 0 9.6-4.1 9.6-9.1 0-1.9-.7-3.7-1.8-5.2z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1117_" class="st77" d="M27.8 27c0 3.4-1.7 4.4-3.9 4.4S20 30.4 20 27c0-3.4 1.7-6.8 3.9-6.8s3.9 3.4 3.9 6.8z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1116_" class="st78" cx="31.7" cy="20.2" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1115_" class="st78" cx="16.1" cy="20.2" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1114_" class="st20" cx="35.8" cy="27.7" rx="2" ry="1" fill="#FCD"/><ellipse id="XMLID_1113_" class="st20" cx="12" cy="27.7" rx="2" ry="1" fill="#FCD"/><path id="XMLID_1112_" class="st10" d="M18.2 35.3s2.2-.1 3.6-.7" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1111_" class="st10" d="M30.5 35.2s-1.6-.1-3.3-.6" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1105_" class="st10" d="M15.1 7.9s-3.6-1.9-6.6.3" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1104_" class="st10" d="M33.1 7.9s3.6-1.9 6.6.3" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="animal" dc:description="animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
					</div>
				</div>
				<div class="o-layout__item u-1-of-6">
					<svg class="c-image c-image__selection" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 115 124">
					  <g id="Group_88" data-name="Group 88" transform="translate(-899 -540)">
						<circle id="Ellipse_6" data-name="Ellipse 6" cx="19" cy="19" r="19" transform="translate(899 583)" fill="#9be564"/>
						<circle id="Ellipse_7" data-name="Ellipse 7" cx="19" cy="19" r="19" transform="translate(976 583)" fill="#ff715b"/>
						<ellipse id="Ellipse_8" data-name="Ellipse 8" cx="19.5" cy="19" rx="19.5" ry="19" transform="translate(937 540)" fill="#ffa517"/>
						<ellipse id="Ellipse_9" data-name="Ellipse 9" cx="19.5" cy="19" rx="19.5" ry="19" transform="translate(937 626)" fill="#295bd4"/>
					  </g>
					</svg>
				</div>
				<div class="o-layout__item u-1-of-2">
					<div class="c-image">
						<?xml version="1.0" encoding="UTF-8"?><svg class="c-image__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g class="js-panda" id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
					</div>
				</div>
			</div>
			<div class="o-layout">
				<div class="o-layout__item u-width-full">
					<div class="c-image--xl">
						<?xml version="1.0" encoding="UTF-8"?><svg class="c-image__svg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g class="js-elephant" id="Icons"><g id="XMLID_1969_"><ellipse id="XMLID_990_" class="st5" cx="25.5" cy="44" rx="20.5" ry="1.5" fill="#45413C" opacity="0.15"/><path id="XMLID_989_" class="st44" d="M34 10.3h-5l1.2-5.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v15c0 4.2 3 7.6 7 8.3.8.1 1.5-.5 1.5-1.3v-1c0-.4-.2-.9-.6-1.1-1.6-.9-2.6-2.6-2.6-4.5v-1.7c0-.8.5-1.5 1.2-1.7l5.1-2 .1.4c.4 2.5 1.8 4.7 3.6 6.2.3.3.5.6.5 1v11.2c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3v-8.5c0-.7.6-1.3 1.3-1.3H38v9.8c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3V22c-.1-6.5-5.4-11.7-11.8-11.7z" fill="#C0DCEB"/><g id="XMLID_985_"><path id="XMLID_988_" class="st83" d="M10.6 8H19c2.8-1.7 6.1-2.6 9.4-2.6.7 0 1.2.3 1.5.8l.3-1.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v2.9C2 11.8 5.8 8 10.6 8z" fill="#DAEDF7"/><path id="XMLID_987_" class="st83" d="M34 10.3h-5l-.7 2.9H34c6.5 0 11.7 5.2 11.7 11.7V22c0-6.5-5.3-11.7-11.7-11.7z" fill="#DAEDF7"/></g><path id="XMLID_984_" class="st10" d="M34 10.3h-5l1.2-5.4c.3-1.2-.6-2.4-1.8-2.4-3.3 0-6.6.9-9.4 2.6h-8.4C5.8 5.1 2 8.9 2 13.6v15c0 4.2 3 7.6 7 8.3.8.1 1.5-.5 1.5-1.3v-1c0-.4-.2-.9-.6-1.1-1.6-.9-2.6-2.6-2.6-4.5v-1.7c0-.8.5-1.5 1.2-1.7l5.1-2 .1.4c.4 2.5 1.8 4.7 3.6 6.2.3.3.5.6.5 1v11.2c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3v-8.5c0-.7.6-1.3 1.3-1.3H38v9.8c0 .7.6 1.3 1.3 1.3h5.2c.7 0 1.3-.6 1.3-1.3V22c-.1-6.5-5.4-11.7-11.8-11.7z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_983_" class="st10" d="M35.9 20.1c-1.2 3.2-.7 6.9 1.4 9.7.4.5.6 1.1.6 1.7v1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_982_" class="st10" d="M14.4 8.3l3-2.2c3.1-2.3 6.9-3.6 10.9-3.6 1.3 0 2.2 1.2 1.9 2.4l-2.5 11.5c-.5 2.2-2.4 3.8-4.7 3.8h-5.1c-1.9 0-3.4-1.5-3.4-3.4" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_981_" class="st20" d="M17.8 20.1h5.1c2.2 0 4.2-1.6 4.7-3.8L29.7 7c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v4.4c0 1.9 1.5 3.5 3.4 3.5z" fill="#FCD"/><path id="XMLID_980_" class="st30" d="M28.3 9.7c.3 0 .6.1.8.2l.6-2.9c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v3.3l3-2.2c3.1-2.3 6.9-3.6 10.9-3.6z" fill="#FFB0CA"/><path id="XMLID_979_" class="st10" d="M17.8 20.1h5.1c2.2 0 4.2-1.6 4.7-3.8L29.7 7c-.4-.4-.9-.6-1.4-.6-3.9 0-7.7 1.3-10.9 3.6l-3 2.2v4.4c0 1.9 1.5 3.5 3.4 3.5z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_978_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2 20.7h2.6"/><path id="XMLID_977_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2 23.3h2.6"/><path id="XMLID_976_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M2 25.9h2"/><path id="XMLID_975_" class="st10" d="M13.5 23.4s3.2-1.2 2.9-3.7" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_974_" transform="matrix(0.2284 -0.9736 0.9736 0.2284 -9.6466 20.1468)" class="st93" cx="7.9" cy="16.2" rx="1.3" ry="1.3" fill="#45413C"/><path id="XMLID_540_" class="st30" d="M13.1 19.6c-.2.5-.9.9-1.6.7-.7-.1-1.1-.7-1-1.2.2-.5.9-.9 1.6-.7.7.2 1.1.7 1 1.2z" fill="#FFB0CA"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="elephant,wild,animal" dc:description="elephant,wild,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
					</div>
				</div>
			</div>
			<div class="u-align-text-center">
				<button class="c-button c-button--xl"> Start </button>
			</div>
		</div>
	</div>
</div>
</div>`;
//#endregion
//#region Header
let Header = ` <div class="o-row--xs ">
<div class="o-layout js-headerRow">`;
let Avatar = `
	<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
</div>
<div class="c-svg--sm">
	<svg class="c-svg__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="34" height="31" viewBox="0 0 34 31">
	  <defs>
		<pattern id="pattern" preserveAspectRatio="xMidYMid slice" width="100%" height="100%" viewBox="0 0 512 512">
		  <image width="512" height="512" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAI27AACNuwGddYGAAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAvpQTFRF////11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pK11pKvB15lAAAAP10Uk5TAAECAwQFBgcICQoL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"/>
		</pattern>
	  </defs>
	  <g id="Group_6" data-name="Group 6" transform="translate(-153 -186)">
		<g id="Group_1" data-name="Group 1" transform="translate(153 186)">
		  <rect id="like" width="34" height="31" fill="url(#pattern)"/>
		</g>
	  </g>
	</svg>
</div>
<p class="js-PlayerClass"> Speler 1 </p>
<p class="c-avatar--orange"> 999 </p>
</div>`;
let AvatarScorePage = `
	<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
</div>
<p class="js-PlayerClass"> Speler 1 </p>
</div>`;
let footer = `</div>
</div>`;
//#endregion
//#region Answers
let Answers = `<div class="c-app o-row--xl c-background--white">
<div class="o-container">
	<div class="o-row c-custom-header">
		<h3 class="c-question"> Wat is de hoofstad van Roemenie? </h3>
	</div>
	<div class="o-row">
		<div class="o-layout o-layout--gutter-lg">
		<div class="o-layout__item o-layout-answer__gutter u-1-of-2">
				<div class="o-layout">
					<div class="o-layout__item u-align-middle-svg u-1-of-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="68" height="74" viewBox="0 0 68 74">
						  <g id="Group_92" data-name="Group 92" transform="translate(-1244 -876)">
							<circle id="Ellipse_19" data-name="Ellipse 19" cx="11.5" cy="11.5" r="11.5" transform="translate(1244 902)" fill="#57ab18"/>
							<ellipse id="Ellipse_20" data-name="Ellipse 20" cx="11" cy="11.5" rx="11" ry="11.5" transform="translate(1290 902)" fill="#b7e694"/>
							<circle id="Ellipse_21" data-name="Ellipse 21" cx="11.5" cy="11.5" r="11.5" transform="translate(1267 876)" fill="#b7e694"/>
							<circle id="Ellipse_22" data-name="Ellipse 22" cx="11.5" cy="11.5" r="11.5" transform="translate(1267 927)" fill="#b7e694"/>
						  </g>
						</svg>
					</div>
					<div class="o-layout__item u-1-of-2 u-background-green c-answer">
						Budapest
					</div>
				</div>
			</div>
			<div class="o-layout__item o-layout-answer__gutter u-1-of-2">
				<div class="o-layout">
					<div class="o-layout__item u-align-middle-svg u-1-of-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="68" height="74" viewBox="0 0 68 74">
						  <g id="Group_89" data-name="Group 89" transform="translate(-140 -658)">
							<circle id="Ellipse_6" data-name="Ellipse 6" cx="11.5" cy="11.5" r="11.5" transform="translate(140 684)" fill="rgba(213,167,96,0.62)"/>
							<ellipse id="Ellipse_7" data-name="Ellipse 7" cx="11" cy="11.5" rx="11" ry="11.5" transform="translate(186 684)" fill="rgba(213,167,96,0.62)"/>
							<circle id="Ellipse_8" data-name="Ellipse 8" cx="11.5" cy="11.5" r="11.5" transform="translate(163 658)" fill="#d98809"/>
							<circle id="Ellipse_9" data-name="Ellipse 9" cx="11.5" cy="11.5" r="11.5" transform="translate(163 709)" fill="rgba(213,167,96,0.62)"/>
						  </g>
						</svg>
					</div>
					<div class="o-layout__item u-1-of-2 u-background-yellow c-answer">
						Boekarest
					</div>
				</div>
			</div>
		</div>
		<div class="o-layout o-layout--gutter-lg">
			<div class="o-layout__item o-layout-answer__gutter u-1-of-2">
				<div class="o-layout">
					<div class="o-layout__item u-align-middle-svg u-1-of-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="68" height="74" viewBox="0 0 68 74">
				  			<g id="Group_91" data-name="Group 91" transform="translate(-1244 -658)">
								<circle id="Ellipse_15" data-name="Ellipse 15" cx="11.5" cy="11.5" r="11.5" transform="translate(1244 684)" fill="#ff8e7d"/>
								<ellipse id="Ellipse_16" data-name="Ellipse 16" cx="11" cy="11.5" rx="11" ry="11.5" transform="translate(1290 684)" fill="#d44d39"/>
								<circle id="Ellipse_17" data-name="Ellipse 17" cx="11.5" cy="11.5" r="11.5" transform="translate(1267 658)" fill="#ff8e7d"/>
								<circle id="Ellipse_18" data-name="Ellipse 18" cx="11.5" cy="11.5" r="11.5" transform="translate(1267 709)" fill="#ff8e7d"/>
				 			 </g>
						</svg>
					</div>
					<div class="o-layout__item u-1-of-2 u-background-red c-answer">
						Debrecen
					</div>
				</div>
			</div>
			<div class="o-layout__item o-layout-answer__gutter u-1-of-2">
				<div class="o-layout">
					<div class="o-layout__item u-align-middle-svg u-1-of-4">
						<svg xmlns="http://www.w3.org/2000/svg" width="68" height="74" viewBox="0 0 68 74">
						  <g id="Group_90" data-name="Group 90" transform="translate(-140 -876)">
							<circle id="Ellipse_11" data-name="Ellipse 11" cx="11.5" cy="11.5" r="11.5" transform="translate(140 902)" fill="#86a8fb"/>
							<ellipse id="Ellipse_12" data-name="Ellipse 12" cx="11" cy="11.5" rx="11" ry="11.5" transform="translate(186 902)" fill="#86a8fb"/>
							<circle id="Ellipse_13" data-name="Ellipse 13" cx="11.5" cy="11.5" r="11.5" transform="translate(163 876)" fill="#86a8fb"/>
							<circle id="Ellipse_14" data-name="Ellipse 14" cx="11.5" cy="11.5" r="11.5" transform="translate(163 927)" fill="#295bd4"/>
						  </g>
						</svg>
					</div>
					<div class="o-layout__item u-1-of-2 u-background-blue c-answer">
						Brussel
					</div>
				</div>
			</div>
			
		</div>
	</div>
</div>
</div>`;
let Pulsar = `<h2>Pair je hartritme sensoren!</h2>
<div class="o-row">
	<div class="o-container__centered">
		<div class="c-align--middle js-pulsarItems">
			<div class="o-layout u-align-text-center">
				
			</div>
			<div class="o-layout u-align-text-center">
				<div class="o-layout__item">
					<button class="c-button c-button--xl"> Start </button>
				</div>
			</div>
		</div>
	</div>
</div>`;
let pinPage = `<form class="c-form-field js-animate" onSubmit="return false;">
<div class="c-input__middle">
	<label class="c-label" for="gamePin">Game pin</label>
	<input id="gamePin" class="c-input js-input-pin" type="number" name="gamePin" id="gamePin" min=100000 max=999999 placeholder="000000" />
	<button id="js-submit" class="c-submit" type="button">
		<svg class="c-input__icon" xmlns="http://www.w3.org/2000/svg" width="20.486" height="35.827" viewBox="0 0 20.486 35.827">
		  <g id="Group_84" data-name="Group 84" transform="translate(-1281.077 -521.848)">
			<g id="next" transform="translate(1170.167 523.348)">
			  <path id="Path_55" data-name="Path 55" d="M129.629,15.759,114.143.273a.929.929,0,0,0-1.314,1.314l14.825,14.825L112.829,31.237a.932.932,0,0,0,.654,1.589.906.906,0,0,0,.654-.275l15.485-15.485A.924.924,0,0,0,129.629,15.759Z" fill="#e2887c" stroke="#e2887c" stroke-width="3"/>
			</g>
		  </g>
		</svg>
	</button>
	<svg class="c-input__icon-background" xmlns="http://www.w3.org/2000/svg" width="20.486" height="35.827" viewBox="0 0 20.486 35.827">
	  <g id="Group_84" data-name="Group 84" transform="translate(-1281.077 -521.848)">
		<g id="next" transform="translate(1170.167 523.348)">
		  <path id="Path_55" data-name="Path 55" d="M129.629,15.759,114.143.273a.929.929,0,0,0-1.314,1.314l14.825,14.825L112.829,31.237a.932.932,0,0,0,.654,1.589.906.906,0,0,0,.654-.275l15.485-15.485A.924.924,0,0,0,129.629,15.759Z" fill="#e2887c" stroke="#e2887c" stroke-width="3"/>
		</g>
	  </g>
	</svg>
</div>
</form>`;
let loginPage = `<div>
<div class="c-align--middle">
	<div class="o-layout">
		<div class="o-layout__item u-width-full js-animate">
			<form class="c-form-field">
				<div class="c-input__middle">
					<div class="c-field">
						<label class="c-label c-label--sm" for="username">Gebruikersnaam</label>
						<input id="username" id="username" class="c-input c-input--sm js-input--username" type="text" name="username" placeholder="JohnDoe" />
					</div>
					<div class="c-field">
						<label class="c-label c-label--sm" for="password">Paswoord</label>
						<input id="password" id="password" class="c-input c-input--sm js-input--password" type="password" name="password" />
					</div>
					<div class="c-message__loader js-loading-message">
					</div>
				</div>
			</form>
			<div class=" u-align-text-center">
				<button class="c-button c-button--xl u-mb-md u-tr-clear js-submitLogin"> Login </button>
				<p>Nog geen account?<a class="js-register" >Maak nu een aan</a></p>
			</div>
		</div>
	</div>
</div>
</div>`;
let startPage = `
<div class="o-layout u-align-text-center">
    <div class="o-container o-container--middle">
        <div class="o-layout__item u-center-items u-clear-left u-align-middle-svg u-width-full u-1-of-4-bp2 u-mb-lg">
            <button class="c-button c-button--xl u-tr-clear u-width-xl js-question"> Vragen toevoegen </button>
        </div>
        <div class="o-layout__item u-center-items u-width-full u-1-of-4-bp2 u-clear-right u-align-middle-svg u-mb-lg">
            <button class="c-button c-button--xl u-tr-clear u-width-xl js-game"> Nu spelen </button>
        </div>
    </div>
</div>`;
//#endregion
//#region Sporting
let Sporting = `<div class="c-app o-row--xl u-pb-xl c-background--white">
            <div class="o-container">
                <div class="o-row c-text--dark c-custom-header">
					<h2>Punten</h2>
					
                </div>
                <div class="o-row">
                    <div class="o-layout">
                        <div class="o-layout__item u-1-of-4 c-avatar__text u-align-text-center">
                            <p class="js-PlayerName"></p>
                            <div class="c-avatar c-avatar--score">
                            </div>
                            <h4 class="u-font-size-xl c-total-points"></h4>
							<h5 class="c-text--dark c-points-gained"></h5>
							<div class="js-medal">
							</div>
                        </div>
                        <div class="o-layout__item u-1-of-4 c-avatar__text u-align-text-center">
                            <p class="js-PlayerName" ></p>
                            <div class="c-avatar c-avatar--score">
                            </div>
                            <h4 class="u-font-size-xl c-total-points"></h4>
							<h5 class="c-text--dark c-points-gained"></h5>
							<div class="js-medal">
							</div>
                        </div>
                        <div class="o-layout__item u-1-of-4 c-avatar__text u-align-text-center">
                            <p class="js-PlayerName"></p>
                            <div class="c-avatar c-avatar--score">
                            </div>
                            <h4 class="u-font-size-xl c-total-points"></h4>
							<h5 class="c-text--dark c-points-gained"></h5>
							<div class="js-medal">
							</div>
                        </div>
                        <div class="o-layout__item u-1-of-4 c-avatar__text u-align-text-center">
                            <p class="js-PlayerName"></p>
                            <div class="c-avatar c-avatar--score">
                            </div>
                            <h4 class="u-font-size-xl c-total-points"></h4>
							<h5 class="c-text--dark c-points-gained"></h5>
							<div class="c-avatar--orange c-countdown">
						<p class="js-delay-question u-font-size--lg">0</p>
					</div>
						</div>
                    </div>
                </div>
            </div>
        </div>`;
//#endregion
//#region SportsWinPage
let SportsWinPage = `<div class="c-app o-row--xl c-background--white">
<div class="o-container">
	<div class="o-row c-text--dark c-custom-header">
		<h2>Tijd om te sporten! </h2>
		<p>Probeer je hartslag omhoog te krijgen door te sporten en zo extra tijd te winnen </p>
	</div>
	<div class="o-row">
		<div class="o-layout">
			<div class="o-layout__item u-align-text-center">
				<h3 class="c-Sports-Description"></h3>
				<div class="c-activity">
    				<object id="svg-object" data="" type="image/svg+xml"></object>
					<div class="c-avatar--orange c-countdown">
						<p class="js-delay-question u-font-size--lg">15</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>`;

let medal_gold = `<svg xmlns="http://www.w3.org/2000/svg" width="44.107" height="71.335" viewBox="0 0 44.107 71.335">
<g id="First_place_Medal" data-name="First place Medal" transform="translate(-12590.386 1646)">
	<path id="Path_73" data-name="Path 73" d="M62.313,37.411V28.947H59.3L66.954,6.689h-12.3L50.5,17.837,46.663,6.684H34.347L42,28.947H38.564v8.466a22.053,22.053,0,1,0,23.75,0ZM56.15,8.841h7.788L57.026,28.947H54.314l-2.716-7.9Zm-18.787,0h7.764l6.912,20.11H44.275ZM40.716,31.1H60.161v5.1a21.794,21.794,0,0,0-19.445,0ZM50.44,75.866a19.9,19.9,0,1,1,19.9-19.9A19.924,19.924,0,0,1,50.44,75.866Z" transform="translate(12562 -1652.684)" fill="#cc7d00"/>
	<path id="Path_74" data-name="Path 74" d="M49.921,36.669A16.315,16.315,0,1,0,66.235,52.984,16.333,16.333,0,0,0,49.921,36.669Zm0,30.477A14.162,14.162,0,1,1,64.083,52.984,14.179,14.179,0,0,1,49.921,67.146Z" transform="translate(12562.52 -1649.702)" fill="#cc7d00"/>
	<rect id="Rectangle_70" data-name="Rectangle 70" width="2.153" height="2.065" transform="translate(12609.529 -1628.294) rotate(161.05)" fill="#cc7d00"/>
	<rect id="Rectangle_71" data-name="Rectangle 71" width="7.957" height="2.153" transform="matrix(0.325, 0.946, -0.946, 0.325, 12605.729, -1639.343)" fill="#cc7d00"/>
	<rect id="Rectangle_72" data-name="Rectangle 72" width="2.153" height="7.661" transform="translate(12618.32 -1636.968) rotate(19.627)" fill="#cc7d00"/>
	<rect id="Rectangle_73" data-name="Rectangle 73" width="2.153" height="2.365" transform="translate(12619.578 -1640.487) rotate(19.627)" fill="#cc7d00"/>
	<path id="Path_75" data-name="Path 75" d="M45.011,48.722l1.467,1.532,2.352-2.459V58.928h2.525V44.536h-2.2Z" transform="translate(12563.653 -1648.92)" fill="#cc7d00"/>
</g>
</svg>`;
let medal_silver = `<svg xmlns="http://www.w3.org/2000/svg" width="44.502" height="71.499" viewBox="0 0 44.502 71.499">
<g id="Second_place_Medal" data-name="Second place Medal" transform="translate(-12600 1568.808)">
  <path id="Path_77" data-name="Path 77" d="M45.5,86.123A22.238,22.238,0,0,0,35.408,67.511V58.949H32.577L40.164,36.88h-13l-3.842,10.3-3.541-10.3H6.756l7.586,22.073H11.091v8.564A22.243,22.243,0,1,0,45.5,86.123ZM29.179,39.783H36.1L29.506,58.949h-2.14L24.807,51.5Zm-18.356,0h6.885L24.3,58.949H17.412Zm3.171,22.073c-.548,0,8.281,0,17.585,0H32.5v4.062a22,22,0,0,0-18.511,0V61.852ZM3.9,86.123a19.348,19.348,0,1,1,19.348,19.348A19.37,19.37,0,0,1,3.9,86.123Z" transform="translate(12599 -1605.684)" fill="#798399"/>
  <path id="Path_78" data-name="Path 78" d="M37.959,75.478A16.561,16.561,0,1,0,21.4,92.039,16.579,16.579,0,0,0,37.959,75.478Zm-30.219,0A13.658,13.658,0,1,1,21.4,89.136,13.673,13.673,0,0,1,7.74,75.478Z" transform="translate(12600.853 -1595.039)" fill="#798399"/>
  <path id="Path_79" data-name="Path 79" d="M12.276,77.759v2.114H23.252v-2.34h-6.7c4.045-3.068,6.613-5.568,6.613-8.386,0-3.022-2.545-4.658-5.477-4.658a7.2,7.2,0,0,0-5.613,2.431l1.545,1.728a5.28,5.28,0,0,1,4.09-1.8c1.386,0,2.773.7,2.773,2.3C20.48,71.351,18.162,73.305,12.276,77.759Z" transform="translate(12604.347 -1592.348)" fill="#798399"/>
</g>
</svg>`;
let medal_brons = `<svg xmlns="http://www.w3.org/2000/svg" width="44.502" height="71.498" viewBox="0 0 44.502 71.498">
<g id="Third_place_Medal" data-name="Third place Medal" transform="translate(-12659.992 1613.809)">
  <path id="Path_80" data-name="Path 80" d="M101.4,67.512V58.949H98.151l7.586-22.073H92.713l-3.541,10.3L85.33,36.88h-13l7.587,22.069H77.085V67.51a22.251,22.251,0,1,0,24.317,0Zm-2.9-5.661v4.064a22,22,0,0,0-18.511,0V61.852ZM94.786,39.779h6.885l-6.589,19.17H88.2Zm-18.388,0h6.916L87.686,51.5l-2.559,7.447h-2.14Zm12.844,65.688A19.348,19.348,0,1,1,108.59,86.123,19.37,19.37,0,0,1,89.242,105.471Z" transform="translate(12593 -1650.684)" fill="#cd7f32"/>
  <path id="Path_81" data-name="Path 81" d="M85.9,72.033a3.663,3.663,0,0,0,3.272-3.477c0-2.522-2.182-4.067-5.454-4.067a7.029,7.029,0,0,0-5.545,2.386l1.364,1.659a5.259,5.259,0,0,1,3.932-1.681c1.681,0,3.068.727,3.068,2.114s-1.341,2-3.136,2c-.59,0-1.477,0-1.727-.023v2.408c.227-.023,1.091-.045,1.727-.045,2.182,0,3.364.659,3.364,2.159,0,1.386-1.16,2.318-3.159,2.318a5.61,5.61,0,0,1-4.181-1.84l-1.454,1.749a7.088,7.088,0,0,0,5.726,2.454c3.523,0,5.727-1.84,5.727-4.431A3.843,3.843,0,0,0,85.9,72.033Z" transform="translate(12598.3 -1637.348)" fill="#cd7f32"/>
  <path id="Path_82" data-name="Path 82" d="M87.389,58.917A16.561,16.561,0,1,0,103.95,75.478,16.58,16.58,0,0,0,87.389,58.917Zm0,30.219a13.658,13.658,0,1,1,13.658-13.658A13.673,13.673,0,0,1,87.389,89.136Z" transform="translate(12594.854 -1640.039)" fill="#cd7f32"/>
</g>
</svg>`;
//#endregion SportsWinpage
//#region Register
let Register = `<div class="o-row u-mb-xl">
<div>
	<div class="c-align--middle">
		<div class="o-layout">
			<div class="o-layout__item u-width-full">
				<form class="c-form-field--sm js-animate">
					<div class="c-input__middle u-width-full u-1-of-2-bp2">
						<div class="c-field">
							<label class="c-label c-label--sm"
								for="username">Gebruikersnaam</label>
							<input id="username" class="c-input c-input--sm" type="text"
								name="username" placeholder="JohnDoe" />
						</div>
						<div class="c-field">
							<label class="c-label c-label--sm" for="email">Paswoord</label>
							<input id="password" class="c-input c-input--sm" type="password"
								name="email" />
						</div>
						<div class="c-field js-confirm-password-field">
							<label class="c-label c-label--sm js-confirm-password-label" for="confirm_password">Bevestig paswoord
								<span class="c-label__error-message js-password-error-message">
									Paswoorden zijn niet hetzelfde
								</span>
							</label>
							<input id="confirm_password" class="c-input c-input--sm js-confirm-password-input"
								type="password" name="password" />
						</div>
					</div>
				</form>
				<div class="o-layout o-layout--justify-center o-layout--gutter-lg">
					<div class="o-layout__item u-width-full u-1-of-4-bp3">
						<div class="u-align-text-center">
							<button class=" js-button-back c-button c-button--md u-width-full"> Terug </button>
						</div>
					</div>
					<div class="o-layout__item u-width-full u-1-of-4-bp3">
						<div class="u-align-text-center">
							<button  class="c-button c-button--md js-sign-up-button u-width-full"> Registreer </button>

						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>`;
//#endregion
//#endregion Podium
//#endregion

// Function to add a pulsar device
const addPulsarDevice = function() {
	const sendPolarButton = document.querySelector('.js-sendPolar');
	sendPolarButton.addEventListener('click', sendPulsarDevices);

	for (let i = 0; i < 4; i++) {
		if (tempPulsarList[i] === undefined && this.dataset.player == '-1') {
			tempPulsarList[i] = this.dataset.id;
			this.innerHTML = `Player ${i + 1}`;
			this.dataset.player = i;
			break;
		} else if (tempPulsarList[i] != undefined && i != this.dataset.player) {
		} else {
			tempPulsarList[this.dataset.player] = undefined;
			this.innerHTML = 'Pair';
			this.dataset.player = -1;
			break;
		}
	}
	let returnState = false;
	for (let i = 0; i < 4; i++) {
		if (tempPulsarList[i] != undefined) {
			returnState = true;
		}
	}
	if (returnState) {
		if (sendPolarButton.classList.contains('o-hidden')) {
			sendPolarButton.classList.toggle('o-hidden');
		}
	} else {
		if (!sendPolarButton.classList.contains('o-hidden')) {
			sendPolarButton.classList.toggle('o-hidden');
		}
	}
};

// Function that requests a scan to the back-end, the back-end will return the bluetooth devices in the area
const sendPulsarDevices = function() {
	gameStep = 2;
	let devicesList = [];
	let playerIndex = 0;
	for (let i = 0; i < 4; i++) {
		if (tempPulsarList[i] != undefined) {
			let json = { name: pulsarList[tempPulsarList[i]].name, mac: pulsarList[tempPulsarList[i]].mac, player: i + 1 };
			devicesList.push(json);
			playerIndex++;
		}
	}
	playerCount = playerIndex;

	const jsonPulsar = {
		type: 'scan',
		status: 'devices',
		devices: devicesList
	};
	message = new Paho.Message(JSON.stringify(jsonPulsar));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);

	ReplaceRow.innerHTML = Avatars;
	message = new Paho.Message(JSON.stringify({ type: 'avatar', status: 'start' }));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);
	AvatarButton = document.querySelector('.c-button');
	AvatarButton.style.visibility = 'hidden';
};

// Loading the returned pulsar devices onto the HTML after generating the page
const loadPulsarDevices = function() {
	ReplaceRow.innerHTML = Pulsar;
	let html = '';
	let pulsarDiv = document.querySelector('.js-pulsarItems');
	let index = 0;
	let columnCount = -1;
	for (let pulsar of pulsarList) {
		if (columnCount == -1) {
			html += `<div class="o-layout u-align-text-center">`;
			columnCount++;
		} else if (columnCount == 3) {
			html += `</div><div class="o-layout u-align-text-center">`;
			columnCount = 0;
		} else {
			columnCount++;
		}
		html += `<div class="o-layout__item u-pb-xl u-1-of-4">
		<h3>${pulsar.name}</h3>
		<div class="c-image">
			<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102 102">
			  <g>
				<circle cx="51" cy="51" r="46.5" fill="#fff"/>
				<path d="M64,22A42,42,0,1,1,22,64,42,42,0,0,1,64,22m0-9a51,51,0,1,0,51,51A51,51,0,0,0,64,13Z" transform="translate(-13 -13)" fill="#295bd4"/>
			  </g>
			  <circle cx="50.5" cy="50.5" r="29.5" fill="#295bd4"/>
			  <circle cx="50.5" cy="71.5" r="2.5" fill="#ff0"/>
			  <circle cx="29.5" cy="50.5" r="2.5" fill="#ff0"/>
			  <circle cx="71.5" cy="50.5" r="2.5" fill="#ff0"/>
			  <circle cx="50.5" cy="30.5" r="2.5" fill="#ff0"/>
			</svg>
		</div>
		<button data-id="${index}" data-player="-1" class="c-button c-button--xl js-pulsarButton"> Pair </button>
	</div>`;
		index += 1;
	}
	html += `</div>`;
	html += `<div class="o-layout u-align-text-center js-sendPolar o-hidden">
	<div class="o-layout__item">
		<button class="c-button c-button--xl"> Start </button>
	</div></div>`;
	pulsarDiv.innerHTML = html;
	let pulsarButtons = document.querySelectorAll('.js-pulsarButton');

	for (let button of pulsarButtons) {
		button.addEventListener('click', addPulsarDevice);
	}
};

// Since we are looping the questions, we need to empty some lists every now and again
const resetQuestions = function() {
	playersAnswered = [];
	playersAnswers = [];
	AnswersGotten = [];
	juisteButtons = [];
};
// Function that GETS questions + answers, and shows them!
const ShowQuestionAndAnswers = function() {
	// IF this is the first question of the quiz, we will send a message to the back-end to read the 'resting' heart beat
	resetQuestions();
	for (let i = 0; i < players.length; i++) {
		playersAnswered.push({ player: players[i].player, answered: false });
	}

	// Inserting HTML
	QuestionRow.innerHTML = Answers;

	// If there's no more questions left
	if (QuestionList.length == 0) {
		console.log('_______________________');
		console.log('Er zijn geen vragen meer');
		console.log('________________________');
	} else {
		indexQuestion = Math.floor(Math.random() * QuestionList.length);
		let RandomQuestion = QuestionList[indexQuestion];

		// Selecting question
		let Question = document.querySelector('.c-question');
		Question.innerHTML = RandomQuestion.questionName;

		// Selecting answers
		let AnswerList = document.querySelectorAll('.c-answer');

		for (let i = 0; i < AnswerList.length; i++) {
			AnswerList[i].innerHTML = '';
		}

		// Inserting everything
		for (let i = 0; i < RandomQuestion.questionAnswers.length; i++) {
			AnswerList[i].innerHTML = RandomQuestion.questionAnswers[i].answer;
			if (RandomQuestion.questionAnswers[i].correct == 1) {
				juistAntwoord = RandomQuestion.questionAnswers[i].answer;
				juisteButton = i + 1;
				juisteButtons.push(juisteButton);
				console.log('Het juiste antwoord van de vraag is ' + juistAntwoord);
				console.log('Het juiste antwoord staat op button: ' + (i + 1));
			}
		}
		console.log('De juiste buttons zijn');
		console.log(juisteButtons);

		QuestionList.splice(indexQuestion, 1);
		//Send a message to Raspberry Pi to indicate that the buttons should be read with a specific time per player
		playersTimes = [];
		for (i = 0; i < players.length; i++) {
			playerTime = {};
			playerTime.player = i + 1;
			playerTime.time_left = players[i].time_left;
			playersTimes.push(playerTime);
		}
		message = new Paho.Message(
			JSON.stringify({
				type: 'questions',
				player: playersTimes
			})
		);
		message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
		client.send(message);

		// WIP, have the time tick down over time
		// 4 timers that count down the amount of seconds, these also get saved in the player variables.
		intervalAll = setInterval(function() {
			for (let i = 0; i < players.length; i++) {
				TimeLeft = players[i].time_left;
				let answered = playersAnswered.find(findIfAnswered, players[i].player);
				if (!answered) {
					ScoreList[i].innerHTML = TimeLeft / 1000;
					players[i].time_left = TimeLeft - 1000;
				}
			}
		}, 1000);
	}
};

// Checking if answered
const findIfAnswered = function(dict) {
	if (dict.player == this) {
		if (dict.answered == true) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};
// Function to show the animation screen
const ShowLoadingScreen = function() {
	AnimateRow = document.querySelector('.js-animate');
	AnimateRow.classList.toggle('c-form-field');
	AnimateRow.innerHTML = loader;
};

// Function to GET all questions
const GetQuestions = async function(AllQuestions) {
	let serverEndPoint = `https://project2functions.azurewebsites.net/api/GetQuestions?username=${username}&AllQuestions=${AllQuestions}`;
	const response = await fetch(serverEndPoint, { headers: customheaders });
	const data = await response.json();
	return data;
};

// Connecting to MQTT
const ConnectToMQTT = function() {
	// Go from index page to load page
	// generate a random client id
	let clientID = 'clientID_' + parseInt(Math.random() * 100);
	//create an MQTT instance
	client = new Paho.Client('/mct-mqtt.westeurope.cloudapp.azure.com', 443, clientID);
	// set callback handlers
	client.onConnectionLost = onConnectionLost;
	client.onMessageArrived = onMessageArrived;

	// connect the client
	client.connect({ onSuccess: onConnect, onFailure: onConnectionLost });
};

// called when the client connects
function onConnect() {
	// Once a connection has been made, make a subscription and send a message.
	try {
		clearInterval(interval);
	} catch (error) {}
	// client subscribed op dynamische topic!
	client.subscribe(`/luemniro/PiToJs/${InputFieldValue}`);
	// Kijken of juiste ID is ingegeven!
	initializeCommunication();
}

// Initializing communication, we send a test and the python back-end sends a test back
const initializeCommunication = function() {
	//ReplaceRow.innerHTML = Avatars;
	//ReplaceRow.innerHTML = Header;
	//ShowQuestionAndAnswers();
	message = new Paho.Message(JSON.stringify({ type: 'test_com' }));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);

	showMessage(false, 'Proberen connectie maken met spel...');
	//Shows a error message after 10 seconds
	intervalErrorMessage = setInterval(function() {
		showMessage(true, 'Er kan geen connectie gemaakt worden met de spel! Bent u zeker dat de game pin juist is?');
		clearInterval(intervalErrorMessage);
	}, errorMessageInterval);
};

// called when the client loses its connection
function onConnectionLost(responseObject) {
	//start interval for reconnecting to mqtt server
	interval = setInterval(function() {
		ConnectToMQTT();
	}, 10000);

	if (responseObject.errorCode !== 0) {
		console.log('onConnectionLost:' + responseObject.errorMessage);
	}
}

// Checking if a player has been created
const checkPlayerCreated = function(player) {
	return player.player != this.id;
};

// Tell the back end to stop reading avatars
const stopPlayerInit = function() {
	message = new Paho.Message(JSON.stringify({ type: 'avatar', status: 'end' }));
	message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
	client.send(message);
};

// Pass a 'true' as parameter if the html is meant for the score page, pass a 'false' if html is meant for questionPage
const generateAvatarHtml = function(scorePage) {
	ReplaceRow.innerHTML = Header;
	HeaderRow = document.querySelector('.js-headerRow');
	let html = '';
	players.sort((a, b) => a.player - b.player);
	for (let i = 0; i < players.length; i++) {
		html += `<div class="o-layout__item u-1-of-4 c-avatar__text u-align-text-center">
		<div class="c-avatar" data-id="${players[i].player}">`;
		if (!scorePage) {
			html += Avatar;
		} else {
			html += AvatarScorePage;
		}
	}
	return html;
};

// Function that dynamically generates avatar HTML
const FillInAvatarHtml = function(scorePage) {
	let QuestionAvatarsList = document.querySelectorAll('.c-avatar');

	// Selecting all scores
	ScoreList = document.querySelectorAll('.c-avatar--orange');

	// Selecting all player names
	PlayerName = document.querySelectorAll('.js-PlayerClass');
	console.log(players.length);
	for (let i = 0; i < players.length; i++) {
		//console.log(players);
		let GekozenAvatar = players[i].avatar;
		let GekozenPlayer = players[i].player;
		//console.log('Speler ' + GekozenPlayer + ' heeft gekozen voor avatars ' + GekozenAvatar);

		// Filling in stats in the header such as score and time_left
		//console.log(PlayerName);
		PlayerName[i].innerHTML = 'Speler ' + GekozenPlayer;
		let Avatar = avatars[GekozenAvatar - 1];
		//console.log('tot hier lukt het');
		//console.log('avatar');
		//console.log(Avatar);
		QuestionAvatarsList[i].innerHTML = Avatar;
		//console.log('avatar lukt');
		if (!scorePage) {
			ScoreList[i].innerHTML = players[i].time_left / 1000;
		}
	}
};

// Function to generate the page with quesiton and answers on it
const GenerateQuestionPage = function() {
	gameStep = 3;
	// Tell the back end to stop reading avatars
	stopPlayerInit();

	// Generate the HTML for the question page
	avatarHtml = generateAvatarHtml(false);

	HeaderRow.innerHTML += avatarHtml;
	HeaderRow.innerHTML += footer;

	// For every player, filling in all the info
	FillInAvatarHtml(false);
	// Generating a random question and filling in all the HTML in this function
	ShowQuestionAndAnswers();
};

// A player has answered, the userinfo (the player who has answered) gets sent here, and this function is activated
const playerAnswer = function(userInfo) {
	// Clearing the correct interval
	for (let i = 0; i < players.length; i++) {
		if (userInfo.player == playersAnswered[i].player) {
			playersAnswered[i].answered = true;
		}
	}
	// Seeing who answered, and greying out their avatar
	let QuestionAvatarsList = document.querySelectorAll('.c-avatar');
	for (let i = 0; i < players.length; i++) {
		if (QuestionAvatarsList[i].dataset.id == userInfo.player) {
			QuestionAvatarsList[i].style.opacity = 0.3;
			break;
		}
	}
};

// Generating the page with the SECONDS leaderboard
const GenerateSecondsPage = function() {
	clearInterval(intervalSportsActivityPage);
	QuestionRow.innerHTML = Sporting;
	let Title = document.querySelector('.c-custom-header');
	Title.innerHTML = '<h2>Seconden</h2>';
	let PointsGainedList = document.querySelectorAll('.c-points-gained');
	let NewAvatars = document.querySelectorAll('.c-avatar--score');
	let TotalScores = document.querySelectorAll('.c-total-points');
	let PlayerNames = document.querySelectorAll('.js-PlayerName');
	let medal = document.querySelectorAll('.js-medal');

	Rankings.sort((a, b) => b.SecondsGained - a.SecondsGained);
	for (let i = 0; i < players.length; i++) {
		NewAvatars[i].innerHTML = Rankings[i].Avatar;
		TotalScores[i].innerHTML = players[i].time_left / 1000;
		PointsGainedList[i].innerHTML = '+ ' + Rankings[i].SecondsGained / 1000;
		PlayerNames[i].innerHTML = 'Speler ' + Rankings[i].Player;
		switch (i) {
			case 0: {
				medal[i].innerHTML = medal_gold;
				break;
			}
			case 1: {
				medal[i].innerHTML = medal_silver;
				break;
			}
			case 2: {
				medal[i].innerHTML = medal_brons;
				break;
			}
		}
	}

	let Aftelling = document.querySelector('.js-delay-question');
	Aftelling.innerHTML = 5;
	intervalSportsPage = setInterval(function() {
		Aftelling.innerHTML = Aftelling.innerHTML - 1;
		if (Aftelling.innerHTML == 0) {
			GenerateQuestionPage();
		}
	}, 1000);
};
const generatePodiumPage = function() {
	App = document.querySelector('.c-app');
	App.innerHTML = SportsWinPage;
	let podiumLeaderBoard = [];
	Rankings.sort((a, b) => b.Points - a.Points);
	//#region Podium
	for (let i = 0; i < 3; i++) {
		console.log('ik ziet hier');
		if (Rankings.length > i) {
			let json = { player: Rankings[i].Player, score: Rankings[i].Points };
			console.log(json);
			podiumLeaderBoard.push(json);
		} else {
			podiumLeaderBoard.push({ player: '....', score: '....' });
		}
	}
	//#region podium
	let Podium = `
		<div class="c-app o-row--xl u-pb-xl c-background--white">
		<div class="o-container">
			<div class="o-row c-text--dark c-custom-header">
				<h2>Einde Spel </h2>
			</div>
			<div class="o-row">
				<div class="o-layout o-layout--gutter">
					<div class="o-layout__item u-1-of-3 u-align-text-center c-winner__relative">
						<div class="c-winner c-winner__silver c-winner__absolute">
							<h3>Speler ${podiumLeaderBoard[1].player}</h3>
							<div class="c-avatar c-avatar__silver">
								<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
							</div>
							<h4>${podiumLeaderBoard[1].score} Punten</h4>
						</div>
					</div>
					<div class="o-layout__item u-1-of-3 u-align-text-center">
						<div class="c-winner c-winner__gold ">
							<h3>Winnaar: Speler ${podiumLeaderBoard[0].player}</h3>
							<div class="c-avatar c-avatar__gold">
								<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
							</div>
							<h4>${podiumLeaderBoard[0].score} Punten</h4>
						</div>
					</div>
					<div class="o-layout__item u-1-of-3 u-align-text-center c-winner__relative">
						<div class="c-winner c-winner__bronze c-winner__absolute">
							<h3>Speler ${podiumLeaderBoard[2].player}</h3>
							<div class="c-avatar c-avatar__bronze">
								<?xml version="1.0" encoding="UTF-8"?><svg class="c-avatar__symbol" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 48 48" xml:space="preserve"><style type="text/css">.st0{fill:#FFD4C3;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st1{fill:#FFC258;} .st2{fill:#4F4B45;} .st3{fill:#FABFA5;} .st4{fill:none;stroke:#504B46;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .Graphic_x0020_Style{opacity:0.15;fill:#45413C;} .st5{opacity:0.15;fill:#45413C;} .st6{fill:#DEBB7E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st7{fill:#F0D5A8;} .st8{fill:#F7E5C6;} .st9{fill:#DEBB7E;} .st10{fill:none;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st11{fill:#FFE500;} .st12{fill:#EBCB00;} .st13{fill:none;stroke:#EBCB00;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st14{fill:#FF6242;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st15{fill:#FFFFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st16{fill:#E5F8FF;} .st17{fill:#FFFFFF;} .st18{fill:#E8F4FA;} .st19{fill:#E8F4FA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st20{fill:#FFCCDD;} .st21{fill:#FFB0CA;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st22{fill:#FF87AF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st23{fill:#E5F8FF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st24{fill:#BF8256;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st25{fill:#9CEB60;} .st26{fill:#6DD627;} .st27{fill:#C8FFA1;} .st28{fill:#FFFACF;} .st29{fill:#FF87AF;} .st30{fill:#FFB0CA;} .st31{fill:#FF6196;} .st32{fill:#FFCCDD;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st33{fill:#FF6196;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st34{fill:#FFE5EE;} .st35{fill:#00B8F0;} .st36{fill:#4ACFFF;} .st37{fill:#BF8256;} .st38{fill:#DEA47A;} .st39{fill:#915E3A;} .st40{fill:#FFF5E3;} .st41{fill:#F0F0F0;} .st42{fill:#8CA4B8;} .st43{fill:#627B8C;} .st44{fill:#C0DCEB;} .st45{fill:#FFF48C;} .st46{fill:#FFE500;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st47{fill:#FFAA54;} .st48{fill:#6DD627;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st49{fill:#FF8A14;} .st50{fill:#FFCC99;} .st51{fill:#EBCB00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st52{fill:#00F5BC;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st53{fill:#BF8DF2;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st54{fill:#FF8A14;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st55{fill:#4AEFF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st56{fill:#FFF48C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st57{fill:#FF6242;} .st58{fill:#E04122;} .st59{fill:#46B000;} .st60{fill:none;stroke:#45413C;stroke-miterlimit:10;} .st61{fill:#00B8F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st62{fill:#FF866E;} .st63{fill:#9F5AE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st64{fill:#E4FFD1;} .st65{fill:#FFFEF2;} .st66{fill:#B89558;} .st67{fill:none;stroke:#915E3A;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st68{fill:#915E3A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st69{fill:#BF8DF2;} .st70{fill:#9F5AE5;} .st71{fill:#DABFF5;} .st72{fill:none;stroke:#45413C;stroke-linejoin:round;stroke-miterlimit:10;} .st73{fill:#656769;} .st74{fill:#87898C;} .st75{fill:#E0E0E0;} .st76{fill:#BDBEC0;} .st77{fill:#656769;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st78{fill:#45413C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st79{fill:#FFA694;} .st80{fill:#E04122;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st81{fill:#E0E0E0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st82{fill:#F0F0F0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st83{fill:#DAEDF7;} .st84{fill:#BDBEC0;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st85{fill:#87898C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st86{fill:#00DFEB;} .st87{fill:#4AEFF7;} .st88{fill:#DAEDF7;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st89{fill:#FFDA8F;} .st90{fill:#FFBE3D;} .st91{fill:#FFE9BD;} .st92{fill:#DEA47A;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st93{fill:#45413C;} .st94{fill:#F0C2A1;} .st95{fill:none;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st96{fill:#525252;} .st97{fill:#EB6D00;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st98{fill:#EB6D00;} .st99{fill:#E5FEFF;} .st100{fill:#FF866E;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st101{fill:#627B8C;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st102{fill:#FFFCE5;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st103{fill:#A6FBFF;} .st104{fill:#D9FDFF;} .st105{fill:#FFFACF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st106{fill:#B8ECFF;} .st107{fill:#FFCABF;} .st108{fill:#E5FFF9;} .st109{fill:#C8FFA1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st110{fill:#4CF4FC;} .st111{fill:#F0D5A8;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st112{fill:#FFDCD1;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st113{fill:#80DDFF;} .st114{fill:#46B000;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st115{fill:#4ACFFF;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st116{fill:#ADC4D9;} .st117{fill:#BDBEC0;stroke:#45413C;stroke-width:1.0064;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;} .st118{fill:#FFFCE5;} .st119{fill:#947746;} .st120{fill:#525252;stroke:#45413C;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:10;}</style><symbol id="New_Symbol_14" viewBox="-6.5 -6.5 13 13"><path class="st0" d="M0-6c2.2 0 4.1 1.5 4.7 3.5C6.3-2.5 6.4 0 5 0v1c0 2.8-2.2 5-5 5s-5-2.2-5-5V0c-1.4 0-1.3-2.5.2-2.5C-4.1-4.5-2.2-6 0-6z" fill="#FFD4C3" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle class="st1" cx="-1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M-1.6.5c-.3 0-.6-.3-.6-.6s.2-.7.6-.7c.3 0 .6.3.6.7s-.3.6-.6.6z" fill="#4F4B45"/><circle class="st1" cx="1.6" cy="-0.1" r="0.1" fill="#FFC258"/><path class="st2" d="M1.6.5C1.3.5 1 .2 1-.1s.3-.6.6-.6.6.3.6.6-.2.6-.6.6z" fill="#4F4B45"/><circle class="st3" cx="-3" cy="-1.5" r="0.5" fill="#FABFA5"/><circle class="st3" cx="3" cy="-1.5" r="0.5" fill="#FABFA5"/><path class="st4" d="M-1.2-3c.8-.5 1.7-.5 2.5 0" fill="none" stroke="#504B46" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/></symbol><g id="Icons"><g id="XMLID_1315_"><ellipse id="XMLID_1328_" class="st5" cx="24" cy="45" rx="15.5" ry="1.7" fill="#45413C" opacity="0.15"/><ellipse id="XMLID_1298_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st73" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="#656769"/><path id="XMLID_1297_" class="st74" d="M27.9 7.9c3.2-4.5 9-5.8 13-3 2 1.4 3.1 3.6 3.4 5.9.3-3.2-.8-6.3-3.4-8.2-4-2.8-9.8-1.5-13 3-1.6 2.3-2.3 4.9-2 7.3.2-1.6.8-3.4 2-5z" fill="#87898C"/><ellipse id="XMLID_1296_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8823 33.0741)" class="st10" cx="35.1" cy="10.8" rx="10" ry="8.9" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1295_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st75" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="#E0E0E0"/><ellipse id="XMLID_1294_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st73" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="#656769"/><path id="XMLID_1293_" class="st74" d="M7.3 4.9c4-2.8 9.8-1.5 13 3 1.1 1.6 1.8 3.4 2 5.1.3-2.4-.4-5.1-2-7.3-3.2-4.5-9-5.8-13-3-2.6 1.8-3.7 5-3.4 8.2.2-2.4 1.4-4.6 3.4-6z" fill="#87898C"/><ellipse id="XMLID_1292_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8553 9.6136)" class="st10" cx="13.1" cy="10.8" rx="8.9" ry="10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1291_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st75" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="#E0E0E0"/><path id="XMLID_1290_" class="st76" d="M30 9.8c2.2-3.1 6.2-4 8.9-2 1.2.9 1.9 2.2 2.2 3.6.4-2.4-.3-4.7-2.2-6.1-2.7-1.9-6.7-1-8.9 2-1.2 1.7-1.6 3.7-1.3 5.5.2-1 .6-2.1 1.3-3z" fill="#BDBEC0"/><path id="XMLID_1289_" class="st76" d="M9.3 7.8c2.7-1.9 6.7-1 8.9 2 .7.9 1.1 2 1.3 3 .3-1.8 0-3.8-1.3-5.5-2.2-3.1-6.2-4-8.9-2C7.4 6.6 6.6 9 7 11.4c.3-1.5 1-2.8 2.3-3.6z" fill="#BDBEC0"/><ellipse id="XMLID_1277_" transform="matrix(0.5813 -0.8137 0.8137 0.5813 5.8203 32.9535)" class="st10" cx="34.9" cy="10.8" rx="6.8" ry="6.1" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><ellipse id="XMLID_1263_" transform="matrix(0.8137 -0.5813 0.5813 0.8137 -3.8277 9.6997)" class="st10" cx="13.2" cy="10.8" rx="6.1" ry="6.8" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1262_" class="st41" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="#F0F0F0"/><path id="XMLID_1261_" class="st17" d="M3.2 29.6C5 18.2 13.8 9.9 24 9.9c10.2 0 19 8.3 20.8 19.7.2-1.4.2-2.9 0-4.4C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-.2 1.5-.2 3 0 4.4z" fill="#FFF"/><path id="XMLID_1260_" class="st10" d="M44.8 25.2C43 13.8 34.2 5.5 24 5.5c-10.2 0-19 8.3-20.8 19.7-1.2 7.8 4.1 15 11.1 15H16c1.9 1.6 4.7 2.7 7.9 2.7s6-1 7.9-2.7h2c6.9 0 12.2-7.2 11-15z" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1259_" class="st77" d="M27.9 32.5c0 1.1-1.7 3-3.9 3s-3.9-1.8-3.9-3c0-1.1 1.7-2 3.9-2s3.9.8 3.9 2z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1258_" class="st77" d="M28.1 20.1c-.9 5.1 3.1 7.7 6.1 8.8 3.1 1.2 4.8-1 4.8-4.1-.1-3.1-2-7.3-5.4-8.2-3-.7-5.3 2-5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><path id="XMLID_1257_" class="st77" d="M19.8 20.1c.9 5.1-3.1 7.7-6.1 8.8-3.1 1.2-4.8-1-4.8-4.1.1-3.1 2-7.3 5.4-8.2 3-.7 5.2 2 5.5 3.5z" fill="#656769" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1256_" class="st78" cx="31.8" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1255_" class="st78" cx="16.2" cy="22.1" r="1.7" fill="#45413C" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10"/><circle id="XMLID_1254_" class="st79" cx="41.4" cy="29.7" r="2" fill="#FFA694"/><circle id="XMLID_1252_" class="st79" cx="6.6" cy="29.7" r="2" fill="#FFA694"/><path id="XMLID_1251_" class="st10" fill="none" stroke="#45413C" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M24 35.4v2.2"/></g></g><metadata><rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:rdfs="http://www.w3.org/2000/01/rdf-schema#" xmlns:dc="http://purl.org/dc/elements/1.1/"><rdf:Description about="https://iconscout.com/legal#licenses" dc:title="panda,animal" dc:description="panda,animal" dc:publisher="Iconscout" dc:date="2017-09-21" dc:format="image/svg+xml" dc:language="en"><dc:creator><rdf:Bag><rdf:li>Vincent Le Moign</rdf:li></rdf:Bag></dc:creator></rdf:Description></rdf:RDF></metadata></svg>
							</div>
							<h4>${podiumLeaderBoard[2].score} Punten</h4>
						</div>
					</div>
				</div>
			</div>
		</div>
		</div>
					`;
	//#endpodium
	//#endregion
	App.innerHTML = Podium;

	let AvatarW = document.querySelector('.c-avatar__gold');
	let AvatarS = document.querySelector('.c-avatar__silver');
	let AvatarB = document.querySelector('.c-avatar__bronze');
	AvatarW.innerHTML = Rankings[0].Avatar;
	AvatarS.innerHTML = Rankings[1].Avatar;
	AvatarB.innerHTML = Rankings[2].Avatar;
};
// Function that generates the PODIUM onto the HTML
const GenerateSportsPage = function() {
	if (QuestionList.length == 0) {
		generatePodiumPage();
	} else {
		RandomImage = Math.floor(Math.random() * (4 - 1) + 1);
		App = document.querySelector('.c-app');
		App.innerHTML = SportsWinPage;
		let Description = document.querySelector('.c-Sports-Description');
		Description.innerHTML = SportsDescriptions[RandomImage - 1];
		let imagesvg = document.getElementById('svg-object');
		imagesvg.data = `./img/sports/sports_${RandomImage}.svg`;
		clearInterval(intervalSportsPage);
		GoddelijkeTimer = document.querySelector('.js-delay-question');
		intervalSportsActivityPage = setInterval(function() {
			GoddelijkeTimer.innerHTML = GoddelijkeTimer.innerHTML - 1;
			if (GoddelijkeTimer.innerHTML == 5) {
				message = new Paho.Message(JSON.stringify({ type: 'bpm' }));
				message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
				client.send(message);
			}
			if (GoddelijkeTimer.innerHTML == 0) {
				// Create leaderboard for question here
				//functie uitvoeren voor vragen opnieuw te tonen
				GenerateSecondsPage();
			}
		}, 1000);
	}
};
// Get the index from the biggest number
const arrayMaxIndex = function(array) {
	highest = array[0];
	for (i = 0; i < array.length; i++) {
		if (highest.bpm < array[i].bpm) {
			highest = array[i];
		}
	}
	return highest.player_id;
};
// called when a message arrives
function onMessageArrived(message) {
	// Receiving message
	// Read it as a JSOn
	let jsonMessage = JSON.parse(message.payloadString);
	switch (jsonMessage.type) {
		// Switch case checks which Type is present in the Json message, this depends on the python back-end
		// Depending on the type in the JSON, we send something specific back
		case 'test_com':
			// We now have connection, now we can send the message for the next step, scanning the available bluetooth devices
			// Getting the 4 generated avatars from the Avatar HTML

			// Communication is made
			if (gameStep == 0) {
				Communication = true;
				gameStep++;
				message = new Paho.Message(JSON.stringify({ type: 'scan', status: 'start' }));
				message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
				client.send(message);
				// Here we are showing a messsega that the scan has started
				showMessage(false, 'Spel succesvol geconnecteerd! Zoeken naar hartslagsensoren...');
				clearInterval(intervalErrorMessage);
			}

			break;
		case 'scan':
			if (gameStep == 1) {
				gameStep = -1;
				// When we receive a list of devices in the area, add them to a list
				if (jsonMessage.status == 'devices') {
				} else {
					ReplaceRow.innerHTML = Pulsar;
					for (let i of jsonMessage.devices) {
						pulsarList.push(i);
					}
					// Items in global list will get shown on screen
					loadPulsarDevices();
				}
			}
			break;

		case 'avatar':
			console.log(gameStep);
			if (gameStep == 2) {
				// Selecting the button and making it hidden
				AvatarButton = document.querySelector('.c-button');
				AvatarButton.addEventListener('click', GenerateQuestionPage);

				// Receiving which avatars are being chosen
				// Also creating objects of players, with their own stats ie: Time_left, points
				if (!selectedAvatars.includes(jsonMessage.button) && players.every(checkPlayerCreated, { id: jsonMessage.player })) {
					players.push({ player: jsonMessage.player, avatar: jsonMessage.button, points: 0, time_left: 20000 });
					Rankings.push({ Points: 0, PointsGained: 0, Player: jsonMessage.player, Avatar: '', Seconds: '20000', SecondsGained: '0', time_needed: '0' });
					selectedAvatars.push(jsonMessage.button);
					message = new Paho.Message(JSON.stringify({ type: 'avatar', status: 'stop', player: jsonMessage.player }));
					message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
					client.send(message);

					// If there are more than 0 avatars chosen
					if (players.length != 0) {
						AvatarButton.style.visibility = 'visible';
					}

					// If all 4 avatars have been chosen
					if (players.length == playerCount) {
						QuestionAvatarsList = document.querySelectorAll('.c-avatar');
						ScoreList = document.querySelectorAll('.c-avatar--orange');
						GenerateQuestionPage();
						for (let i = 0; i < players.length; i++) {
							console.log(players);
							Rankings[i].Avatar = avatars[players[i].avatar - 1];
						}
						break;
					}

					// If an avatar is chosen, it gets a lower opacity, as to show that it's chosen
					let LijstIcons = [ 'Koala', 'Dolphin', 'Panda', 'Elephant' ];
					switch (LijstIcons[jsonMessage.button - 1]) {
						case 'Koala':
							icon = document.querySelector('.js-koala');
							icon.style.opacity = 0.3;
							break;
						case 'Dolphin':
							icon = document.querySelector('.js-dolphin');
							icon.style.opacity = 0.3;
							break;
						case 'Panda':
							icon = document.querySelector('.js-panda');
							icon.style.opacity = 0.3;
							break;
						case 'Elephant':
							icon = document.querySelector('.js-elephant');
							icon.style.opacity = 0.3;
							break;
					}
				}
				break;
			}

		case 'questions':
			console.log(jsonMessage);
			console.log(jsonMessage.type);
			//This code saves the received button and time needed into a object en adds the object to an array
			if (gameStep == 3 && jsonMessage.type === 'questions') {
				console.log('ik zit toch goed');
				SubmitAnswer({ player: jsonMessage.player, button: jsonMessage.button, time_needed: jsonMessage.time_needed });
				if (gameOver) {
					QuestionRow.innerHTML = Sporting;
					calcScore();
					refreshAvatars(true);
					generatePodiumPage();
				}

				//If the length of playerAnswers equals the length of players, we know that we received all answers
				if (AnswersGotten.length == players.length) {
					gameStep++;
					clearInterval(intervalAll);
					console.log('Alle antwoorden zijn ingegeven');
					QuestionRow.innerHTML = Sporting;
					let PointsGainedList = document.querySelectorAll('.c-points-gained');
					calcScore();
					refreshAvatars(true);
					let NewAvatars = document.querySelectorAll('.c-avatar--score');
					let TotalScores = document.querySelectorAll('.c-total-points');
					let PlayerNames = document.querySelectorAll('.js-PlayerName');
					let medal = document.querySelectorAll('.js-medal');
					Rankings.sort((a, b) => b.PointsGained - a.PointsGained);
					console.log('_______________');
					console.log(Rankings);
					console.log('_______________');

					for (let i = 0; i < players.length; i++) {
						NewAvatars[i].innerHTML = Rankings[i].Avatar;
						TotalScores[i].innerHTML = Rankings[i].Points;
						PointsGainedList[i].innerHTML = '+ ' + Rankings[i].PointsGained;
						PlayerNames[i].innerHTML = 'Speler ' + Rankings[i].Player;
						switch (i) {
							case 0: {
								medal[i].innerHTML = medal_gold;
								break;
							}
							case 1: {
								medal[i].innerHTML = medal_silver;
								break;
							}
							case 2: {
								medal[i].innerHTML = medal_brons;
								break;
							}
						}
					}

					// We send a bpm BEFORE the first sporting page, so we can measure the RESTING BPM.
					if (IsFirstQuestion == true) {
						message = new Paho.Message(
							JSON.stringify({
								type: 'bpm'
							})
						);

						// Setting bool on false, so this only gets executed once.
						IsFirstQuestion = false;
						message.destinationName = `/luemniro/JsToPi/${InputFieldValue}`;
						client.send(message);
					}

					// The countdown timer for all players.
					let Aftelling = document.querySelector('.js-delay-question');
					Aftelling.innerHTML = 5;
					intervalSportsPage = setInterval(function() {
						Aftelling.innerHTML = Aftelling.innerHTML - 1;
						if (Aftelling.innerHTML == 0) {
							GenerateSportsPage();
						}
					}, 1000);
				}

				break;
			}

		case 'bpm':
			// If the RestBpmCount equals to the players list length, we know that the heartbeats are the current heartbeats
			if (RestBpmCount == players.length) {
				playersBpmCount++;
				switch (jsonMessage.player) {
					case 1:
						player1_bpm = jsonMessage.heartbeat;
						break;
					case 2:
						player2_bpm = jsonMessage.heartbeat;
						break;
					case 3:
						player3_bpm = jsonMessage.heartbeat;
						break;
					case 4:
						player4_bpm = jsonMessage.heartbeat;
						break;
				}
				// This if-structure checks if the heartbeat of the last player is received, if so, the player with the highest difference between current heartbeat and rest heartbeat will receive the most seconds
				if (playersBpmCount == players.length) {
					gameStep++;
					playersBpmCount = 0;
					let timeToGive = [ 5000, 4000, 2000, 0 ];
					let lijst = [];
					for (let i = 1; i < players.length + 1; i++) {
						playerBpm = {};
						switch (i) {
							case 1:
								let player1Diff = player1_bpm - player1_rest_bpm;
								playerBpm.player_id = 1;
								playerBpm.bpm = player1Diff;
								lijst.push(playerBpm);
								break;
							case 2:
								let player2Diff = player2_bpm - player2_rest_bpm;
								playerBpm.player_id = 2;
								playerBpm.bpm = player2Diff;
								lijst.push(playerBpm);
								break;
							case 3:
								let player3Diff = player3_bpm - player3_rest_bpm;
								playerBpm.player_id = 3;
								playerBpm.bpm = player3Diff;
								lijst.push(playerBpm);
								break;
							case 4:
								let player4Diff = player4_bpm - player4_rest_bpm;
								playerBpm.player_id = 4;
								playerBpm.bpm = player4Diff;
								lijst.push(playerBpm);
								break;
						}
					}
					let lengthBegin = lijst.length;
					for (let i = 0; i < lengthBegin; i++) {
						// Checking which index is the highest number, and take the player with the highest heartbeat
						// Ads the time of the player to the current time
						for (let j = 0; j < lengthBegin; j++) {
							if (players[j].player == arrayMaxIndex(lijst)) {
								players[j].time_left += timeToGive[i];
								Rankings[i].Seconds += timeToGive[i];
								Rankings[j].SecondsGained = timeToGive[j];
								Rankings[j].Seconds = players[j].time_left;
								break;
							}
						}
						// Delete highest number out of the list
						highest = lijst[0];
						array = lijst;
						for (let k = 0; k < array.length; k++) {
							if (highest.bpm < array[k].bpm) {
								highest = array[k];
							}
						}
						lijst.splice(lijst.indexOf(highest), 1);
					}
				}
			} else {
				// If the RestBpmCount does not equal to players list length, we know we asked for the rest heartbeats
				switch (jsonMessage.player) {
					case 1:
						player1_rest_bpm = jsonMessage.heartbeat;
						break;
					case 2:
						player2_rest_bpm = jsonMessage.heartbeat;
						break;
					case 3:
						player3_rest_bpm = jsonMessage.heartbeat;
						break;
					case 4:
						player4_rest_bpm = jsonMessage.heartbeat;
						break;
				}
				RestBpmCount++;
			}
			break;
		default:
			break;
	}
}
const calcScore = function() {
	Rankings.sort((a, b) => a.Player - b.Player);
	AnswersGotten.sort((a, b) => a.player - b.player);
	for (let i = 0; i < players.length; i++) {
		Rankings[i].PointsGained = '0';
		console.log('speler' + AnswersGotten[i].player + ' heeft gedrukt op knop ' + AnswersGotten[i].button);
		// If someone presses the CORRECT button, we will calculate how long it took them, and give them a score based on that
		if (juisteButtons.includes(AnswersGotten[i].button)) {
			console.log('het juiste antwoord is ingegeven');
			console.log('____________________');
			console.log(AnswersGotten);
			console.log(players);
			console.log(Rankings);
			console.log('____________________');

			//let tijd_nodig = Math.floor(AnswersGotten[i].time_needed / 1000);
			let FinalBerekening = 20 - Math.floor(AnswersGotten[i].time_needed / 1000);
			Rankings[i].time_needed = Answers[i].time_needed;

			//let tijd_over = players[i].time_left / 1000;
			// let tijd_over = Rankings[i].Seconds / 1000;
			// console.log(tijd_nodig);
			// console.log(tijd_over);
			// let Berekening = tijd_nodig / tijd_over;
			// let Berekening2 = Berekening / 2;
			// let Berekening3 = 1 - Berekening2;
			// let Berekening4 = Berekening3 * 20;
			// let Berekening5 = Berekening4 - 10;
			//let FinalBerekening = Math.round(Berekening4);
			Rankings[i].time_needed = Answers[i].time_needed;
			players[i].points += FinalBerekening;
			Rankings[i].PointsGained = FinalBerekening;
			Rankings[i].Points += FinalBerekening;
		}
	}
};
const refreshAvatars = function(scorePage) {
	avatarHtml = generateAvatarHtml(scorePage);
	HeaderRow.innerHTML += avatarHtml;
	HeaderRow.innerHTML += footer;
	FillInAvatarHtml(scorePage);
};
const removePlayer = function(playerId) {
	try {
		let QuestionAvatarsList = document.querySelectorAll('.c-avatar');
		for (let i = 0; i < players.length; i++) {
			if (QuestionAvatarsList[i].dataset.id == playerId) {
				QuestionAvatarsList[i].style.opacity = 0.3;
				break;
			}
		}
		players.splice(
			players.findIndex(function(item) {
				return item.player == playerId;
			}),
			1
		);
		Rankings.splice(
			Rankings.findIndex(function(rank) {
				return rank.Player == playerId;
			}),
			1
		);
	} catch (error) {
		console.log('user does not exist');
	}
};
const SubmitAnswer = function(answer) {
	if (!playersAnswers.includes(answer.player)) {
		switch (answer.button) {
			case 0:
				removePlayer(answer.player);
				if (players.length < 2) {
					gameOver = true;
				}
				break;

			default:
				playersAnswers.push(answer.player);
				AnswersGotten.push(answer);
				playerAnswer(answer);
				break;
		}
	}

	console.log('___________________________');
	console.log('er zijn ' + AnswersGotten.length + ' antwoorden ingedient');
	console.log('er zijn ' + players.length + ' spelers in het spel');
	console.log('antwoorden ontvangen : ' + AnswersGotten.length);
	console.log('___________________________');
};
const CheckPlayerAnswered = function(item) {
	if (item == this) {
		return true;
	} else {
		return false;
	}
};

// Show a message in a specific part of the HTML
const showMessage = function(isError, message) {
	messageBox = document.querySelector('.js-loading-message');
	messageBox.innerHTML = message;
	if (isError) {
		messageBox.classList.add('c-message__loader-error');
	}
};

const Buttonchecked = function() {
	// Change page here, go from load page to avatar selection page
	// waarde van input box ophalen
	InputFieldValue = document.querySelector('#gamePin').value;
	ShowLoadingScreen();
	showMessage(false, 'Proberen connectie maken met spel...');
	ConnectToMQTT();
};

// This is the function where we get the username and password values, and do a GET request to our user database
const loginRequest = async function() {
	username = document.querySelector('#username').value;
	const password = document.querySelector('#password').value;
	AnimateRow.innerHTML = loader;
	showMessage(false, 'Proberen inloggen...');
	let serverEndPoint = `https://project2functions.azurewebsites.net/api/GetUser?username=${username}&password=${password}`;
	const response = await fetch(serverEndPoint, { headers: customheaders, mode: 'cors' });
	const data = await response.json();
	return data;
};

// The actual LOGIN function
// If we get a 400 response, this means the user has NOT logged in succesfully
const loadLoggedInPage = function() {
	ReplaceRow.innerHTML = startPage;
	let questions = document.querySelector('.js-questions');
	questions.innerHTML = '';
	const game = document.querySelector('.js-game');
	const question = document.querySelector('.js-question');
	game.addEventListener('click', Page);
	question.addEventListener('click', function() {
		loadAdminPage();
	});
};
const login = function() {
	loginRequest().then((x) => {
		if (x == 400) {
			console.log('wrong credentials');
			ReplaceRow.innerHTML = loginPage;
			showMessage(true, 'Verkeerde username of paswoord!');
			let loginSubmit = document.querySelector('.js-submitLogin');
			let loginUsername = document.querySelector('.js-input--username');
			let loginPassword = document.querySelector('.js-input--password');
			loginUsername.addEventListener('keyup', autoEnter);
			loginPassword.addEventListener('keyup', autoEnter);
			loginSubmit.addEventListener('click', login);
		} else {
			GetQuestions(false).then((x) => {
				QuestionList = x;
			});
			userGuid = x.userGuid;
			loadLoggedInPage();
		}
	});
};

// Creating the pin page
const Page = function() {
	ReplaceRow.innerHTML = pinPage;
	SubmitButton = document.querySelector('#js-submit');
	let pinInput = document.querySelector('.js-input-pin');
	SubmitButton.addEventListener('click', Buttonchecked);
	pinInput.addEventListener('keyup', autoEnterPin);
	myAudio = new Audio('./assets/rustdrum.mp3');
	myAudio.loop = true;
	myAudio.play();
};

// If you press the enter button, this will also get submitted, mainly for UX purposes
const autoEnterPin = function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		let enter = document.querySelector('#js-submit');
		enter.click();
	}
};

// Pressing enter will also submit the login
const autoEnter = function(event) {
	if (event.keyCode === 13) {
		event.preventDefault();
		let loginSubmit = document.querySelector('.js-submitLogin').click();
	}
};

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

	if (username != null && username != '' && password != null && password != '' && confirmPassword != null && confirmPassword != '') {
		if (password == confirmPassword) {
			errorMessage.style.display = 'none';
			AddUser();
		} else {
			errorMessage.style.display = 'block';
		}
	} else {
		errorMessage.style.display = 'block';
		errorMessage.innerHTML = 'Vul alle velden in';
	}
};

const returnToLogin = function() {
	console.log('clicked');
	loadLoginPage();
};

const generateRegisterPage = function() {
	//window.location.href = 'register.html';
	ReplaceRow.innerHTML = Register;
	let BackButton = document.querySelector('.js-button-back');
	let SignUpButton = document.querySelector('.js-sign-up-button');
	BackButton.addEventListener('click', returnToLogin);
	SignUpButton.addEventListener('click', SignUpFunction);
};

// Loading the login page
const loadLoginPage = function() {
	ReplaceRow.innerHTML = loginPage;

	// Need to use this one later
	let registerSubmit = document.querySelector('.js-register');
	let loginSubmit = document.querySelector('.js-submitLogin');
	let loginUsername = document.querySelector('.js-input--username');
	let loginPassword = document.querySelector('.js-input--password');
	registerSubmit.addEventListener('click', generateRegisterPage);
	loginSubmit.addEventListener('click', login);
	loginUsername.addEventListener('keyup', autoEnter);
	loginPassword.addEventListener('keyup', autoEnter);
};

// Init function for loading DOM and loading first page
const init = function() {
	ReplaceRow = document.querySelector('.js-row');
	QuestionRow = document.querySelector('.c-app');
	loadLoginPage();
	AnimateRow = document.querySelector('.js-animate');
};

document.addEventListener('DOMContentLoaded', init);
