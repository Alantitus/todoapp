
document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    loadTasks();

    addTaskBtn.addEventListener("click", function() {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = "";
            saveTasks();
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        const taskLabel = document.createElement("span");
        taskLabel.textContent = taskText;
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", function() {
            taskItem.remove();
            saveTasks();
        });
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
    }

    function saveTasks() {
        const tasks = [];
        const taskItems = taskList.querySelectorAll(".taskItem");
        taskItems.forEach(function(taskItem) {
            tasks.push({
                text: taskItem.querySelector("span").textContent,
                completed: taskItem.querySelector("input[type=checkbox]").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function(task) {
            addTask(task.text);
            const taskItem = taskList.lastChild;
            taskItem.querySelector("input[type=checkbox]").checked = task.completed;
        });
    }
});
