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
    const taskDateInput = document.createElement('p');
    taskDateInput.setAttribute('id', 'taskDateInput')
    const taskDesc = document.createElement('p');
    const deleteBtn = document.createElement('button')
    deleteBtn.setAttribute('id', 'deleteBtn')

    taskName.innerText = "Task Title: " + title;
    taskDate.innerText = "Task Due Date: "
    taskDateInput.innerText = date;
    taskDesc.innerText = "Task Description: " + description;
    deleteBtn.innerText = "Delete Task"

    taskDiv.append(taskName, taskDate, taskDateInput, taskDesc, deleteBtn);
    taskContainer.append(taskDiv);
};

tasks.forEach(createTaskCard);


//delete btn
const deleteBtns = document.getElementById('deleteBtn')

deleteBtns.forEach((button) => {
    button.addEventListener('click', () => { 
        button.parentElement.remove();
        localStorage.removeItem()
    })
})


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
    })
})


//datepicker
$(function(){
    $("#task-due-date").datepicker();
})


//determine if the task is due soon or overdue and change styling
const taskDateInput = document.getElementById('taskDateInput').value
const parsedUserDate = dayjs(taskDateInput);
console.log(parsedUserDate)

const dueDateColor = () => {
    draggables.forEach((draggable) => {
        if (parsedUserDate.isAfter(dayjs())) {
        draggable.setAttribute('class', 'over-due')
    } else if (parsedUserDate.isSame(dayjs())) {
        draggable.setAttribute('class','due-soon')
    } else {
        console.log('the task is not due soon')
    };
    })
    
}

dueDateColor();