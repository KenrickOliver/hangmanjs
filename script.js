const wordEl = document.getElementById('word')
const wrongLettersEl = document.getElementById('wrong-letters')
const playAgainBtn = document.getElementById('play-again')
const popup = document.getElementById('popup-container')
const notification = document.getElementById('notification-container')
const finalMessage = document.getElementById('final-message')
const finalMessage2 = document.getElementById('final-message2')

const bodyParts = document.querySelectorAll('.body-part')


// Static Array filled with words - *need to change to fetch words from an API
const words  = ['apples', 'programming', 'work', 'nursing', 'interface', 'ninja'];

let selectedWord = words[Math.floor(Math.random() * words.length)]

const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    wordEl.innerHTML = `
     ${selectedWord
        .split('')
        .map(letter => `
            <span class="letter">
                ${correctLetters.includes(letter) ? letter : ''}
            </span> 
            `   
        ).join('')
    }
    `;

    const innerWord = wordEl.innerText.replace(/\n/g, '');

    console.log(innerWord)

    if(innerWord === selectedWord) {
        finalMessage.innerText = 'Congradulations! You win';
        popup.style.display = 'flex';
    }
}

// Function to Update the wrong letters 
function updateWrongLetters() {
    //Display wrong letters 
    wrongLettersEl.innerHTML = `
     ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
     ${wrongLetters.map( letter => `<span>${letter}</span>`)}
    `;

    //showing stick figure body parts based on number of wrong letters
    bodyParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    })

    //Check if the game is lost
    if(wrongLetters.length === bodyParts.length) {
        finalMessage.innerText = 'Unfortunately you lost.';
        finalMessage2.innerHTML = 'BoB paid the price and was hanged'
        popup.style.display = 'flex'
    }
}

//Show notification for already tried letters

function showNotification() {
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

//Event functionality (key presses) 
//Limit keypress to ONLY letters based on keycodes  (65 - 90)

window.addEventListener('keydown', e => {
    if(e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;

        if(selectedWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);

                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLetters();
            } else {
                showNotification();
            }
        }
    }
})

//To restart game and Play again functionality
playAgainBtn.addEventListener('click', () => {
    // Empty all the arrays storing values
    correctLetters.splice(0);
    wrongLetters.splice(0);

    //Get a new word (API call in the future)
    selectedWord = words[Math.floor(Math.random() * words.length)];

    //Display new word
    displayWord();

    //Dispose of ded BoB
    updateWrongLetters();

    popup.style.display = 'none'
})
displayWord();
