const itemInput = document.getElementById('item-name-input');
const addItemButton = document.getElementById('add-item-button');
const list = document.getElementById('item-list-container');
const shoppingList = localStorage.getItem('shopping-list');
let dbItems =  shoppingList
    ? JSON.parse(shoppingList)
    : [];

const closeModalButton = document.getElementById('close-modal');
const modal= document.getElementById('modal');
const fade= document.getElementById('fade');
const updateButton = document.getElementById('update-item-button');
const itemUpdateInput = document.getElementById('item-update-input');
let selectedId;

const toggleModal = (id) => {
    if(id) {
        itemUpdateInput.value = dbItems.find(item => item.id === id).name;
        selectedId = id;
    } else{
        itemUpdateInput.value = '';
        selectedId = null;
    }
    modal.classList.toggle('hide');
    fade.classList.toggle('hide');
}

const generateId = () => Math.floor(Math.random() * Date.now());

const saveItemInList = () => {
    
    const inputValue = itemInput.value;
    itemInput.value = '';
    if(!inputValue.trim().length) {
        alert('Adicione um texto');
        return;
    }

    const newItem = {
        name: inputValue,
        id: generateId(),
        checked: false
    }
    dbItems.push(newItem);
    localStorage.setItem('shopping-list', JSON.stringify(dbItems));
    showList();
}

const showList = () => {
    list.innerText = '';

    for (const item of dbItems) {
        
        const li = document.createElement('li');
        li.classList.add('item-container');

        const divItem = document.createElement('div');
        divItem.classList.add('item');

        const checkInput = document.createElement('input');
        checkInput.setAttribute('type', 'checkbox');
        checkInput.checked = item.checked;
        checkInput.setAttribute('id', item.id);
        checkInput.classList.add('checkbox-input');
        checkInput.addEventListener('click', () => toggleCheckbox(item.id))
        const label = document.createElement('label');
        label.classList.add('item-text');
        label.setAttribute('for', item.id);
        label.innerText = item.name;

        divItem.appendChild(checkInput);
        divItem.appendChild(label);
        li.appendChild(divItem);

        const divButtons = document.createElement('div');
        divButtons.classList.add('item-buttons');

        const editButton = document.createElement('button');
        editButton.classList.add('action-button');
        editButton.innerHTML = '<i class="fa-solid fa-pencil">';
        editButton.addEventListener('click', ()=> toggleModal(item.id));
        updateButton.addEventListener('click', updateItem);
        
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('action-button');
        deleteButton.innerHTML = '<i class="fa-solid fa-trash">';
        deleteButton.addEventListener('click', () => deleteItemById(item.id));
        divButtons.appendChild(editButton);
        divButtons.appendChild(deleteButton);

        li.appendChild(divButtons);
        list.appendChild(li);
    }
}

const deleteItemById = (id) => {
    const index = dbItems.findIndex(item => item.id === id);
    dbItems.splice(index, 1);
    localStorage.setItem('shopping-list', JSON.stringify(dbItems));
    showList();
}

const updateItem = () => {
    if(!itemUpdateInput.value.trim().length) {
        alert('Adicione um texto');
        return;
    }
    dbItems = dbItems.map(item => {
        if(item.id === selectedId){
            return {
                ...item, 
                name: itemUpdateInput.value
            }
        }
        return item;
    })
    localStorage.setItem('shopping-list', JSON.stringify(dbItems));
    toggleModal();
    showList();
}

const toggleCheckbox = (id) => {
    dbItems = dbItems.map(item => {
        return item.id === id 
            ? {
                ...item, 
                checked: !item.checked
            } 
            : item;
    })
    localStorage.setItem('shopping-list', JSON.stringify(dbItems));
}

const saveItemWithEnterKey = (e) => {
    if(e.key === 'Enter') {

        saveItemInList();
    }
}

addItemButton.addEventListener('click', saveItemInList);
itemInput.addEventListener('keypress', saveItemWithEnterKey);
itemUpdateInput.addEventListener("keypress", (e) => e.key === 'Enter' && updateItem());
closeModalButton.addEventListener('click', () => toggleModal());
showList();