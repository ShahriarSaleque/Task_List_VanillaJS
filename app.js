//Define the UI variables
const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");

//Load all event handlers
loadEventHandler();

//exec event handler
function loadEventHandler() {
  //Load all tasks from LS
  document.addEventListener("DOMContentLoaded", getAllTasks);
  //Add task event
  form.addEventListener("submit", addTask);
  //delete item
  taskList.addEventListener("click", removeTask);
  //clear item
  clearBtn.addEventListener("click", clearTasks);
  //filer tasks
  filter.addEventListener("keyup", filterTasks);
}

//Get all Tasks and display in DOM
function getAllTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(task => {
      //create an li
      const li = document.createElement("li");
      li.className = "collection-item";

      //append an create a text node for li
      li.appendChild(document.createTextNode(task));

      //create an a tag
      const link = document.createElement("a");
      link.className = "delete-item secondary-content";
      link.setAttribute("href", "#");

      //Add font awesome cross icon to a tag
      link.innerHTML = '<i class="fa fa-remove"></i>';

      //append link to li
      li.appendChild(link);

      //append li to ul
      taskList.appendChild(li);
    });
  }
}

//Load add task
function addTask(e) {
  let task = taskInput.value;

  if (task === "") {
    alert("Enter Something!!!");
  } else {
    //create an li
    const li = document.createElement("li");
    li.className = "collection-item";

    //append an create a text node for li
    li.appendChild(document.createTextNode(task));

    //create an a tag
    const link = document.createElement("a");
    link.className = "delete-item secondary-content";
    link.setAttribute("href", "#");

    //Add font awesome cross icon to a tag
    link.innerHTML = '<i class="fa fa-remove"></i>';

    //append link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li);

    //Store in localStorage
    storeTasksinLS(taskInput.value);

    //clear the input at end
    taskInput.value = "";
  }

  e.preventDefault();
}

//Add task to local Storage
function storeTasksinLS(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  //Add new task to the tasks array
  tasks.push(task);

  //Set new array back to LS
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove a task
function removeTask(e) {
  //Event delegation to choose child element from parent node
  if (e.target.classList.contains("fa-remove")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      //Remove task from LS
      removetaskfromLS(e.target.parentElement.parentElement.textContent);
    }
  }
}

//Remove task from LS
function removetaskfromLS(taskRemoved) {
  //Bring all items from localStorage
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach((task, index) => {
      if (task === taskRemoved) {
        tasks.splice(index, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });
  }
}

//Clear all tasks
function clearTasks() {
  //Loop thorugh each child element and remove until firstChild value becomes zero
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  //clear from LS
  clearfromLS();
}

function clearfromLS() {
  localStorage.clear();
}

//Filter tasks
function filterTasks(e) {
  let text = e.target.value;
  let allItems = document.querySelectorAll(".collection-item");
  allItems.forEach(item => {
    if (item.textContent.toLowerCase().indexOf(text) != -1) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}
