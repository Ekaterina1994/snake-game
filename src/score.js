let score;

let altScore = function(score_val){
   ele_score.innerHTML = String(score_val);
}

if(checkBlock(snake[0].x, snake[0].y, food.x, food.y)){
   snake[snake.length] = {x: snake[0].x, y: snake[0].y};
   score += 1;
   altScore(score);
   addFood();
   activeDot(food.x, food.y);
}