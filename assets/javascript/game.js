/*Pseudocode*/

//User will press keys to match the random word. So random word's each letter's position will be matched with every keypress by the user. Something like randomWord[i] = userKey

//Display the user input letters

//When the two words fully match, reveal the hidden random word

//And play a random song when the user wins or loses.

//Ignore if the user presses the same key twice with a warning

//Have a counter for number of wins, number of losses, guesses left

//Once the user wins or number of guesses are over, reset all stats

//Having an array to store different words
var word = [ 'mars', 'cat', 'india' ];
//"lonely", "whisper", "billie", "world", "people", "america", "strawberry", "south", "raleigh"

var winCounter = 0;
var wins = document.getElementById('wins');

var lossCounter = 0;
var losses = document.getElementById('losses');

var guessedLetters = document.getElementById('guessed-letter');
guessedLetters = [];

var remainingGuess = document.getElementById('remaining-guess');
remainingGuess = 7;

//Assigning variable currentWord for the span id current-word from HTML
var currentWord = document.getElementById('current-word');

//Word will be selected from the array randomly upon refreshing the browser
var randomWord = word[Math.floor(Math.random() * word.length)];

//currentWord will display the randomly selected word going through the function hideWord to get replaced by asterisks
var starredWord = hideWord(randomWord);
currentWord.textContent = starredWord;

var audio = new Audio('https://www.pacdv.com/sounds/applause-sounds/app-5.mp3');
audio.play();

var sad = new Audio('https://www.pacdv.com/sounds/people_sound_effects/laugh_1.wav');
sad.play();

//Displaying the randomWord in asterisks (****) using the function hideWord
function hideWord(word) {
	var chars = ''; //"" means empty string
	for (var i = 0; i < word.length; i++) {
		chars += '*';
	}
	return chars;
}

//let the user use the keyboard to generate letters to match the randomWord
document.onkeyup = function(event) {
	var userInput = event.key;

	//Checking if only letters are typed using regular expression
	var inp = String.fromCharCode(event.keyCode);
	if (/[a-zA-Z]/.test(inp)) {
		var currentString = currentWord.textContent;

		//Checking if the same letter has been pressed again
		if (guessedLetters.indexOf(userInput) === -1) {
			guessedLetters.push(userInput);

			//Replace * with letter if the letter is correct
			if (randomWord.includes(userInput)) {
				var actualWord = '';
				for (var i = 0; i < randomWord.length; i++) {
					if (userInput == randomWord[i]) {
						actualWord = actualWord + userInput;
					} else {
						//leave *
						actualWord = actualWord + currentString[i];
					}
				}
				currentWord.textContent = actualWord;
				//currentString = actualWord;
			}

			//User wins the game if the userInputs complete the * (stars)
			if (actualWord == randomWord) {
				alert('You won the game! And the word was: ' + randomWord.toUpperCase() + '.');
				winCounter++;
				resetStat();
				audio.play();
			} else if (remainingGuess > 0) {
				//When the userInput is wrong
				remainingGuess--;
				document.getElementById('remaining-guess').innerHTML = remainingGuess;
			} else {
				//When guesses run out, lose it
				alert('Better luck next time!');
				lossCounter++;
				resetStat();
				sad.play();
			}

			//function to be called to reset the stats when the user wins or loses
			function resetStat() {
				remainingGuess = 7;
				guessedLetters = [];
				randomWord = word[Math.floor(Math.random() * word.length)];
				hideWord(randomWord);
				starredWord = hideWord(randomWord);
				currentWord.textContent = starredWord;
			}
		} else {
			alert('Please type in a new letter.');
		}
	} else {
		alert('Please type in a letter only.');
	}

	document.getElementById('remaining-guess').innerHTML = remainingGuess;
	document.getElementById('guessed-letter').innerHTML = guessedLetters;
	document.getElementById('wins').innerHTML = winCounter;
	document.getElementById('losses').innerHTML = lossCounter;
};
