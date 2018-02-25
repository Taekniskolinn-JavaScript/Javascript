"use strict";

function Quiz(question, answer, correct){
	var text = "";
	for (let i = 0; i < answer.length; i++){
		text += "<button onclick='NewQuiz()'>" + answer[i] + "</button> <br>";
	}
	this.question = question;
	this.answer = text;
	this.correct = correct;	
}

function NewQuiz(){
	var questionContent = document.getElementById("question");
	var buttonelem = document.getElementsByTagName("BUTTON");
	for (let i = 0; i < buttonelem.length; i++){ 
		if (buttonelem[i].textContent === q1.correct || buttonelem[i].textContent === q2.correct){
        	buttonelem[i].setAttribute("class", "green");
        }
        else{
        	buttonelem[i].setAttribute("class", "red");
        }
	}

	if (questionContent.textContent === q2.question){
		setTimeout(function(){
			document.getElementById("question").innerHTML = "";
			document.getElementById("answers").innerHTML = "";
		}, 3000);
	}
	else{
		setTimeout(function(){
			document.getElementById("question").innerHTML = q2.question;
			document.getElementById("answers").innerHTML = q2.answer;
		}, 3000);
	}

}

let q1 = new Quiz("How many seasons are in rupaul's drag race?", ["10", "11", "12", "13"], "13");
let q2 = new Quiz("Trixie Mattel is in All Stars 3",["True", "False"], "True");

document.getElementById("question").innerHTML = q1.question;
document.getElementById("answers").innerHTML = q1.answer;