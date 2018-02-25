"use strict";

var quizID = document.createElement("div");
quizID.setAttribute("id", "quiz");


var quizCont = document.createElement("div");
quizCont.setAttribute("id", "question");
var question = document.createTextNode("Spurning 1");
quizCont.appendChild(question);


var quizAns = document.createElement("div");
quizAns.setAttribute("id", "answers");


quizID.appendChild(quizCont);
quizID.appendChild(quizAns);


var choice1 = document.createElement("div");
choice1.setAttribute("class", "answer")
choice1.setAttribute("data-active", "answer")
var ans1 = document.createTextNode("Svarmöguleiki 1");
choice1.appendChild(ans1);
quizAns.appendChild(choice1);


var choice2 = document.createElement("div");
choice2.setAttribute("class", "answer")
choice2.setAttribute("data-active", "answer")
var ans2 = document.createTextNode("Svarmöguleiki 2");
choice2.appendChild(ans2);
quizAns.appendChild(choice2);


document.getElementsByTagName("BODY")[0].appendChild(quizID);