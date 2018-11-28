const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// function filterFn(toDo) {
//   return toDo.id === 1;
// }
let toDos = [];

function deleteToDo(event) {
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  // filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만듦
  const cleanTodos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanTodos;
  saveToDos();
  //   console.log(cleanTodos);
}

function saveToDos() {
  // localStorage에는 js의 data를 저장할 수가 없음. 오직 string만
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerText = "✖";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = { text: text, id: newId };
  //toDos안에 집어넣은 이후 호출해야함 저장할게 없어서 빈상태 호출이 됨.

  toDos.push(toDoObj);
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // string을 object로 변환
    const parseTodos = JSON.parse(loadedToDos);
    // array에 담겨 있는 것들 각각에 한번씩 함수를 실행해주는 것.
    parseTodos.forEach(function(toDo) {
      paintToDo(toDo.text);
    });
  } else {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}
init();
