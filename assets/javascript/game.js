
$(document).ready(function(){

	var audioC = new Audio("assets/sounds/fantastic.mp3");
	var audioW = new Audio("assets/sounds/wrong.mp3");


	var questions = {
		q1: {
			question: "What was the first electronic computer called?",
			answers: {
				answer1: ["ACORN Computer", 0],
				answer2: ["ENIAC", 1],
				answer3: ["ABC 20", 0],
				answer4: ["Apple", 0]
			}
		},
		q2: {
			question: "Which of the following is not a gas?",
			answers: {
				answer1: ["Nitrogen", 0],
				answer2: ["Oxygen", 0],
				answer3: ["Helium", 0],
				answer4: ["Mercury", 1]
			}
		},
		q3: {
			question: "What is the length of day of Jupiter?",
			answers: {
				answer1: ["6 hours", 0],
				answer2: ["11.317 hours", 0],
				answer3: ["9.9259 hours", 1],
				answer4: ["14 hours", 0]
			}
		},
		q4: {
			question: "What do crocodiles lack?",
			answers: {
				answer1: ["Eyes", 0],
				answer2: ["Sweat glands", 1],
				answer3: ["Skin", 0],
				answer4: ["Teeth", 0]
			}
		},
		q5: {
			question: "How far can a lion leap?",
			answers: {
				answer1: ["12 feet", 0],
				answer2: ["14 feet", 0],
				answer3: ["24 feet", 0],
				answer4: ["36 feet", 1]
			}
		}
	};

	var intervalId;
	var time = 10; 
	var questionsById = new Array;
	var correct = 0;
	var incorrect = 0;
	var disable = 1;

	function end(){
		$("#start-button").show();
		$("#question").html("View Your Results");
		$("#answer1").html("You Got " + correct+ " Answers Right!");
		$("#answer2").html("You Got " + incorrect+ " Answers Wrong..");
		$("#answer3").empty();
		$("#answer4").empty();
		$("#timer").empty();
		
	}


	function newQestion(){
		var rand = Math.floor((Math.random() * questionsById.length));
		var removed = questionsById.splice(rand,1);
		intervalId = setInterval(active,1000);
		disable = 1;
		//console.log(removed);
		$("#timer").text("Time Remaining: " + time);
		$("#question").html(eval("questions."+removed+".question"));
		$("#answer1").html(eval("questions."+removed+".answers.answer1[0]"));
		$("#answer1").attr("data-qid", removed);
		$("#answer2").html(eval("questions."+removed+".answers.answer2[0]"));
		$("#answer2").attr("data-qid", removed);
		$("#answer3").html(eval("questions."+removed+".answers.answer3[0]"));
		$("#answer3").attr("data-qid", removed);
		$("#answer4").html(eval("questions."+removed+".answers.answer4[0]"));
		$("#answer4").attr("data-qid", removed);
	}
	
	$("#start").on("click", run);
	$("#answer1").on("click", checkAnswer);
	$("#answer2").on("click", checkAnswer);
	$("#answer3").on("click", checkAnswer);
	$("#answer4").on("click", checkAnswer);

	function checkAnswer(){
		if(disable){
			disable = 0;
			var check = ($(this).attr("id"));
			console.log(eval("questions." + $(this).attr("data-qid") + ".answers." + check + "[1]"));
			if(eval("questions." + $(this).attr("data-qid") + ".answers." + check + "[1]") === 1){
				$("#question").html("You are Correct!");
				correct++;
				audioC.play();
				clearInterval(intervalId);
				setTimeout(function(){
					if(questionsById.length === 0){
						console.log("end");
						clearInterval(intervalId);
						end();
					}else{
					time = 10;	
					newQestion();
					}
				}, 5000);
			}else{
				$("#question").html("Wrong!");
				incorrect++;
				audioW.play();
				clearInterval(intervalId);
				setTimeout(function(){
					if(questionsById.length === 0){
						console.log("end");
						clearInterval(intervalId);
						end();
					}else{
					time = 10;	
					newQestion();
					}
				}, 5000);
		}	}
		
	}
	function run(){
		correct = 0;
		incorrect = 0;
		
		
		for(i=1; i<Object.keys(questions).length+1; i++){
			
			var id = ("q"+i);
			console.log(id);
			questionsById.push(id);
		}

		$("#start-button").hide();
		newQestion();
		
	}

	function active(){
		
		time--;
		$("#timer").text("Time Remaining: " + time);
		
		
		if(questionsById.length === 0 && time === 0){
			incorrect++;
			audioW.play();
			end();
			stop();
		}else if(time === 0){
			
			stop();
			time = 10;
			incorrect++;
			audioW.play();
			newQestion();
		}

	

	function stop(){
		clearInterval(intervalId);
		console.log("trying to stop");
	}	
	
	
	console.log(Object.keys(questions).length);
	console.log(questionsById);
	}
})