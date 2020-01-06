var timer = 75;
var init = "";
var points = timer;


var highscores = [{
    name: init,
    score: points,
},]

var startBTN = document.getElementById("start");
var highScoresBTN = document.getElementById("navigate");
var nextBTN = document.getElementById("game-control");

// //Timer Function
//  var setTimer= function(){
//      // Add Timer to DOM
//     var countDown = setInterval(function() {
//         var time_dsply = document.getElementById("timer");
//         time_dsply.textContent = "";
//         time_dsply.textContent = timer +" seconds.";
//         timer--;

//         if(timer%15==0 && timer != 75){
//             //call next question function
//         }
       
//         if(timer == 0 ) {
//             console.log()
//             //display socer, prompt initals button for high scores
//           clearInterval(countDown);
//         }
    
//       }, 1000);
// }
// Next Button Function
var nextQuestion = function()
{
    event.preventDefault();
    console.log("next Question");

}

startBTN.addEventListener("click", function(event){
    event.preventDefault();

    // setTimer();

    var quest_dsply = document.getElementById("quest-area");
    var option_dsply = document.getElementById("option-area");
   
    
    quest_dsply.innerHTML="";
    option_dsply.innerHTML="";


    //ADD Questions to DOM
    var question = document.createElement("H3");
    question.textContent = questions[0].title;
    quest_dsply.appendChild(question);

    // Add Options to DOM
    var options = document.createElement("ol");
    for(var i=0; i<questions[0].options.length; i++){
        var option = document.createElement("input");
        option.setAttribute("type","button");
        option.setAttribute("value", questions[0].options[i]);
        //Add Function to options
        option.addEventListener('click', function(event){
            event.preventDefault();
            if(event.target.getAttribute("value") == questions[0].answer){
                nextQuestion();
            }
            else if(event.target.getAttribute("value") != questions[0].answer){
                //    timer- 15;
                //    setTimer();
                   nextQuestion();
                }
        })
        options.appendChild(option);
    }
    option_dsply.appendChild(options);

    // Add Next button to DOM
    var nextBTN_dsply = document.getElementById("game-control");
    var nextBTN = document.createElement("input");
    nextBTN.setAttribute("type", "button");
    nextBTN.setAttribute("value", "Next");
    nextBTN_dsply.appendChild(nextBTN);
    // Function to Next Button
    nextBTN.addEventListener('click', nextQuestion(event));
});


highScoresBTN.addEventListener("click", function(event){
    event.preventDefault();
    
});
