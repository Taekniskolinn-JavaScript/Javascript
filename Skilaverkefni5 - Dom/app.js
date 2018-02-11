"use strict"; 
function Quiz(question, answer){
	var text = "";
	for (let i = 0; i < answer.length; i++){
		text += answer[i] + "<br>";
	}
	this.question = question;
	this.answer = text
}

let q1 = new Quiz("How many seasons are in rupaul's drag race?", ["10", "11", "12", "13"]);
let q2 = new Quiz("Trixie Mattel is in All Stars 3",["True", "False"]);


document.getElementById("question").innerHTML = q1.question;
document.getElementById("answers").innerHTML = q1.answer;