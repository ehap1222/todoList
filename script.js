let input =document.querySelector('.input');
let submit =document.querySelector('.add');
let taskDiv =document.querySelector('.tasks');

// Empty Array To Store The Tasks
let arrayOfTasks = [];
// Check If Theres Tasks In Local Storage
if(localStorage.getItem("tasks")){
    arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
}
// Trigger Get Data From Local Storage
getDataFromLocalStorage();

// Add Task
submit.onclick = function(){
    if(input.value !==""){
        addTaskToArray(input.value);
        input.value="";
    }
}

// Click On Task Element
taskDiv.addEventListener("click",(e)=>{
    // Delete Button
    if(e.target.classList.contains("del")){
        // Remove Task From Local Storage
        deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
        // Remove Element From Page
        e.target.parentElement.remove();
    }
    // Task Element
    if(e.target.classList.contains("task")){
        // Toggle Completed For The Task
        toggleStatusTaskWith(e.target.getAttribute("data-id"));
        // Toggle Done Class
        e.target.classList.toggle("done");
    }
})

function addTaskToArray(taskText){
    const task = {
        id:Date.now(),
        title:taskText,
        compeleted:false
    };
    // push tasks to arrayoftasks
    arrayOfTasks.push(task);
    // Add Tasks To page
    addElementTaskToPageFrom(arrayOfTasks);
    // Add Tasks To Local Storage
    addDataToLoalStorageFrom(arrayOfTasks);
}

function addElementTaskToPageFrom(){
    // Empty task div
    taskDiv.innerHTML = "";
    // Looping On Array Of Tasks
    arrayOfTasks.forEach((task)=>{
        // create main div
        let div = document.createElement("div");
        div.className ="task";
        // check if task done
        if(task.compeleted){
        div.className ="task done";
        }
        div.setAttribute("data-id",task.id);
        div.appendChild(document.createTextNode(task.title));
        // create delete button
        let span =document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("Delete"));
        // append button to main div
        div.appendChild(span);
        // Add Task Div To Task Container
        taskDiv.appendChild(div);
    })

}

function addDataToLoalStorageFrom(arrayOfTasks){
    window.localStorage.setItem("tasks",JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let tasks = JSON.parse(data);
        addElementTaskToPageFrom(tasks)
    }
}

function deleteTaskWith(taskId){
    arrayOfTasks = arrayOfTasks.filter((task => task.id !=taskId));
    addDataToLoalStorageFrom(arrayOfTasks)
}

function toggleStatusTaskWith(taskId){
    for(let i = 0 ; i < arrayOfTasks.length; i++){
        if(arrayOfTasks[i].id == taskId){
            arrayOfTasks[i].compeleted == false ? arrayOfTasks[i].compeleted == true :arrayOfTasks[i].compeleted == false;
        }
    }
    addDataToLoalStorageFrom(arrayOfTasks)

}