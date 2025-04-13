

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("h1#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});

function animatePress(currentColour) {
  $(".btn#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $(".btn#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(colorName) {
  let soundEffect = new Audio("sounds/" + colorName + ".mp3");
  soundEffect.play();

}

function nextSequence () {
  userClickedPattern = [];
  level++;
  $("h1#level-title").text("Level " + level);

  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if(userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);  
    }

  } else {
    console.log("wrong");
  }
}


