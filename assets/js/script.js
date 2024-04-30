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

//drag and drop functionality
$(document).ready(function () {
    $('.task-card').draggable();
    $('.swim-droppable').droppable({
        accept: '.draggable',
        drop: handleDrop,
    })
})

//datepicker
$(function(){
    $("#task-due-date").datepicker();
})

const dueDateColor = () => {
    if (dateInput.val().isBefore(dayjs())) {
        
    } else if (dateInput.val().isSame(dayjs())) {

    } else (dateInput.val().isAfter(dayjs())) {

    };
}

console.log(dueDateColor)
//todo: 
//fix the draggables from going behind the droppables

//find out if the task is due soon or overdue
//add delete option