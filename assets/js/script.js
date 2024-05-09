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
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//drag and drop
const draggables = document.querySelectorAll('.task-card');
const droppables = document.querySelectorAll('.swim-droppable');

//basic modal functionality
addTaskBtn.on('click', () => $('#formModal').modal('show'));
closeModalBtn.on('click', () => $('#formModal').modal('hide'));


//pushing new tasks to the array
const addTask = (title, date, description, id) => {
    // tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    // const newID = tasks.length
    tasks.push({
        title,
        date,
        description,
        id: id,
    });

    localStorage.setItem("tasks", JSON.stringify(tasks))
    
    return {title, date, description};
};

const removeElement = (event) => {
    const button = event.target;
    button.parentElement.remove();
    const id = button.getAttribute('data-task');
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.filter((task) => {
        task.id !== id
        console.log("task id", task.id)
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log("id of task", id)
    
}

//adding the card format
const createTaskCard = ({title, date, description, id}) => {
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

    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const newID = tasks.length -1

    deleteBtn.setAttribute('data-task', id)

    deleteBtn.addEventListener('click', removeElement);

    taskName.innerText = "Task Title: " + title;
    taskDate.innerText = "Task Due Date: "
    taskDateInput.innerText = date;
    taskDesc.innerText = "Task Description: " + description;
    deleteBtn.innerText = "Delete Task"

    taskDiv.append(taskName, taskDate, taskDateInput, taskDesc, deleteBtn);
    taskContainer.append(taskDiv);
};

tasks.forEach(createTaskCard);


//putting the form input on the card when form is submitted
submitModalBtn.on('click', (event) => {
    event.preventDefault();
    tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const id = tasks.length
    // console.log('the task was submitted')
    const newTask = addTask(
        titleInput.val(),
        dateInput.val(),
        descriptionInput.val(),
        id,
    );
    
    $('#formModal').modal('hide');

    createTaskCard(newTask);
});

//drag and drop functionality
$(document).ready(function () {
    $('.task-card').draggable();
    $('.swim-droppable').droppable({
        accept: '.draggable',
    });

    console.log("DOM Loaded");
});

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
        const taskDateInput = draggable.querySelector('#taskDateInput').textContent;
        const parsedUserDate = dayjs(taskDateInput);
        console.log("parsedUserDate = " + parsedUserDate);
        if (parsedUserDate.isBefore(dayjs(), 'day')) {
            draggable.classList.add('over-due');
        } else if (parsedUserDate.isSame(dayjs(), 'day') || parsedUserDate.isBefore(dayjs().add(2, 'day'), 'day')) {
            draggable.classList.add('due-soon');
        } else {
            draggable.classList.remove('over-due', 'due-soon');
        }
    });
};

dueDateColor();