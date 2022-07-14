
// Manipulando valores de input

const distributesCharacter = () => {
    //selecionar o valor digitado
    let character = document.getElementById('character').value;

    //Limpar o campo de digitação
    
    document.getElementById('character').value = '';

    //Limpar espaços em branco nas extremidades da string

    character.trim();

    switch (character) {
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            document.getElementById('number').value += character;
            break;
        case ' ':
            document.getElementById('character') = '';
            break;
        default:
            document.getElementById('letter').value += character;
            break;
    }
}

const characterInput = document.getElementById('character');

characterInput.addEventListener('keypress', distributesCharacter);

// Manipulando estilos de elementos - com style

const divSquare = document.getElementById('square');
const redButton = document.getElementById('button-red');
const greenButton = document.getElementById('button-green');
const blueButton = document.getElementById('button-blue');

const turnRed = () => divSquare.style.backgroundColor = 'red';
const turnGreen = () => divSquare.style.backgroundColor = 'green';
const turnBlue = () => divSquare.style.backgroundColor = 'blue';

redButton.addEventListener('click', turnRed);
greenButton.addEventListener('click', turnGreen);
blueButton.addEventListener('click', turnBlue);


// Manipulando estilos de elementos - com classes

const divCircle = document.getElementById('circle');
const pinkButton = document.getElementById('pink');
const purpleButton = document.getElementById('purple');
const brownButton = document.getElementById('brown');


const removeCurrentClass = () => {
    let divCircleCurrentClass = divCircle.classList;
    divCircle.classList.remove(divCircleCurrentClass);
}

const turnPink = () => {
    removeCurrentClass();
    divCircle.classList.add('pink');
}


const turnPurple = () => {
    removeCurrentClass();
    divCircle.classList.add('purple');   
}

const turnBrown = () => {
    removeCurrentClass();
    divCircle.classList.add('brown');
}

pinkButton.addEventListener('click', turnPink);
purpleButton.addEventListener('click', turnPurple);
brownButton.addEventListener('click', turnBrown);


// exercício de fixação


const enterInput = document.getElementById('enter');

const bgYellow = e => e.target.style.backgroundColor = 'yellow';
const bgRed = e => e.target.style.backgroundColor = 'red';
const bgGreen = e => e.target.style.backgroundColor = 'green';

const changeBg = (e) => e.target.value.length < 3 ? bgRed(e) : bgGreen(e);
const cleanField = e => e.target.value = '';

enterInput.addEventListener('focus', bgYellow);
enterInput.addEventListener('blur', changeBg);
enterInput.addEventListener('focus', cleanField);
