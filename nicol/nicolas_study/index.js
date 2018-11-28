const title= document.querySelector("#title");

const CLICKED_CLASS = "clicked";

function handleClick() {
	title.classList.toggle(CLICKED_CLASS);
	// const hasClass = title.classList.contains(CLICKED_CLASS);
	// const currentClass = title.className;
	// if (hasClass) {	
	// 	title.classList.remove(CLICKED_CLASS);
		
	// 	// title.className = CLICKED_CLASS;
	// } else {
	// 	title.classList.add(CLICKED_CLASS);
	// 	// title.className = "";
	// }
}

function init() {
	// title.style.color=BASE_COLOR;
	title.addEventListener("click", handleClick);
}
init();

// const BASE_COLOR = "rgb(52, 73, 94)";
// const OTHER_COLOR = "#7f8c8d";
// title.innerHTML="Hi! From JS";
// title.style.color = "red";
// document.title = " I own you now";
// console.dir(document);

// function handleClick() {
// 	const currentColor = title.style.color;
// 	if (currentColor === BASE_COLOR){
// 		title.style.color = OTHER_COLOR;
// 	} else {
// 		title.style.color = BASE_COLOR;
// 	}

// 	// console.log(currentColor);
// 	// console.log(title.style.color="red");
// 	// console.log();
// 	// console.log("I have been resized")
// }



// function handleOffline() {
// 	console.log("bye bye");
// }

// function handleOnline() {
// 	console.log("Welcome back");
// }
// window.addEventListener("offline",handleOffline);
// window.addEventListener("oneline",handleOnline);



//const age = prompt("How old are you");
// console.log(age);

// if(age >= 18 && age <=21) {
// 	console.log("you can drink but should not");
// } else if(age > 21){
// 	console.log("go ahead")
// } else {
// 	console.log("too young");
// }
// if(20 > 5 || "nicolas"==="nicolas"){
// 	console.log("yes");
// }else {
// 	console.log("no");
// }
