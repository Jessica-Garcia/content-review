const inputNewTask = document.getElementById('newTask');
const btnAddTask = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const editWindow = document.getElementById('editWindow');
const editWindowBackground = document.getElementById('editWindowBackground');
const editWindowButtonClose = document.getElementById('editWindowBtnClose');
const buttonUpdateTask = document.getElementById('updateTask');
const editTaskId = document.getElementById('editTaskId');
const inputEditedTaskName = document.getElementById('taskEditName');
const KEY_CODE_ENTER = 13;
let dbTasks = [];

const createLiElement = (task) => {
    
    const li = document.createElement('li');
    li.id = task.id;
    
    return li;
}

const createSpanElementWithTaskText = (task) => {
    
    const span = document.createElement('span');
    span.classList.add('taskText');
    span.innerHTML = task.name;
 
    return span;
}

const createDivElement = () => document.createElement('div');

const createEditButton = () => {
    
    const editButton = document.createElement('button');
    editButton.classList.add('btnAction');
    editButton.innerHTML = '<i class="fa fa-pencil"></i>';
    return editButton;
}

const createDeleteButton = () => {
    
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btnAction');
    deleteButton.innerHTML = '<i class="fa fa-trash"></i>';

    return deleteButton;
}

const generateId = () => Math.floor(Math.random() * Date.now());

const inputClear = () => inputNewTask.value = '';

const newTaskObj = (input) => {
    
    return {
        name: input.value,
        id: generateId(),
    }
}

const addTaskWithEnter = (e) => {
    
    if (e.keyCode === KEY_CODE_ENTER) {
        
        const task = newTaskObj(inputNewTask);
        
        if(task.name.trim().length < 2) return alert('Tarefa precisa ter no mínimo 2 caracteres');
        addTask(task);
    }
}

const addTaskWithButton = (e) => {
    
    const task = newTaskObj(inputNewTask);

    if(task.name.trim().length < 2) return alert('Tarefa precisa ter no mínimo 2 caracteres');
    addTask(task);
}

const updateTasksLocalStorage = () => { 
    localStorage.setItem('to-do-list', JSON.stringify(dbTasks));
}

const addTaskObjInLocalStorage = (task) => {
    dbTasks.push(task);
    updateTasksLocalStorage();
}

const createTaskItem = (task) => {
    
    const li = createLiElement(task);
    const span = createSpanElementWithTaskText(task);
    const div = createDivElement();
    const editButton = createEditButton(task);
    editButton.addEventListener('click', () => openTaskEditingWindow(task))
    
    const deleteButton = createDeleteButton(task);
    deleteButton.addEventListener('click', () => deleteTask(task))
    
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    li.append(span);
    li.appendChild(div);

    return li;
}

const addTask = (task) => {

    addTaskObjInLocalStorage(task);
    const taskItem = createTaskItem(task);
    taskList.appendChild(taskItem);
    inputClear();
}

const getTasksFromLocalStorage = () => {
    
    const tasks = localStorage.getItem('to-do-list');
    
    if(tasks){
        dbTasks = JSON.parse(tasks);
    }
}

const henderTasksFromLocalStorage = () => {

    for (const task of dbTasks) {
        
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    }
    
    inputClear();
}

const alternateWindowEdition = () => {

    editWindow.classList.toggle('open');
    editWindowBackground.classList.toggle('open');
}

const openTaskEditingWindow = (task) => {
    
    const taskId = task.id;
    const taskItem = document.getElementById(taskId);
    
    if(taskItem) {
        editTaskId.innerHTML = taskId;
        inputEditedTaskName.value = taskItem.innerText;
        alternateWindowEdition();
    } else {
        alert('Elemento não encontrado');
    }
}

const getTaskIndexById = (taskId) => {
    const taskIndex = dbTasks.findIndex(t => t.id == taskId);
    
    if(taskIndex < 0) {

        throw new Error('error', taskId);
    }
    return taskIndex;
}

const deleteTaskFromLocalStorage = (taskId) => {
            
    const taskIndex = getTaskIndexById(taskId);

    dbTasks.splice(taskIndex, 1);
    updateTasksLocalStorage(dbTasks); 
}

const deleteTask = (task) => {
    
    const taskId = task.id;
    const confirmation = window.confirm('Tem certeza que deseja excluir?');
    
    if(confirmation) {
        
        const taskItem = document.getElementById(taskId);

        if(taskItem) {
            
            taskList.removeChild(taskItem);
            
        } else {
            
            alert('Elemento não encontrado');
        }

        deleteTaskFromLocalStorage(taskId);
    }
}

const updateTaskInLocalStorage = (taskId, updatedTask) => {
    
    const taskIndex = getTaskIndexById(taskId);

    dbTasks.splice(taskIndex, 1, updatedTask);
    updateTasksLocalStorage(dbTasks); 
}

const updatedTaskObj = (inputEditedTaskName, taskId) => {
    
    return {
        name: inputEditedTaskName.value,
        id: taskId
    }
}

const updateTask = () => {
    
    const taskId = editTaskId.innerHTML

    const updatedTask = updatedTaskObj (inputEditedTaskName, taskId);

    const currentTask = document.getElementById(taskId);
    
    if (currentTask) {
        
        if(updatedTask.name.trim().length < 2) return alert('Tarefa precisa ter no mínimo 2 caracteres');
        
        const taskItem = createTaskItem(updatedTask);
        
        taskList.replaceChild(taskItem, currentTask);
        
        alternateWindowEdition();

        updateTaskInLocalStorage(taskId, updatedTask);

    } else {
        alert('Elemento não encontrado');
    }
}

getTasksFromLocalStorage();

henderTasksFromLocalStorage();

inputNewTask.addEventListener('keypress', addTaskWithEnter);
btnAddTask.addEventListener('click', addTaskWithButton);
editWindowButtonClose.addEventListener('click', alternateWindowEdition);
buttonUpdateTask.addEventListener('click', (e) => {
    e.preventDefault();
    updateTask();
});