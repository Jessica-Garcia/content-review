
const inputElement = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('new-task-button');
const tasksContainer = document.querySelector('#tasks');

const createElement = el => document.createElement(el);
const addClassInElement = (elementName, className) => elementName.classList.add(className);
const addInputValue = (inputElement, element) => element.innerText = inputElement.value;
const clearInput = input => input.value = '';

const removeClassError = el => {
    const isValueLengthAcceptable = el.value.trim().length > 1;
    if(isValueLengthAcceptable){

        el.classList.remove('error');
    }
}

const createTask = input => {
    const taskItemContainer = createElement('div');
    addClassInElement(taskItemContainer, 'task-item');

    const taskContent = createElement('p');
    addInputValue(input, taskContent);
    taskContent.addEventListener('click', () => addCompleteClassInTask(taskContent));

    const trashIcon = createElement('i');
    addClassInElement(trashIcon, 'fa-solid');
    addClassInElement(trashIcon, 'fa-trash-can');
    trashIcon.addEventListener('click', () => removeTask(taskItemContainer, taskContent));
    
    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(trashIcon);
    // tasksContainer.appendChild(taskItemContainer);
    return taskItemContainer;
}

const addTask = (input) => {
    
    const isValueLengthAcceptable = input.value.trim().length > 1;

    if(!isValueLengthAcceptable){
        return input.classList.add('error');
    }

    const task = createTask(input);

    tasksContainer.append(task);

    clearInput(input);
    updateLocalStorage();
}

const addCompleteClassInTask = (taskContent) => {
    const tasks = tasksContainer.childNodes;
    for (const task of tasks) {
        if (task.firstChild === taskContent) {
            task.firstChild.classList.toggle("completed");
        }
    }

    updateLocalStorage();

}

const removeTask = (taskItemContainer, taskContent) => {
    const tasks = tasksContainer.childNodes;

     for (const task of tasks) {
        if (task.firstChild === taskContent) {

            taskItemContainer.remove();
        }
    }  
    
    updateLocalStorage();
}

const convertTaskInJSONFormat = (task) => {  
        
    const taskContent = task.firstChild;

    const isCompleted = taskContent.classList.contains("completed");

    return {
        value: taskContent.innerText,
        isCompleted: isCompleted
    }
}

const updateLocalStorage = () => {

    const tasks = tasksContainer.children;
    const tasksArray = [...tasks];
    
    const localStorageTasks = tasksArray.map(convertTaskInJSONFormat);

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));
}

const showTasksFromLocalStorage = () => {

    const tasksFromLocalStorageInStringFormat = localStorage.getItem('tasks');
    const tasksFromLocalStorage = JSON.parse(tasksFromLocalStorageInStringFormat);
    
    if(!tasksFromLocalStorage) return;

    for (const taskObj of tasksFromLocalStorage) {
        const task = createTask(taskObj);
        
        if (taskObj.isCompleted) {
            task.firstChild.classList.add('completed');
        }
        
        tasksContainer.append(task);
    } 
}

showTasksFromLocalStorage();

addTaskButton.addEventListener('click', () => addTask(inputElement));
inputElement.addEventListener('change', () => removeClassError(inputElement));
document.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        addTaskButton.click();
    } 
});
