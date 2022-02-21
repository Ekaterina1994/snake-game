// import css  from './style.css';


const newGame = document.querySelector('.new-game');
const records = document.querySelector('.records');
const buttons = document.querySelector('.buttons');
const results = document.querySelector('.game-over');
const sc = document.querySelector('.records-score');

let field = document.createElement('div');
let footer = document.querySelector('.footer');
document.body.insertBefore(field, footer);
field.classList.add('field');


for (let i = 1; i < 401; i++) {
   let excel = document.createElement('div');
   field.appendChild(excel);
   excel.classList.add('excel');
}

let excel = document.getElementsByClassName('excel');
let x = 1;
let y = 20;

for (let i = 0; i < excel.length; i++) {
   if (x > 20) {
      x = 1;
      y--;
   }
   excel[i].setAttribute('posX', x);
   excel[i].setAttribute('posY', y);
   x++;
}


function generateSnake() {
   let posX = Math.round(Math.random() * (20 - 3) + 3);
   let posY = Math.round(Math.random() * (20 - 1) + 1);
   return [posX, posY];
}
let coordinates = generateSnake();

let snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')];

for (let i = 0; i < snakeBody.length; i++) {
   snakeBody[i].classList.add('snakeBody');
}
snakeBody[0].classList.add('head');

let mouse;

function createMouse() {
   function generateMouse() {
      let posX = Math.round(Math.random() * (20 - 1) + 1);
      let posY = Math.round(Math.random() * (20 - 1) + 1);
      return [posX, posY];
   }
   let mouseCoordinates = generateMouse();
   mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
   while (mouse.classList.contains('snakeBody')) {
      let mouseCoordinates = generateMouse();
      mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
   }
   mouse.classList.add('mouse');
}

createMouse();

let direction = 'right';
let steps = false;

let dom_score = document.querySelector("#score_value");
let dom_score2 = document.querySelector('#score_val');
let currentScore = 00;
let maxScore = window.localStorage.getItem("maxScore") || undefined;
const scoreHistory = [];

let isPlay = false;

const audio = new Audio();

function playAudio() {
   audio.src = './assets/audio/snakeAttack.mp3';
   audio.currentTime = 0;
   audio.play();
}

//local storage

// const obj = {
//    score: `${score}`,
// }

// localStorage.setItem('number', JSON.stringify(obj));

// const ages = localStorage.getItem('number');
// const number = JSON.parse(ages);
// console.log(number.score);

const SCORE = 'score';

function saveScoreToStorage(score) {
   scoreHistory[0] = score;
   localStorage.setItem(SCORE, JSON.stringify(scoreHistory));
}

function getHistoryFromStorage() {
   return localStorage.getItem(SCORE);
}

function shiftHistory() {
   if (scoreHistory.length > 10) {
      scoreHistory.pop();
      scoreHistory.unshift(0);
   } else {
      scoreHistory.unshift(0);
   }
}

///

function move() {
   let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
   snakeBody[0].classList.remove('head');
   snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
   snakeBody.pop();

   if (direction == 'right') {
      if (snakeCoordinates[0] < 20) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
      }
   } else if (direction == 'left') {
      if (snakeCoordinates[0] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "20"][posY = "' + snakeCoordinates[1] + '"]'));
      }
   } else if (direction == 'up') {
      if (snakeCoordinates[1] < 20) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
      }
   } else if (direction == 'down') {
      if (snakeCoordinates[1] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "20"]'));
      }
   }

   if (snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')) {
      mouse.classList.remove('mouse');
      let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
      let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
      snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
      createMouse();
      incrementScore();
      saveScoreToStorage(currentScore);
      playAudio();
   }

   function incrementScore() {
      currentScore++;
      dom_score.innerText = currentScore.toString().padStart(2, "0");
      dom_score2.innerText = currentScore.toString().padStart(2, "0");
   }


   if (snakeBody[0].classList.contains('snakeBody')) {
      field.classList.add('hide');
      results.classList.remove('hide');
      results.classList.add('show');
      for (let i = 0; i < snakeBody.length; i++) {
         snakeBody[i].classList.remove('snakeBody');
      }
      snakeBody[0].classList.remove('head');
      dom_score2.innerText = currentScore.toString().padStart(2, "0");
      snakeBody = [document.querySelector('[posX = "' + coordinates[0] + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 1) + '"][posY = "' + coordinates[1] + '"]'), document.querySelector('[posX = "' + (coordinates[0] - 2) + '"][posY = "' + coordinates[1] + '"]')];
      clearInterval(interval);
   }
      
      snakeBody[0].classList.add('head');
      for (let i = 0; i < snakeBody.length; i++) {
         snakeBody[i].classList.add('snakeBody');
      }
      steps = true;
   }


let interval;

window.addEventListener('keydown', function(e) {
   if (steps == true) {
      if (e.keyCode == 37 && direction != 'right') {
         direction = 'left';
         steps = false;
      } else if (e.keyCode == 38 && direction != 'down') {
         direction = 'up';
         steps = false;
      } else if (e.keyCode == 39 && direction != 'left') {
         direction = 'right';
         steps = false;
      } else if (e.key == 'ArrowDown' && direction != 'up') {
         direction = 'down';
         steps = false;
      }
   }
});


function gameOver() {
   maxScore ? null : (maxScore = currentScore);
   currentScore > maxScore ? (maxScore = currentScore) : null;
   window.localStorage.setItem("maxScore", maxScore);
}

function reset() {
  dom_score.innerText = "00";
  dom_score2.innerText = "00";
  currentScore = "00";
}



newGame.addEventListener('click', startGame);
function startGame() {
   buttons.classList.add('hide');
   field.classList.remove('hide');
   field.classList.add('show');
   interval = setInterval(move, 300);
   reset();
   shiftHistory();
   countScore++;
}

// сохранение score
let allScore = document.querySelectorAll(".score-text");
let countScore = 0;
function saveScore(score) {
  if (countScore <= 10) {
    allScore[countScore].innerHTML = `Game ${countScore + 1}: ${score}`;
    countScore++;
  }
}


records.addEventListener('click', showRecords);

function showRecords() {
   buttons.classList.add('hide');
   sc.classList.add('show');
   //saveScore(dom_score.innerText = currentScore.toString().padStart(2, "0"));
   renderTableWithScoreHistory(JSON.parse(getHistoryFromStorage()));
}



const menu = document.querySelector('.back-to-menu');
menu.addEventListener('click', renderMenu);
const menu2 = document.querySelector('.back-to-menu2');
menu2.addEventListener('click', renderMenu);

function renderMenu() {
   records.classList.remove('hide');
   buttons.classList.remove('hide');
   results.classList.add('hide');
   sc.classList.remove('show');
}

const scoreTitle = document.querySelector('.score-title');

// scoreHistory = array of numbers
function renderTableWithScoreHistory(scoreHistory) {
   const renderLine = (score) => `<div>Game ${countScore}: ${score} scores</div></br>`;
   scoreTitle.insertAdjacentHTML(
      'afterend',
      scoreHistory.reduce((accum, currentScore) => accum + renderLine(currentScore), ''));
}




