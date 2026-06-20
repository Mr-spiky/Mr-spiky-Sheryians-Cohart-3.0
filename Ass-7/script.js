// ==============================
// DOM Elements
// ==============================
var themeBtn      = document.querySelector("#themeBtn");
var icon          = document.querySelector("#icon");

var taskInput     = document.querySelector(".task-input");
var categorySelect = document.querySelector("#categorySelect");
var addBtn        = document.querySelector(".btn-add");

var emptyState    = document.querySelector(".empty-state");
var taskList      = document.querySelector(".task-list");

var totalEl       = document.querySelector("#totalTasks");
var completedEl   = document.querySelector("#completedTasks");
var pendingEl     = document.querySelector("#pendingTasks");
var progressFill  = document.querySelector("#progressFill");
var progressPct   = document.querySelector("#progressPercent");

var clearBtn      = document.querySelector(".btn-clear");
var filterTabs    = document.querySelector(".filter-tabs");
var allTabs       = document.querySelectorAll(".tab");

// ==============================
// State
// ==============================
var taskArr    = [];
var editId     = null;
var filter     = "all";   // "all" | "completed" | "pending"


// ==============================
// Theme Toggle
// ==============================
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (icon.classList.contains("fa-moon")) {
    icon.classList.replace("fa-moon", "fa-sun");
  } else {
    icon.classList.replace("fa-sun", "fa-moon");
  }
});


// ==============================
// Update Stats + Progress Bar
// ==============================
function updateStats() {
  var total     = taskArr.length;
  var done      = taskArr.filter(function (t) { return t.completed; }).length;
  var pending   = total - done;
  var pct       = total === 0 ? 0 : Math.round((done / total) * 100);

  totalEl.textContent     = total;
  completedEl.textContent = done;
  pendingEl.textContent   = pending;

  progressFill.style.width = pct + "%";
  progressPct.textContent  = pct + "%";
}


// ==============================
// Category badge class helper
// ==============================
function getBadgeClass(cat) {
  if (cat === "work")     return "badge-work";
  if (cat === "personal") return "badge-personal";
  if (cat === "urgent")   return "badge-urgent";
  return "badge-work";
}

function getCatClass(cat) {
  return "cat-" + cat;
}


// ==============================
// Build a Task Card (DOM method)
// ==============================
function makeCard(task) {
  // outer card
  var card = document.createElement("div");
  card.classList.add("task-card", getCatClass(task.category));
  card.dataset.id = task.id;
  if (task.completed) card.classList.add("is-done");

  // --- info side ---
  var info = document.createElement("div");
  info.classList.add("task-info");

  var title = document.createElement("p");
  title.classList.add("task-title");
  if (task.completed) title.classList.add("completed");
  title.textContent = task.task;

  var badge = document.createElement("span");
  badge.classList.add("category-badge", getBadgeClass(task.category));
  badge.textContent = task.category;

  info.appendChild(title);
  info.appendChild(badge);

  // --- actions side ---
  var actions = document.createElement("div");
  actions.classList.add("task-actions");

  var doneBtn = document.createElement("button");
  doneBtn.classList.add("task-btn", "complete-btn");
  if (task.completed) doneBtn.classList.add("done");
  doneBtn.title = task.completed ? "Mark Incomplete" : "Mark Complete";
  doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';

  var editBtn = document.createElement("button");
  editBtn.classList.add("task-btn", "edit-btn");
  editBtn.title = "Edit Task";
  editBtn.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
  if (task.completed) editBtn.disabled = true;

  var delBtn = document.createElement("button");
  delBtn.classList.add("task-btn", "delete-btn");
  delBtn.title = "Delete Task";
  delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';

  actions.appendChild(doneBtn);
  actions.appendChild(editBtn);
  actions.appendChild(delBtn);

  card.appendChild(info);
  card.appendChild(actions);

  return card;
}


// ==============================
// Render Tasks
// ==============================
function render() {
  taskList.innerHTML = "";
  updateStats();

  // filter which tasks to show
  var list = taskArr;
  if (filter === "completed") {
    list = taskArr.filter(function (t) { return t.completed; });
  } else if (filter === "pending") {
    list = taskArr.filter(function (t) { return !t.completed; });
  }

  // show/hide empty illustration
  if (taskArr.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  if (list.length === 0) {
    // filtered result is empty but tasks exist — show small notice
    var notice = document.createElement("p");
    notice.style.cssText = "text-align:center;color:var(--text-muted);padding:2rem;font-size:0.9rem;";
    notice.textContent = "No tasks in this category.";
    taskList.appendChild(notice);
    return;
  }

  list.forEach(function (task) {
    taskList.appendChild(makeCard(task));
  });
}


// ==============================
// Add / Update Task
// ==============================
function handleAdd() {
  var value    = taskInput.value.trim();
  var category = categorySelect.value;

  // updating existing task
  if (editId !== null) {
    if (!value) return;

    var found = taskArr.find(function (t) { return t.id === editId; });
    found.task     = value;
    found.category = category;

    editId = null;
    addBtn.textContent = "Add";
    taskInput.value = "";
    render();
    return;
  }

  // adding new task
  if (!value) {
    taskInput.focus();
    return;
  }

  taskArr.push({
    id: Date.now(),
    task: value,
    category: category,
    completed: false
  });

  taskInput.value = "";
  taskInput.focus();
  render();
}

addBtn.addEventListener("click", handleAdd);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") handleAdd();
});


// ==============================
// Task Actions (delegation)
// ==============================
taskList.addEventListener("click", function (e) {
  var card = e.target.closest(".task-card");
  if (!card) return;

  var id   = Number(card.dataset.id);
  var task = taskArr.find(function (t) { return t.id === id; });

  if (e.target.closest(".delete-btn")) {
    taskArr = taskArr.filter(function (t) { return t.id !== id; });
    render();
    return;
  }

  if (e.target.closest(".edit-btn") && !e.target.closest(".edit-btn").disabled) {
    taskInput.value      = task.task;
    categorySelect.value = task.category;
    editId               = id;
    addBtn.textContent   = "Update";
    taskInput.focus();
    return;
  }

  if (e.target.closest(".complete-btn")) {
    task.completed = !task.completed;
    render();
    return;
  }
});


// ==============================
// Clear Completed
// ==============================
clearBtn.addEventListener("click", function () {
  taskArr = taskArr.filter(function (t) { return !t.completed; });
  render();
});


// ==============================
// Filter Tabs
// ==============================
filterTabs.addEventListener("click", function (e) {
  var tab = e.target.closest(".tab");
  if (!tab) return;

  allTabs.forEach(function (t) { t.classList.remove("active"); });
  tab.classList.add("active");

  if (tab.id === "all-btn")       filter = "all";
  else if (tab.id === "completed-btn") filter = "completed";
  else if (tab.id === "pending-btn")   filter = "pending";

  render();
});


// ==============================
// Initial call
// ==============================
render();
