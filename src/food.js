import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'

let food = getRandomFoodPosition()
const EXPANSION_RATE = 5

export function update() {
  if (onSnake(food)) {
    expandSnake(EXPANSION_RATE)
    food = getRandomFoodPosition()
  }
}

export function draw(gameBoard) {
  const foodElement = document.createElement('div')
  foodElement.style.gridRowStart = food.y
  foodElement.style.gridColumnStart = food.x
  foodElement.classList.add('food')
  gameBoard.appendChild(foodElement)
}

function getRandomFoodPosition() {
  let newFoodPosition
  while (newFoodPosition == null || onSnake(newFoodPosition)) {
    newFoodPosition = randomGridPosition()
  }
  return newFoodPosition
}




let direction = 'right';

function move() {
   let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
   snakeBody[0].classList.remove('head');
   snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
   snakeBody.pop();

   if (direction == 'right') {
      if (snakeCoordinates[0] < 10) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
      }
      snakeBody[0].classList.add('head');
      for (let i = 0; i < snakeBody.length; i++) {
         snakeBody[i].classList.add('snakeBody');
      }
   } else if (direction == 'left') {
      if (snakeCoordinates[0] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "10"][posY = "' + snakeCoordinates[1] + '"]'));
      }
      snakeBody[0].classList.add('head');
      for (let i = 0; i < snakeBody.length; i++) {
         snakeBody[i].classList.add('snakeBody');
      }
   } else if (direction == 'up') {
      if (snakeCoordinates[1] < 10) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));
      }
      snakeBody[0].classList.add('head');
      for (let i = 0; i < snakeBody.length; i++) {
         snakeBody[i].classList.add('snakeBody');
      }
   } else if (direction == 'down') {
      if (snakeCoordinates[1] > 1) {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] - 1) + '"]'));
      } else {
         snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "10"]'));
      }

      if (snakeBody[0].getAttribute('posX') == mouse[0].getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse[0].getAttribute('posY')) {
         mouse.classList.remove('mouse');
         let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
         let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
         snakeBody.push(docun)
      }



      snakeBody[0].classList.add('head');
      for (let i = 0; i < snakeBody.length; i++) {
         snakeBody[i].classList.add('snakeBody');
      }
   }
   }


let interval = setInterval(move, 1000);

window.addEventListener('keydown', function(e) {
   if (e.keyCode == 37 && direction != 'right') {
      direction = 'left';
   } else if (e.keyCode == 38 && direction != 'down') {
      direction = 'up';
   } else if (e.keyCode == 39 && direction != 'left') {
      direction = 'right';
   } else if (e.keyCode == 40 && direction != 'up') {
      direction = 'down';
   }
});