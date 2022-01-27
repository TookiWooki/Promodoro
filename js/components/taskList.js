
//Selectors
const taskInput = document.querySelector('.task-input');
const taskButton = document.querySelector('.task-button');
const taskList = document.querySelector('.task-list-ul');
const currentTaskText = document.querySelector('.current-task--text');


//Event Listeners
taskButton.addEventListener('click', addTask);
taskList.addEventListener('click', taskMenuAction);

//Functions
function addTask(event) {
    //Prevent form from submitting
    event.preventDefault();
    //Task div creation
    const taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    //Complete button
    const taskIcon = document.createElement('div');
    taskIcon.innerHTML = '<i class="fas fa-badge-check"></i>';
    taskIcon.classList.add("task-list--task-badge");
    taskDiv.appendChild(taskIcon);
    //Create LI
    const newTask = document.createElement('li');
    newTask.innerText = taskInput.value;
    taskDiv.appendChild(newTask);
    //Complete button
    const taskCheck = document.createElement('div');
    taskCheck.innerHTML = '<i class="fas fa-check"> </i>';
    taskCheck.classList.add("task-list--task-check");
    taskDiv.appendChild(taskCheck);
    //Delete button
    const taskDelete = document.createElement('div');
    taskDelete.innerHTML = '<i class="fas fa-trash"> </i>';
    taskDelete.classList.add("task-list--task-delete");
    taskDiv.appendChild(taskDelete);
    //Append to UL list
    taskList.appendChild(taskDiv);
    //Clear Task Input after adding task
    taskInput.value = "";
    //Update current task above list
    const firstListItem = $('ul').each(function() {
        currentTaskText.innerHTML = $(this).find('li').eq(0).text();
        //Update text field if there are no current tasks after the user has entered tasks
        if(currentTaskText.innerHTML === "") {
            currentTaskText.innerHTML = "no current task";
            currentTaskText.classList.add('white50');
        } else {
            currentTaskText.classList.remove('white50');
        };
    })

}

function taskMenuAction(e){
    const item = e.target;
    //Delete task
    if(item.classList[0] === 'task-list--task-delete') {
       const task = item.parentElement;
       //Animation
       task.classList.add("delete-animation");
        task.addEventListener('transitionend', function(){
            task.remove();
            const firstListItem = $('ul').each(function() {
                currentTaskText.innerHTML = $(this).find('li').eq(0).text();
                    //Update text field if there are no current tasks after the user has entered tasks
                if(currentTaskText.innerHTML === "") {
                    currentTaskText.innerHTML = "You've done it!";
                    currentTaskText.classList.add('white50');
                } else {
                    currentTaskText.classList.remove('white50');
                };

           })
           //TODO:  this doesn't work
           const firstTask = $(this).find('li').eq(0).text();
           firstTask.classList.add('task-first');
           taskDiv.appendChild(firstTask);
        });
    }

    //Complete task
    if(item.classList[0] === 'task-list--task-check') {
        const task = item.parentElement;
        task.classList.toggle("completed");
     }
}