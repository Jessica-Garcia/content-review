
const inputElement = document.getElementById('new-task-input');
const addTaskButton = document.getElementById('new-task-button');
const tasksContainer = document.querySelector('#tasks');

// verifica se o tamanho do valor do input é maior que 1 caracter
const validateInput = () => inputElement.value.trim().length > 1;

const handleAddTask = () => {

    const inputIsValid = validateInput();

    if(!inputIsValid){
        return inputElement.classList.add('error');
    }

    //cria uma div e adiciona uma class nela
    const taskItemContainer = document.createElement('div');
    taskItemContainer.classList.add('task-item');

    /* 
        Cria o parágrafo que vai ir dentro da div e adiciona o 
        valor do input nele
    
    */

    const taskContent = document.createElement('p');
    taskContent.innerText = inputElement.value;

    /*
        dispara o evento com a função que marca a 
        tarefa como concluída quando clicar no paragrafo

    */
    taskContent.addEventListener('click', () => handleClik(taskContent));



    //cria o ícone da lixeira

    const deleteIcone = document.createElement('i');
    deleteIcone.classList.add('fa-solid', 'fa-trash-can');


    /*
        dispara o evento com a função que deleta a tarefa ao
        clicar no ícone da lixeira
    */
    deleteIcone.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));


    //coloca o paragrafo e o icone dentro da div taskItemContainer

    taskItemContainer.appendChild(taskContent);
    taskItemContainer.appendChild(deleteIcone);

    //coloca a div que contem a task dentro da section tasks-container
    tasksContainer.appendChild(taskItemContainer);

    //limpa o imput
    inputElement.value = '';

    //atualiza o local storage

    updateLocalStorage();
}


// função que remove a clase de erro quando o input tem mais de 1 carácter

const handleInputChange = () => {
    const inputIsValid = validateInput();

    if(inputIsValid){
        return inputElement.classList.remove('error');
    }
}


/* 
    função que aplica a classe completed no parágrafo 
    para sinalizar que a tarefa está concluída
*/
const handleClik = (taskContent) => {
    /*
        pega um array de divs que contém o parágrafo com a tarefa 
        de dentro do container onde estão contidas 
        as divs com as tarefas
    */
    const tasks = tasksContainer.childNodes;

    // faz um loop pelas divs que contem o paragráfo com a tarefa
    for (const task of tasks) {
        
        /*
        verifica se o parágrafo (que é primeiro filho da div
        de tarefas) é igual ao paragráfo clicado
        */
        if (task.firstChild === taskContent) {
            
            /* 
                se for a tarefa clicada for igual a tarefa encontrada
                e a classe completed não existir
                adiciona a classe ao parágrafo, 
                e caso a classe já exista remove a 
                classe do parágrafo
            */

            task.firstChild.classList.toggle("completed");
        }
    }

    //atualiza o local storage

    updateLocalStorage();
}

// função que faz a deleção da tarefa

const handleDeleteClick = (taskItemContainer, taskContent) => {
    /*
        pega um array de divs que contém o parágrafo com a tarefa 
        de dentro do container onde estão contidas 
        as divs com as tarefas
    */
    const tasks = tasksContainer.childNodes;

     // faz um loop pelas divs que contem o paragráfo com a tarefa
     for (const task of tasks) {
        
        /*
        verifica se o parágrafo (que é primeiro filho da div
        de tarefas) é igual ao paragráfo clicado
        */
        if (task.firstChild === taskContent) {

            /*
                se for igual, vai remover a div que contem
                o paragrafo e o ícone
             */

            taskItemContainer.remove();
        }
    }  
    
    //atualiza o local storage

    updateLocalStorage();
}

// função que atualiza o local storage

const updateLocalStorage = () => {
    // pega todas as tarefas que estão atualmete na tela
    const tasks = tasksContainer.childNodes;

    // cria uma lista que guarda em formato json as tarefas
    const localStorageTasksArray = [...tasks];

    /*
        remove a primeira task em formato text que está 
        vindo não sei muito bem pq, talvez por causa do childNodes
        considerar espaços vazios entre tags como um elemento no formato 
        text
    */
    localStorageTasksArray.shift();
    
    localStorageTasks = localStorageTasksArray.map((task) => {
        
        //pega o parágrafo que contem a tarefa
        const content = task.firstChild;

        //pega as tarefas que estão concluídas
        const isCompleted = content.classList.contains("completed");

        //retorna a descrição da task e se está completa ou não 
        return {
            description: content.innerText,
            isCompleted: isCompleted
        }
    });

    /**
        guarda as tarefas no localStorage
     */

    localStorage.setItem('tasks', JSON.stringify(localStorageTasks));

}

/*
    Função que mostra as tarefas que estão no local storage em tela,
    mesmo que atualize a tela
 */
const refreshTasksUsingLocalStorage = () => {
    /*
        pega as tarefas do local storage e
        converte as tarefas do localstorage que estão em formato 
        string para formato JSON
    */

    const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
    
    // verifica se tem tarefas no local storage, se não tem sai da função

    if(!tasksFromLocalStorage) return;

    for (const task of tasksFromLocalStorage) {
        
        const taskItemContainer = document.createElement('div');
        taskItemContainer.classList.add('task-item');

        /* 
            Cria o parágrafo que vai ir dentro da div e adiciona o 
            valor da descrição da task dentro dele
        
        */

        const taskContent = document.createElement('p');
        taskContent.innerText = task.description;

        //verifica se a tarefa está comcluída, se estiver adiciona a classe completed

        if(task.isCompleted){
            taskContent.classList.add('completed');
        }
        /*
            dispara o evento com a função que marca a 
            tarefa como concluída quando clicar no paragrafo

        */
        taskContent.addEventListener('click', () => handleClik(taskContent));



        //cria o ícone da lixeira

        const deleteIcone = document.createElement('i');
        deleteIcone.classList.add('fa-solid', 'fa-trash-can');


        /*
            dispara o evento com a função que deleta a tarefa ao
            clicar no ícone da lixeira
        */
        deleteIcone.addEventListener('click', () => handleDeleteClick(taskItemContainer, taskContent));


        //coloca o paragrafo e o icone dentro da div taskItemContainer

        taskItemContainer.appendChild(taskContent);
        taskItemContainer.appendChild(deleteIcone);

        //coloca a div que contem a task dentro da section tasks-container
        tasksContainer.appendChild(taskItemContainer);

    }  
}

refreshTasksUsingLocalStorage();


// função para validar se tecla pressionada é o enter, se for vai simular o click do botão

document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTaskButton.click();
    }
})

// evento para executar a função handleAddTask quando o botão é clicado
addTaskButton.addEventListener('click', handleAddTask);

//evento para executar a função handleInputChange quando o valor do input sofre mudanças
inputElement.addEventListener('change', handleInputChange);