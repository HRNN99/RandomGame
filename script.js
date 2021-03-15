let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');


let guessCount = 1;
let resetButton;

function checkGuess() {
    let userGuess = Number(guessField.value); //Numero que introduce el jugador
    if (guessCount === 1){ //Para que solo al inicio ponga "previous guesses: " y no en todos los intentos
        guesses.textContent = 'Intentos previos: ';
    }
    guesses.textContent += userGuess + ' '; //Agrega el numero introducido + un espacio

    if (userGuess === randomNumber) { //Condicion si gana
        lastResult.textContent = 'Felicidades, el numero es el correcto!';
        lastResult.style.backgroundColor = 'rgba(0, 128, 0, 0.486)';
        lowOrHi.textContent = '';
        setGameOver();
    } else if (guessCount === 10){ //Condicion si pierde
        lastResult.style.textAlign = 'center'
        lastResult.textContent = '...JUEGO TERMINADO, HAS PERDIDO...';
        setGameOver();
    } else { //Si el numero esta mal
        lastResult.textContent= 'Numero incorrecto!';
        lastResult.style.backgroundColor = 'rgb(255, 0, 0, 0.6)';

        if(userGuess < randomNumber) { // Si el numero es menor o mayor
            lowOrHi.textContent = 'El numero ingresado es menor!';
        } else if (userGuess > randomNumber) {
            lowOrHi.textContent = 'El numero ingresado es mayor!';
        }
    }

    guessCount++; //Incrementa los intentos
    guessField.value = ''; //Reinicia el input "guessField" para introducir un nuevo numero
    guessField.focus(); //Lo centra para la facilidad de introducir un nuevo numero
}

guessSubmit.addEventListener('click', checkGuess);

function setGameOver(){
    guessField.disabled = true;
    guessSubmit.disabled = true;
    resetButton = document.createElement('button'); //Lo crea
    resetButton.textContent = 'Empezar nuevo juego';
    document.body.append(resetButton); //Lo muestra
    resetButton.addEventListener('click', resetGame);
}


function resetGame() {
    guessCount = 1;

    const resetParas = document.querySelectorAll('.resultParas p');
    for(let i = 0; i < resetParas.length ; i++){
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();

    lastResult.style.backgroundColor = 'rgba(0, 0, 0, 0)';
    randomNumber = Math.floor(Math.random() * 100) + 1;
}
