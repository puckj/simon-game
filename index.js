var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$("h1").click(function () {
    if (!started) {
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;

    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);

    // console.log(this.id);
    // console.log(userClickedPattern);
});

function nextSequence() {
    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColour = buttonColours[randomNumber];

    level++;
    $("#level-title").text("Level " + level);

    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).animate({ opacity: .0 }, 100).animate({ opacity: 1 }, 100);
    playSound(randomChosenColour);

    // console.log(randomChosenColour);
    console.log(gamePattern);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel] && started) {
        if (currentLevel === gamePattern.length - 1) {

            console.log("Correct");
            setTimeout(function () {
                nextSequence();
            }, 1000);

            console.log(userClickedPattern);
            userClickedPattern = [];

        } else {
            console.log("Pending...");
        }
    } else {
        console.log("Wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;
        console.log(userClickedPattern);
        startOver();

    }
}

function startOver() {
    userClickedPattern = [];
    gamePattern = [];
    level = 0;
}
