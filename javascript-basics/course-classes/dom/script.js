/*----- SELECIONANDO ELEMENTOS -----*/

/* 
    getElementById()
    Seleciona o elemento pelo id
*/

const titleElement = document.getElementById("blog-title");
console.log(titleElement);

/*
    getElementsByclassName();
    seleciona os elementos pelo nome da classe
    retorna um HTMLColection 
    não permite iteração com forEach
*/

const paragElements = document.getElementsByClassName('paragraph');
console.log(paragElements);

/*
    getElementsByTagName()
    seleciona os elementos pelo nome da tag
    retorna um HTMLCollection 
    não permite iteração com forEach
*/

const linkElements = document.getElementsByTagName('a');
console.log(linkElements);

/*
    querySelector()
    busca o elemento pelo seletor
    seja id, class, tag, atributo...
    traz o primeiro elemento que ele achar
    
*/
const linkElement = document.querySelector('[href]');
console.log(linkElement);

/*
    querySelectorAll()
    busca todos os elementos que possuem determinado seletor
    Retorna um NodeList
    permite iteração com forEach()
*/

const divElements = document.querySelectorAll('div');
console.log(divElements);

/*--------------MANIPULANDO ELEMENTOS------------- */

/*
    textContent
    com textContent pode-se atribuir ou concatenar textos a um elemento
*/

// Atribuindo novo valor ao título
titleElement.textContent = 'Olá Devs!';

// Concatenando

titleElement.textContent += ' , Olá Mundo!';

/*

    innerText
    Faz o mesmo que o textContent
*/

linkElement.innerText = 'Clique'; // atribui
linkElement.innerText += ' aqui';// concatena

/*
    O InnerHTML manipula e concatena o texto dentro
    da tag html, com a diferença que se pode usar
    mais tags html dentro do texto e ele será 
    convertido para html na tela
*/

titleElement.innerHTML = 'Olá! <small> Bem vindos!!!</small>';


/*

    Com value é possível manipular valores de inputs 
    entre outros elementos

*/
const inputElement = document.querySelector('input');
inputElement.value = 'Digite aqui!';

/*--------------MANIPULANDO ATRIBUTOS------------- */

// Adicionando atributos nos elementos html via js

const header = document.querySelector('header');
header.setAttribute('id', 'topHeader');
header.setAttribute('class', 'bg top header');

//pegando o nome do atributo => 

console.log(header.getAttribute('id'));


// Removendo atributos

header.removeAttribute('id');


/* --------------Alterando estilos via JS-------------- */


//style

const body = document.querySelector('body');

body.style.backgroundColor = 'lightgreen'


//classList

/*
   classList.add() => Adiciona classes ao elemento
*/
titleElement.classList.add('active', 'green');


/*
  classList.remove() => Remove classes do elemento
*/

const paragElement = document.querySelector('p');
paragElement.classList.remove('green');

/*
    .classList.toggle() 
    - se a classe existir o toggle remove a classe
    - se a classe não existir ele adiciona a classe
*/

paragElement.classList.toggle('green');

/* ----------------NAVEGANDO PELOS ELEMENTOS PAIS------------------*/

//parentNode => traz o pai do elemento

console.log(titleElement.parentNode);

//parentElement => também traz o pai do elemento

console.log(titleElement.parentElement);


/* ----------------NAVEGANDO PELOS ELEMENTOS FILHOS------------------*/


/*
     childNodes

    - Traz todos os filhos em formato de nodeList
    - Permite iteração com foreach
    - Não elimina espaços vazios, estes veem como um elemento text
 */

console.log(body.childNodes);

/*
     children

    - Traz somente os elementos HTML em formato HTMLCollection
    - Não permite iterar forEach

*/

console.log(body.children);


/*
    ### firstChild

    Pega o primeiro filho geralmente um espaço vazio com formato text

    leva em consideração os espaços vazios entre tags
 */

console.log(body.firstChild);


/*
    ### firstElementChild

    pega o primeiro filho 

    - Ignora o espaços entre tags
*/

console.log(body.firstElementChild);

/*
    lastChild

    - Pega o último filho
*/

console.log(body.lastChild);

/*
    ### lastElementChild

    - pega o último filho também

 */

console.log(body.lastElementChild);


/* --------------NAVEGANDO PELOS ELEMENTOS IRMÃOS------------------*/


/*
    nextSibling
    leva em consideração o espaço entre as tags
    traz o espaço em formato text

*/

console.log(header.nextSibling); //text


/*
    nextElementSibling

    Não leva em consideração os espaços entre as tags 
    e traz o próximo elemento irmão

*/

console.log(header.nextElementSibling); // p


/*
    previousSibling

    leva em consideração o espaço vazio entre as tags

    traz o espaço em formato text

*/

console.log(paragElement.previousSibling); //text



/*
    previousElementSibling

    Não leva em consideração o espaço 
    vazio e traz o elemento irmão anterior

*/

console.log(paragElement.previousElementSibling);// header


/* ------------CRIANDO E ADICIONANDO ELEMENTOS-------------- */

// createElement

const div = document.createElement('div');
div.innerText = 'Lorem'

/*
    append
    vai adicionar o elemento no final do elemento selecionado
    após todos os elementos já existentes
*/

header.append(div);

/*
    prepend

    adiciona o elemento no início do elemento selecionado
    acima de todos os elementos já existentes

*/

header.prepend(div);

/*
    insertBefore()

    Geralmente usado para inserir um elemento entre outros elementos

    é passado para o insertBefore() dois argumento, o elemento que se quer inserir e o nó de referência 
    aquele cujo elemento será inserido antes dele 
*/

body.insertBefore(div, paragElement);


/* ---------EVENTOS--------- */

const print = () => {
    console.log('print');
};

titleElement.addEventListener('click', print);

paragElement.addEventListener('mouseover', print);

inputElement.addEventListener('keypress', print);
