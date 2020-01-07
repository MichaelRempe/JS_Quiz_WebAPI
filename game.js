var timer = 75;
var init = "test";
var points = timer;
var done = false;

window.localStorage.setItem("highscore", JSON.stringify(highscores));
var highscores = [{
    name: init,
    score: points,
},]
// Inital/Functional Buttons
var startBTN = document.getElementById("start");
var highScoresBTN = document.getElementById("navigate");
var nextBTN = document.getElementById("game-control");

// Changable output areas
var quest_dsply = document.getElementById("quest-area");
var option_dsply = document.getElementById("option-area");
var time_dsply = document.getElementById("timer");
var nextBTN_dsply = document.getElementById("game-control");

//Timer Function
var setTimer = function () {
    // Add Timer to DOM
    var countDown = setInterval(function () {
        time_dsply.textContent = "";
        time_dsply.textContent = timer + " seconds.";
        timer--;

        // logic if timer hits 0
        if (timer == 0 || done == true) {
            clearInterval(countDown);
            quest_dsply.textContent = "";
            option_dsply.innerHTML = "";
            time_dsply.textContent = "";
            nextBTN_dsply.textContent = "";

            time_dsply.textContent = "Your Score: " + points;
            var initSUB = document.createElement("input");
            initSUB.setAttribute("type", "text");
            initSUB.setAttribute("id", "name");
            var subBTN = document.createElement("input");
            subBTN.setAttribute("type", "submit");
            subBTN.addEventListener('click', function () {
                var initals = document.getElementById("name").nodeValue;
                init = initals;
            })
            console.log(init);
            option_dsply.appendChild(initSUB);
            option_dsply.appendChild(subBTN);
        }

    }, 1000);
}
// Next Button Function

startBTN.addEventListener("click", function (event) {
    event.preventDefault();
    // start by setting game timmer
    setTimer();

    quest_dsply.innerHTML = "";
    option_dsply.innerHTML = "";

    // Next we loop to add Questions

    //ADD Questions to DOM
    var question = document.createElement("H3");
    // for(var index=0; index<questions.length;){
    question.textContent = questions[0].title;
    quest_dsply.appendChild(question);

    // Add Options to DOM
    var options = document.createElement("ol");
    //loop through questions

    //loop through options
    for (var i = 0; i < questions[0].options.length; i++) {
        var option = document.createElement("input");
        option.setAttribute("type", "button");
        option.setAttribute("value", questions[0].options[i]);
        option.setAttribute("class", "btn3");
        //Add Function to options
        option.addEventListener('click', function (event) {
            event.preventDefault();
            if (event.target.getAttribute("value") == questions[0].answer) {
                console.log("correct!");
            }
            else if (event.target.getAttribute("value") != questions[0].answer) {
                console.log("incorrect!")
                //take 15 seconds off timer
            }
        })
        options.appendChild(option);
    }
    option_dsply.appendChild(options);

    // Add Next button to DOM
    var nextBTN = document.createElement("input");
    nextBTN.setAttribute("type", "button");
    nextBTN.setAttribute("value", "Next");
    nextBTN.setAttribute("class", "btn2");
    nextBTN_dsply.appendChild(nextBTN);
    // Function to Next Button
    nextBTN.addEventListener('click', function (event) {
        event.preventDefault();
        // index++;
    });
    // }
    //is loop done? if yes set boolean to true which calls timer function to reset display to end game
});


highScoresBTN.addEventListener("click", function (event) {
    event.preventDefault();

    //set all containers to display nothing
    quest_dsply.textContent = "";
    option_dsply.innerHTML = "";
    time_dsply.textContent = "";
    nextBTN_dsply.textContent = "";

    highscores = JSON.parse(window.localStorage.getItem(highscores));
    option_dsply.textContent = highscores.name + " " + highscores.score;
});
