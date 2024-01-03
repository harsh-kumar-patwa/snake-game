let gameContainer = document.querySelector(".game-container");
let foodX,foodY;
let velocityX=0,velocityY=0;
let headX= 12, headY=12;
let snakeBody = [];
let game_controller = document.querySelector(".controller");
let score = document.querySelector(".score");
let count = 0; 


function generateFood(){
    foodX=Math.floor(Math.random()*25)+1;
    foodY=Math.floor(Math.random()*25)+1;
    for(let i =0;i<snakeBody.length;i++){
        if(foodX==snakeBody[i][0] && foodY==snakeBody[i][1]){
            generateFood();
        }
    }
}

function renderGame(){
    
    let updatedGame = `<div class="food" style="grid-area:${foodY}/${foodX}"></div>`;
    if(headX==foodX && headY==foodY){
        generateFood();
        count+=5;
        scorefunction(count);
        // console.log(count);
        snakeBody.push([headX,headY]);
    }

    snakeBody.pop();
    headX+=velocityX;
    headY+=velocityY;
    snakeBody.unshift([headX,headY]);

    if(headX==0||headY==0||headX==26||headY==26){
        gameOver();
        return;
    }
    for(var i = 1;i<snakeBody.length;i++){
        if(snakeBody[i][0]==headX && snakeBody[i][1]==headY){
            
            gameOver();
            return; 
        }
    }   
    for(var i =0;i<snakeBody.length;i++){
        if(i===0){
            updatedGame+=`<div class="head headcolor" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
        }
        else{
            updatedGame+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
        }
    }

    gameContainer.innerHTML = updatedGame ;
}

function scorefunction(val=0){
    score.innerHTML="Current Score "+ val;
}
function vibrate() {
    // Check if the vibration API is supported
    if ("vibrate" in navigator) {
      // Vibrate for 100 milliseconds
      navigator.vibrate(100);
    } else {
      console.warn("Vibration API not supported");
    }
  }

generateFood();
renderGame();//no delay for user to load
setInterval(renderGame,150);

let flagger = true;
game_controller.addEventListener("click",function(e){
    // console.log(e);
    let keyPressed = e.target.classList[1];
    if(keyPressed=="fa-circle-up" && velocityY!=1){//add && constraint here
        velocityX=0;
        velocityY=-1;
        vibrate();
        if(flagger){
            scorefunction();
            flagger=false;
        }

    }else if(keyPressed=="fa-circle-down" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
        vibrate();
        if(flagger){
            scorefunction();
            flagger=false;
        }

    }else if(keyPressed=="fa-circle-right" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
        vibrate();
        if(flagger){
            scorefunction();
            flagger=false;
        }

    }else if(keyPressed=="fa-circle-left" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
        vibrate();
        if(flagger){
            scorefunction();
            flagger=false;
        }
    }
    
})

let flag = true;
document.addEventListener("keydown",function(e){
    // console.log(e);
    let keyPressed = e.key;
    
    if(keyPressed=="ArrowUp" && velocityY!=1){//add && constraint here
        velocityX=0;
        velocityY=-1;
        if(flag){
            scorefunction();
            flag = false;
        }
    }else if(keyPressed=="ArrowDown" && velocityY!=-1){
        velocityX=0;
        velocityY=1;
        if(flag){
            scorefunction();
            flag = false;
        }
    }else if(keyPressed=="ArrowRight" && velocityX!=-1){
        velocityX=1;
        velocityY=0;
        if(flag){
            scorefunction();
            flag = false;
        }
    }else if(keyPressed=="ArrowLeft" && velocityX!=1){
        velocityX=-1;
        velocityY=0;
        if(flag){
            scorefunction();
            flag = false;
        }
    }
    
})



function gameOver(){
    velocityX=0;//since after game over , it was still running after clicking ok
    velocityY=0;
    headX=12;
    headY=12;
    snakeBody=[];
    count=0;
    generateFood();
    scorefunction();
    alert("GaMe OvEr!!!");
}