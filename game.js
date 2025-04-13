

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;

$(document).keypress(function() {
  if (!started) {
    $("h1#level-title").text("Level " + level);
    started = true;
    console.log("Game Start");
    nextSequence();
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
    if(userClickedPattern.length === gamePattern.length) {
      console.log("level " + (currentLevel + 1) + " success");
      setTimeout(function() {
        nextSequence();
      }, 1000);  
    }

  } else {
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("h1#level-title").text("Game Over, Press Any Key to Restart");
    
    console.log("Game Over");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
