document.addEventListener('DOMContentLoaded', () => {

    const divTaskContent = document.querySelector('.taskElement');
    const inputTask = document.querySelector('.input-task');
    const buttonTaks = document.querySelector('.createTask');
    const buttonClear = document.querySelector('.clear');
    loadTasks();

    function loadTasks () {
        let taskColection = localStorage.getItem('keyTask');
        if(taskColection === null) {
            return taskColection = [];
        }

        const taskValue = JSON.parse(taskColection);
        console.log(taskValue);

        for(tarefa of taskValue) {
            divTaskContent.appendChild(createTask(tarefa))
        }       
        
        const teste = divTaskContent.querySelectorAll('.task-container');
    
        

        // saveTask();

        // const lengthTasks = divTaskContent.childNodes.length;
        // console.log(lengthTasks);
        // if (lengthTasks >= 1) { buttonClear.style.display = 'block'; }
    }

    function handleClickTask() {
        const task = inputTask.value;
        const lengthTasks = divTaskContent.childNodes.length;

        if (!validateInput(task)) { return inputInvalid() }

        inputTask.value = '';
        inputTask.focus();
        inputTask.classList.remove('inputiInvalid');

        if (lengthTasks >= 1) { buttonClear.style.display = 'block'; }

        const taskContent = createTask(task);
        divTaskContent.appendChild(taskContent);

        const getElementDeleteTask = taskContent.querySelector('.deleteTask');
        getElementDeleteTask.addEventListener('click', () => deleteTask(taskContent));

        saveTask();
    }

    function saveTask() {
        const tasks = divTaskContent.children;
        const taskContentElement = [];

        for (taskDiv of tasks) {
            taskContentElement.push(taskDiv.firstChild.innerText);
        }

        const JSONTask = JSON.stringify(taskContentElement)

        localStorage.setItem('keyTask', JSONTask);
    }

    // limpar tarefas
    buttonClear.addEventListener('click', () => {

        const tasks = divTaskContent.querySelectorAll('.task-container');

        tasks.forEach(task => {
            task.remove();
        })

        buttonClear.style.display = 'none';
        saveTask()
    })

    // validar campo input
    function validateInput(inputValue) { return inputValue.length > 0 }

    // criar tarefa
    function createTask(taskValue) {
        function containerTask() {
            const divElement = document.createElement('div');
            divElement.classList.add('task-container');

            return divElement;
        };

        function textTask() {
            const paragraphElement = document.createElement('p');
            paragraphElement.innerHTML = taskValue;

            return paragraphElement;
        };

        function deleteTask() {
            const deleteElement = document.createElement('p');
            deleteElement.innerHTML = 'x';
            deleteElement.classList.add('deleteTask');

            return deleteElement;
        };

        const divTask = containerTask();
        const valueTask = textTask();
        const deleteTaskElement = deleteTask();

        divTask.appendChild(valueTask);
        divTask.appendChild(deleteTaskElement);

        return divTask;
    }

    // deletar tarefa
    function deleteTask(taskElement) {
        const lengthTasks = divTaskContent.childNodes.length;

        taskElement.remove();
        if (lengthTasks <= 2) { buttonClear.style.display = 'none'; }
        saveTask()
    }

    // input vazio
    function inputInvalid() {
        inputTask.classList.add('inputiInvalid');
        inputTask.focus();
    }

    // buttonTaks.addEventListener('keypress', handleClickTask);
    buttonTaks.addEventListener('click', handleClickTask);
});