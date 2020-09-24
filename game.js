var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var gameStarted = false
var level = 0;
var topScore = 0;

$(document).keypress(function() {
  start();
});

$(".btn-start").click(function() {
  start();
})

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function start() {
  if (!gameStarted) {
    $('#level-title').text("Level " + level);
    nextSequence();
    gameStarted = true;
    $(".btn-start").hide();
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  } else {
    var wrong = new Audio("sounds/wrong.mp3");
    wrong.play();

    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over")
    }, 200)

    $('#level-title').text("Game Over, Press Any Key to Restart");
    $(".start-text").text("Restart");
    $(".btn-start").show();

    if ((gamePattern.length - 1) > topScore) {
      $("#level-title").text("New Highscore! Press Any Key to Restart");
      topScore = gamePattern.length - 1;
      $('#high-score').text("Highscore: " + (gamePattern.length - 1));
    }

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStarted = false;
}

function nextSequence() {
  userClickedPattern = [];

  ++level;
  $('#level-title').text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $('#' + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $('#' + currentColour).addClass("pressed");

  setTimeout(function() {
    $('#' + currentColour).removeClass("pressed");
  }, 100)
}
