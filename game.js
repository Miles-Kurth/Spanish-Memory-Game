import Color from "https://colorjs.io/dist/color.js";

const canvasWidth = 1280 + 10;
const canvasHeight = 570 + 10;
      
const numRows = 3; //Vertical (down)
const numCols = 8; //Horizontal (across)

const cardWidth = ((canvasWidth - 10) - (numCols * 10)) / numCols;
const cardHeight = ((canvasHeight - 10) - (numRows * 10)) / numRows;
      
const cardsArray = [];

let wordsArray = [
    [1 , "one"   , 0],
    [2 , "two"   , 0],
    [3 , "three" , 0],
    [4 , "four"  , 0],
    [5 , "five"  , 0],
    [6 , "six"   , 0],
    [7 , "seven" , 0],
    [8 , "eight" , 0],
    [9 , "nine"  , 0],
    [10, "ten"   , 0],
    [11, "eleven", 0],
    [12, "twelve", 0]
];



var startingHue = Math.floor(Math.random() * 359) + 1;
var ctx;

var gameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = canvasWidth;
        this.canvas.height = canvasHeight;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this. canvas. height);
    }
}

function component(width, height, hue, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;

    this.lightness = 0.8;
    this.chroma = 0.09;
    this.hue = hue % 360;

    this.color = new Color("oklch", [this.lightness, this.chroma, this.hue]);

    //From here
    this.wordType = Math.floor(Math.random() * 2)
    this.wordIndex = Math.floor(Math.random() * 12);

    while (wordsArray[this.wordIndex][2] >= 3){
        this.wordIndex = Math.floor(Math.random() * 12);
    }
    
    wordsArray[this.wordIndex][2] += this.wordType + 1;

    this.word = wordsArray[this.wordIndex][this.wordType];
    //to here is problem, fix


    this.update = function(){
        this.hue = ( (this.hue) % 360 ) + 1 + 1;
        ctx = gameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#000000";
        ctx.font = "20px monospace";
        ctx.fillText(this.word, this.x + (this.width/2) - (20 * (this.word.length/4)), this.y + (this.height/2) );
    }
    this.setColor = function(newColor){
        this.color = newColor;
    }
}

function updateGameArea() {
    gameArea.clear();
    for (let i = 0; i < cardsArray.length; i++){
        cardsArray[i].update();
    }
    // myGamePiece.update();
}

function startGame() {
    gameArea.start();
    let targetX = 10;
    let targetY = 10;
    
    for (let r = 0; r < numRows; r++){
      targetX = 10;
      for (let c = 0; c < numCols; c++){
        cardsArray.push( new component(cardWidth, cardHeight, startingHue, targetX, targetY) );
        startingHue = ( (startingHue + 5) % 360 ) + 1;
        targetX += cardWidth + 10;
      }
      targetY += cardHeight + 10;
    }
}

function getRandomOkLCHColor() {
  const l = Math.random() * 1;
  const c = Math.random() * 0.09;
  const h = (Math.random() * 360) + 1; 
  
  return new Color("oklch", [l, c, h]);
}

startGame();
