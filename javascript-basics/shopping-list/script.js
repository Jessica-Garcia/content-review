const itemInput = document.getElementById('item-name-input');
const addItemButton = document.getElementById('add-item-button');
const list= document.getElementById('item-list-container');
const dbItems = [];

const generateId = () => Math.floor(Math.random() * Date.now());

const createLiElement = () => {
    const li = document.createElement('li');
    li.classList.add('item-container')
    return li;
}

const createDivItemElement = () => {
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    return divItem;
}

const createInputTypeCheckElement = (id) => {

    const checkboxInput = document.createElement('input');
    checkboxInput.setAttribute('type', 'checkbox');
    checkboxInput.classList.add('checkbox-input');
    checkboxInput.setAttribute('id', id);
    return checkboxInput;
}

const createLabelElement = (id) => {
    const labelItemText= document.createElement('label');
    labelItemText.setAttribute('for', id);
    labelItemText.classList.add('item-text');
    labelItemText.innerText = itemInput.value;
    return labelItemText;
}

const createDivButtonsElement = () => {
    const divButtons = document.createElement('div');
    divButtons.classList.add('item-buttons');
    return divButtons;
}

const createEditButtonElement = () => {
    const editButton = document.createElement('button');
    editButton.classList.add('action-button');
    editButton.innerHTML = '<i class="fa-solid fa-pencil">'
    return editButton;
}

const createDeleteButtonElement = () => {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('action-button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash">'
    return deleteButton;
}

const clearInput = () => itemInput.value = '';

const createItem = () => {
    const id = generateId();
    const listItem = createLiElement();
    const divItem = createDivItemElement();
    const inputCheckbox = createInputTypeCheckElement(id);
    const labelItemText = createLabelElement(id);
    const divButtons = createDivButtonsElement();
    const editButton = createEditButtonElement();
    const deleteButton = createDeleteButtonElement();

    divItem.appendChild(inputCheckbox);
    divItem.appendChild(labelItemText);

    divButtons.appendChild(editButton);
    divButtons.appendChild(deleteButton);

    listItem.appendChild(divItem);
    listItem.appendChild(divButtons);

    return listItem;
}

const addItemToList = () => {
    
    if(itemInput.value.trim().length < 1) return;
    
    const listItem = createItem();
    list.appendChild(listItem);

    clearInput();
}


const addItemWithEnterKey = (e) => {
    if (e.key === 'Enter') addItemToList();
}

addItemButton.addEventListener('click', addItemToList);
document.addEventListener('keypress', addItemWithEnterKey);