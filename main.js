let list = document.querySelector('#task-list');
let inputValue = document.querySelector('#input-task');
let checkbox = document.querySelector('.content__checkbox')
let listIt = document.querySelector('li')

let taskList = [];



document.querySelector('#add-task-button').addEventListener('click', function(event) {
    event.preventDefault();
    addTask(inputValue.value)
});


function addTask(item) {

    if(item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        taskList.push(todo);
        addToLocalStorage(taskList);

        inputValue.value = '';
   }
}

function renderTodos(taskList) {
    list.innerHTML = '';
    taskList.forEach(function(item) {
        const checked = item.completed ? 'checked': null;
        const li = document.createElement('li');
        const span = document.createElement('span');
        span.classList.add('task');
        span.textContent = item.name;
        const button = document.createElement('button');
        button.classList.add('delete-btn')


        li.setAttribute('data-key', item.id);
        if (item.completed === true) {
            span.classList.add('checked');
        }

        li.innerHTML = `
      <input class="content__checkbox" type="checkbox" ${checked}>

      
    `;
        li.appendChild(span);
        li.appendChild(button);
        list.appendChild(li);
    })
}

function addToLocalStorage(taskList) {
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTodos(taskList);
}

function getFromLocalStorage() {
    const reference = localStorage.getItem('tasks');
    if(reference) {
        taskList = JSON.parse(reference);
        renderTodos(taskList);
    }
}

function toggle(id) {
    taskList.forEach(function(item) {
       if (item.id == id) {
            item.completed = !item.completed;
       }
    });

    addToLocalStorage(taskList);
}


function deleteTodo(id) {
    taskList = taskList.filter(function(item) {
        return item.id != id;
    });

    // update the localStorage
    addToLocalStorage(taskList);
}


getFromLocalStorage();


list.addEventListener('click', function(event) {

    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.getAttribute('data-key'));
    }

    if (event.target.classList.contains('delete-btn')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }})