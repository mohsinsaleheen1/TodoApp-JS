let emptyAlert = document.getElementById("alert");
let inputText = document.getElementById("intxt");
let todoList = document.getElementById("todoList");
let btnClose = document.getElementById("btnclose");
let deleteaAll = document.getElementById("deleteall");
let todoListValue = [];
// -----------------Alerts-for-Empty-Input---------------------------
btnClose.addEventListener("click", () => {
  emptyAlert.classList.add("d-none");
  inputText.disabled = false;
});
// ---------------------Set-TodoItem-For-LocalStorage----------------
const addTodoListLocalStorage = (todo) => {
  return localStorage.setItem("TodoItem", JSON.stringify(todo));
};
// ---------------------Get-TodoItem-For-LocalStorage----------------
const getTodoListFromLS = () => {
  return JSON.parse(localStorage.getItem("TodoItem")) || [];
};
// -------------------ShowTodoList Function--------------------------
function showTodoList() {
  todoListValue = getTodoListFromLS();
  // ------------------Add-TodoList-In-localStorage------------------
  todoListValue.forEach((curtodo) => {
    let liElement = document.createElement("li");
    liElement.setAttribute(
      "class",
      "d-flex justify-content-center align-items-baseline"
    );
    let pElement = document.createElement("p");
    liElement.append(pElement);
    pElement.setAttribute("class", "text-light");
    pElement.innerHTML = curtodo;
    // -----------------Update-Button--------------------------------
    let UpdateBtn = document.createElement("button");
    UpdateBtn.setAttribute("class", "todobtn");
    UpdateBtn.setAttribute("onclick", "updateliBtn(this)");
    let faUbtn = document.createElement("i");
    faUbtn.setAttribute("class", "fa-solid fa-pen-to-square");
    UpdateBtn.append(faUbtn);
    liElement.append(UpdateBtn);
    // ------------------Delete-Button-------------------------------
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "todobtn dbtn");
    deleteBtn.setAttribute("onclick", "deleteliBtn(this)");
    let faDbtn = document.createElement("i");
    faDbtn.setAttribute("class", "fa-solid fa-trash-can");
    deleteBtn.append(faDbtn);
    liElement.append(deleteBtn);
    todoList.append(liElement);
  });
}
// -----------------Add-Todo-List-in-DOM------------------------------
showTodoList();
function addTodo() {
  if (inputText.value === "") {
    let audio = new Audio("error.mp3");
    audio.play();
    emptyAlert.classList.remove("d-none");
    emptyAlert.classList.add("d-block");
    inputText.disabled = true;
  } else {
    todoListValue.push(inputText.value);
    todoListValue = [...new Set(todoListValue)];
    addTodoListLocalStorage(todoListValue);
    todoListValue = getTodoListFromLS();
    let liElement = document.createElement("li");
    liElement.setAttribute(
      "class",
      "d-flex justify-content-center align-items-baseline"
    );
    let pElement = document.createElement("p");
    liElement.append(pElement);
    pElement.setAttribute("class", "text-light");
    pElement.innerHTML = inputText.value;
    // -----------------Update-Button---------------------------------
    let UpdateBtn = document.createElement("button");
    UpdateBtn.setAttribute("class", "todobtn");
    let faUbtn = document.createElement("i");
    UpdateBtn.setAttribute("onclick", "updateliBtn(this)");
    faUbtn.setAttribute("class", "fa-solid fa-pen-to-square");
    UpdateBtn.append(faUbtn);
    liElement.append(UpdateBtn);
    // ------------------Delete-Button--------------------------------
    let deleteBtn = document.createElement("button");
    deleteBtn.setAttribute("class", "todobtn");
    deleteBtn.setAttribute("onclick", "deleteliBtn(this)");
    let faDbtn = document.createElement("i");
    faDbtn.setAttribute("class", "fa-solid fa-trash-can");
    deleteBtn.append(faDbtn);
    liElement.append(deleteBtn);
    todoList.append(liElement);
    inputText.value = "";
  }
}
// ---------------------------Remove-Todo-Item------------------------
const removetodolist = (e) => {
  const itemToRemove = e.parentNode.querySelector("p").innerText;
  todoListValue = todoListValue.filter((todo) => todo !== itemToRemove);
  addTodoListLocalStorage(todoListValue);
  e.parentNode.remove();
};
const deleteliBtn = (e) => {
  removetodolist(e);
};
// -----------------------------Update-Todo-Item----------------------
const updatetodolist = (e) => {
  let itemupdate = e.parentNode.querySelector("p").innerHTML;
  let updateTodo = prompt("Enter Update Your Task", itemupdate);
  const oldTodo = e.parentNode.querySelector("p").innerHTML;
  const index = todoListValue.indexOf(oldTodo);
  if (index !== -1) {
    e.parentNode.querySelector("p").innerHTML = updateTodo;
    todoListValue[index] = updateTodo;
    console.log("Update Todo List value " + todoListValue);
    addTodoListLocalStorage(todoListValue);
  } else {
    console.log("old Todo not found in ");
  }
};
const updateliBtn = (e) => {
  updatetodolist(e);
};
// -----------------DeleteAll Todos----------------------------------
deleteaAll.addEventListener("click", () => {
  localStorage.clear();
  todoList.innerHTML = "";
});
