function toggleMode() {
    var body = document.body;
    var darkModeToggle = document.getElementById('dark-mode-toggle');
        
    var isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<span class="sun-icon"><i class="fas fa-sun"></i></span>';
    }
}

const inputs = document.querySelector(".inputs"),
resetBtn = document.querySelector(".reset-btn"),
hint = document.querySelector(".hint span"),
guessLeft = document.querySelector(".guess-left span"),
wrongLetter = document.querySelector(".wrong-letter span"),
typingInput = document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word;
    maxGuesses = 8; corrects = []; incorrects = [];

    hint.innerText = ranObj.hint;
    guessLeft.innerText = maxGuesses;
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += '<input type="text" disabled>';
    }
    inputs.innerHTML = html;
}
randomWord();

function initGame(e) {
    let key = e.target.value.toLowerCase();
    if(key.match(/^[a-z]$/) && !incorrects.includes(key) && !corrects.includes(key)) {
        if(word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if(word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
        } else {
            maxGuesses--;
            incorrects.push(key);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects.join(", ");
    }
    typingInput.value = "";

    setTimeout(() => {
        const uniqueCorrects = [...new Set(corrects)];
        if(uniqueCorrects.length === new Set(word).size) {
            Swal.fire({
                title: 'Congrats!',
                text: `You found the word ${word.toUpperCase()}`,
                icon: 'success',
                confirmButtonText: 'Play Again'
            }).then(() => {
                randomWord();
            });
        }
        if(maxGuesses < 1) {
            Swal.fire({
                title: 'Game Over!',
                text: `You don't have remaining guesses. The word was ${word.toUpperCase()}`,
                icon: 'error',
                confirmButtonText: 'Try Again'
            }).then(() => {
                randomWord();
            });
        }
    }, 100);
}

resetBtn.addEventListener("click", randomWord);
typingInput.addEventListener("input", initGame);
inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());