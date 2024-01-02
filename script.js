let gameContainer = document.querySelector(".game-container");
let foodX,foodY;
let velocityX=0,velcoityY=0;
let headX= 12, headY=12;
let snakeBody = [];

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
        snakeBody.push([headX,headY]);
    }

    snakeBody.pop();
    headX+=velocityX;
    headY+=velcoityY;
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
        updatedGame+=`<div class="head" style="grid-area:${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;
    }

    gameContainer.innerHTML = updatedGame ;
}
generateFood();
renderGame();//no delay for user to load
setInterval(renderGame,150);

document.addEventListener("keydown",function(e){
    console.log(e);
    let keyPressed = e.key;
    if(keyPressed=="ArrowUp" ){//add && constraint here
        velocityX=0;
        velcoityY=-1; 

    }else if(keyPressed=="ArrowDown"){
        velocityX=0;
        velcoityY=1;

    }else if(keyPressed=="ArrowRight"){
        velocityX=1;
        velcoityY=0;

    }else if(keyPressed=="ArrowLeft"){
        velocityX=-1;
        velcoityY=0;
    }
    
})

function gameOver(){
    velocityX=0;//since after game over , it was still running after clicking ok
    velcoityY=0;
    headX=12;
    headY=12;
    snakeBody=[];
    generateFood();
    alert("GaMe OvEr!!!");
}