// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

//modal form and local storage
const formModal = $('#formModal')
const taskContainer = $('#todo-cards')
const addTaskBtn = $("#taskBtn")
const closeModalBtn = $('#closeModal')
const submitModalBtn = $('#saveTask')

let titleInput = $('#task-title')
let dateInput = $('#task-due-date')
let descriptionInput = $('#task-description')
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//drag and drop
const draggables = document.querySelectorAll('.task-card');
const droppables = document.querySelectorAll('.swim-droppable');

//basic modal functionality
addTaskBtn.on('click', () => $('#formModal').modal('show'));
closeModalBtn.on('click', () => $('#formModal').modal('hide'));


//pushing new tasks to the array
const addTask = (title, date, description) => {
    tasks.push({
        title,
        date,
        description,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))

    return {title, date, description};
};

//adding the card format
const createTaskCard = ({title, date, description}) => {
    const taskDiv = document.createElement('div');
    taskDiv.setAttribute('draggable', 'true');
    taskDiv.setAttribute('class', 'task-card')
    const taskName = document.createElement('h3');
    const taskDate = document.createElement('p');
    const taskDesc = document.createElement('p');

    taskName.innerText = "Task Title: " + title;
    taskDate.innerText = "Task Due Date: " + date;
    taskDesc.innerText = "Task Description: " + description;

    taskDiv.append(taskName, taskDate, taskDesc);
    taskContainer.append(taskDiv);
};

tasks.forEach(createTaskCard);

//putting the form input on the card when form is submitted
submitModalBtn.on('click', (event) => {
    event.preventDefault();

    // console.log('the task was submitted')
    const newTask = addTask(
        titleInput.val(),
        dateInput.val(),
        descriptionInput.val()
    );
    
    $('#formModal').modal('hide');

    createTaskCard(newTask);
});


//drag and drop styling and functionality
draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        // console.log('is dragging')
        task.classList.add('is-dragging')
    });
    draggable.addEventListener('dragend', () => {
        task.classList.remove('is-dragging')
    });
});

droppables.forEach(droppable => {
    droppable.addEventListener('dragover', (event) => {
        event.preventDefault();
        const lastTask = insertAboveTask(droppable, event.clientY);
        console.log(lastTask);
        const currentDraggable = document.querySelector('.is-dragging')
        droppable.appendChild(currentDraggable);      
    });
});

const insertAboveTask = (droppable, mouseY) => {
    const draggableEl = [...droppable.querySelectorAll('.draggable:not(.is-dragging')];
    
    return draggableEl.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box-height / 2;
        console.log(box);
        if (offset < 0 && offset > closest.offset) {
            return{ offset: offset, element: child }
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY } ).element

}


//todo: 
//put the tasks in new droppables
//add the date picker
//find out if the task is due soon or overdue
//add delete option