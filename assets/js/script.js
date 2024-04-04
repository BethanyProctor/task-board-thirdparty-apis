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
const tasks = [];

//basic modal functionality
addTaskBtn.on('click', () => $('#formModal').modal('show'))
closeModalBtn.on('click', () => $('#formModal').modal('hide'))

//pushing new tasks to the array
const addTask = (title, date, description) => {
    tasks.push({
        title,
        date,
        description,
    });
    return {title, date, description};
}

const createTaskCard = ({title, date, description}) => {
    const taskDiv = document.createElement('div');
    const taskName = document.createElement('h3');
    const taskDate = document.createElement('p');
    const taskDesc = document.createElement('p');

    taskName.innerText = "Task Title: " + title;
    taskDate.innerText = "Task Due Date: " + date;
    taskDesc.innerText = "Task Description: " + description;

    taskDiv.append(taskName, taskDate, taskDesc);
    taskContainer.append(taskDiv);
}

tasks.forEach(createTaskCard)

//putting the form input on the card when form is submitted
submitModalBtn.addEventListener('click', () => {
    const newTask = addTask(
        titleInput.value,
        dateInput.value,
        descriptionInput.value,
    );
    
    createTaskCard(newTask)

    //clear the input every time
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = ""
})




// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card


// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
   
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

});
