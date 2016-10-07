var colors;
var pickedColor;
var mode;
var numSquares = 6;

//Score 
var gameRound = 1;
var gameRoundMax = 5; 
var oneRoundScore = 0;
var score = 0;

//View
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var messageDisplay = document.querySelector("#message");
var colorDisplay = document.getElementById('colorDisplay');
var scoreDisplay = document.getElementById('score');

var resetBtn = document.querySelector("#resetBtn");
var easyBtn = document.querySelector("#easyBtn");
var hardBtn = document.querySelector("#hardBtn");

init();

function init() {
    gameRound = 1;
    oneRoundScore = 0;
    score = 0;
    scoreDisplay.textContent = score;
    scoreDisplay.style.display = "none";

    setSquaresListener();
    setButtonListener();
    newRound();
}
function newRound() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    setSquaresDisplay();
    messageDisplay.textContent = "";
    h1.style.background = "rgb(62,1,175)";
    
    messageDisplay.textContent = "Round: " + gameRound + " / " + gameRoundMax;
    oneRoundScore = numSquares * 10 - 10;
}
function reset(){
    init();
}
function squareListener(){
    var clickedColor = this.style.background;

    if (clickedColor === pickedColor) {
        messageDisplay.textContent = "Correct!!";
        resetBtn.textContent = "Replay";
        changeAllSquaresColor(pickedColor);
        h1.style.background = clickedColor;
        
        score += oneRoundScore;
        scoreDisplay.textContent = "Your score is " + score * 4;
        if(gameRound === gameRoundMax){
            gameOver();
        } else {
            gameRound += 1; 
            setTimeout(newRound,1000);
        }
    } else {
        this.style.background = "#232323";
        //messageDisplay.textContent = "Try again";

        oneRoundScore -= 10;
    }
}
function setSquaresListener() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", squareListener);
    }
}
function gameOver(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].removeEventListener("click", squareListener);
    }
    messageDisplay.textContent = "Game Over";
    scoreDisplay.style.display = "inherit";
}
function setSquaresDisplay(color) {
    for (var i = 0; i < squares.length; i++) {
        squares[i].style.visibility = "hidden";
    }
    for (var i = 0; i < colors.length; i++) {
        setTimeout(setOneSquaresDisplay.bind(null,i), 500+i*200);
    }
}
function setOneSquaresDisplay(i){
    squares[i].style.visibility = "visible";
    squares[i].style.background = colors[i];
}
function setButtonListener(color) {
    easyBtn.addEventListener("click", function() {
        mode = "easy";
        this.classList.add("selected");
        hardBtn.classList.remove("selected");
        numSquares = 3;
        reset();
    });
    hardBtn.addEventListener("click", function() {
        mode = "hard";
        this.classList.add("selected");
        easyBtn.classList.remove("selected");
        numSquares = 6;
        reset();
    });
    resetBtn.addEventListener("click", function() {
        reset();
    });
}
function changeAllSquaresColor(color) {
    for (var i = 0; i < colors.length; i++) {
        squares[i].style.background = color;
    }
}
function pickColor() {
    var pickedColor = Math.floor(Math.random() * colors.length);
    return colors[pickedColor];
}
function generateRandomColors(number) {
    var colorArray = [];
    for (var i = 0; i < number; i++) {
        colorArray[i] = randomColor();
    }
    return colorArray;
}
function randomColor() {
    var r = Math.floor(Math.random() * 256); //0-255
    var g = Math.floor(Math.random() * 256); //0-255
    var b = Math.floor(Math.random() * 256); //0-255
    var color = "rgb(" + r + ", " + g + ", " + b + ")";
    return color;
}
