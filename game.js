// Global Variables
var timer = 75; // Inital Start time
var init = "";  // Initals of current user
var points = timer; // Points are dirrectly tied to time
var current = 0;    // Current question itteration

//gloab object storing highest scoreing user
var highscores = {
    name: "none",
    score: 0,
}
// i need this object to be gloab to interact withit throughout script, initially adding it then overwirtes it on page reload pls doc me points for sucking at coding and be lzy and not fixing it or spelling lazy right a few words ago (its 2 am im going to bed)
window.localStorage.setItem("currentHighScore", JSON.stringify(highscores));

// Inital/Functional Buttons
var startBTN = document.getElementById("start");
var highScoresBTN = document.getElementById("navigate");

// Changable output areas
var quest_dsply = document.getElementById("quest-area");
var option_dsply = document.getElementById("option-area");
var time_dsply = document.getElementById("timer");

highScoresBTN.addEventListener("click", function displayHighScore(event){
    event.preventDefault();

    //set all containers to display nothing
    quest_dsply.innerHTML = "";
    option_dsply.innerHTML = "";
    time_dsply.textContent = "";
    //Set Time to highscore title
    time_dsply.textContent = "HighScore";

    //Get locally stored score
    var scoreSheet = JSON.parse(localStorage.getItem("currentHighScore"));
    var name = scoreSheet.name;
    var score = scoreSheet.score;
    
    //Add highscore to page
    quest_dsply.innerHTML = "<h4> Name: "+name+"</h4>"+"<h4> Score: "+score+"</h4>";
});

//Timer Function: Establishes Time and handles chage display at certain intervals/input
var setTimer = function () {
    var countDown = setInterval(function () {
        // set timer interval
        timer--;
        time_dsply.textContent = "";
        //display timer
        time_dsply.textContent = timer + " seconds.";

        // logic if timer hits 0 or we run out of questions:
        //clear timmer dispay and interval
        if (timer <= 0 || current >= 5) {
            clearInterval(countDown);
            quest_dsply.textContent = "";
            option_dsply.innerHTML = "";
            time_dsply.textContent = "";
            // points set to time last question is answered or 0 (if we ran out of time)
            points = timer;
            // Points occupy timer position on DOM
            time_dsply.textContent = "Your Score: " + points;
            quest_dsply.textContent = "Times Up! Please enter your initals to see if you beat the highscore";

            // Create input field to capture initials
            var initSUB = document.createElement("input");
            initSUB.setAttribute("type", "text");
            initSUB.setAttribute("id", "name");
            var subBTN = document.createElement("input");
            subBTN.setAttribute("type", "submit");
            subBTN.setAttribute("class", "btn");
            subBTN.addEventListener('click', function (event) {
                event.preventDefault();
                var initals = document.getElementById("name").value;
                //set player to highscore object
                highscores.name = initals;
                highscores.score = points;
                //if current highscore is greater than stored highscore overwrite it
                var current_highscore = JSON.parse(localStorage.getItem("currentHighScore"));
                if (points >= current_highscore.score) {
                    window.localStorage.setItem("currentHighScore", JSON.stringify(highscores));
                     var input = prompt("You have the current highscore! Play Again?")
                     if(input.toLowerCase === "yes"){
                         console.log(input);
                         startGame(event);
                        }
                }
                if(points <= current_highscore){
                    var input = prompt("You are short of the highscore by: "+current_highscore.score-points+"points. Play again?")
                    if(input.toLowerCase === "no"){
                        window.location.reload();
                    }
                }
            })
            // Create button to check highscores
            var checkScoresBTN = document.createElement("input");
            checkScoresBTN.setAttribute("type", "button");
            checkScoresBTN.setAttribute("value", "See Highscores");
            checkScoresBTN.setAttribute("class", "btn");
            checkScoresBTN.addEventListener("click", function(event){
                event.preventDefault();

                //set all containers to display nothing
                quest_dsply.textContent = "";
                option_dsply.innerHTML = "";
                time_dsply.textContent = "";
                //Set Time to highscore title
                time_dsply.textContent = "HighScore";
            
                //Get locally stored score
                var scoreSheet = JSON.parse(localStorage.getItem("currentHighScore"));
                var name = scoreSheet.name;
                var score = scoreSheet.score;
                
                quest_dsply.innerHTML = "<h4> Name: "+name+"</h4>"+"<h4> Score: "+score+"</h4>";
            });

            // Add Buttons to DOM
            option_dsply.appendChild(initSUB);
            option_dsply.appendChild(subBTN);
            option_dsply.appendChild(checkScoresBTN);
        }
    }, 1000);
}
function itterateQuestions(){
    option_dsply.innerHTML = "";
    var options = document.createElement("ol");
    options.setAttribute('class',"option-list");
    //loop through options of current question, create option buttons
    for (var i = 0; i < questions[current].options.length; i++) {
        // create list item
        var holder = document.createElement("li");
        // create and append button to list item
        var option = document.createElement("input");
        holder.appendChild(option);
        option.setAttribute("type", "button");
        option.setAttribute("value", questions[current].options[i]);
        option.setAttribute("class", "btn2");
        //Add function to options
        option.addEventListener('click', function (event) {
            event.preventDefault();
            // if correct option selcted iterate to next question
            if (event.target.getAttribute("value") == questions[current].answer) {
                current++;
                displayQuestion(event);
                console.log("correct!");
            }
            // if incoret option slected time penalty and iterate to next question
            else if (event.target.getAttribute("value") != questions[current].answer) {
                current++;
                displayQuestion(event);
                console.log("incorrect!")
                timer = timer -15;
                console.log(timer);
            }
        })
        options.appendChild(holder);
    }
    option_dsply.appendChild(options);
}
function displayQuestion(){
    //Clear out current display
    quest_dsply.innerHTML = "";
    //Add current Question to DOM
    var question = document.createElement("H3");
    question.textContent = questions[current].title;
    quest_dsply.appendChild(question);
    // Add current question's options to DOM via function call
    itterateQuestions();
}
startBTN.addEventListener("click", function startGame(event) {
    event.preventDefault();
    // start by setting game timmer
    setTimer();
    // Display questions + options
    displayQuestion();
});

highScoresBTN.addEventListener("click", function display_highscore(event) {
    event.preventDefault();

    //set all containers to display nothing
    quest_dsply.textContent = "";
    option_dsply.innerHTML = "";
    time_dsply.textContent = "";
    //Set Time to highscore title
    time_dsply.textContent = "HighScore";

    //Get locally stored score
    var scoreSheet = JSON.parse(localStorage.getItem("currentHighScore"));
    var name = scoreSheet.name;
    var score = scoreSheet.score;
    
    quest_dsply.innerHTML = "<h4> Name: "+name+"</h4>"+"<h4> Score: "+score+"</h4>";

    //add button to launch game from
});