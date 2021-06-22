let canvas = document.getElementById("snake");
let context = canvas.getContext("2d"); 
let box = 32;
let snake = [];
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let direction = "right";//indica que a cobrinha vai começar se movimentando para a direita ao carregar o jogo

let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//abaixo, função que estabelece parâmetros para a área de jogo:
function createBG(){
    context.fillStyle = "lightgreen"; //fundo verde claro
    context.fillRect(0, 0, 16*box, 16*box);//dimensões da área jogável (16 * box, definida no início)
}

//função para criar a cobrinha: cor e posição inicial
function createSnake(){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "brown";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//função para desenhar a comidinha na tela
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

//função para detectar evento keydown(quando teclas de direção são pressionadas), e chamar função de update
document.addEventListener('keydown', update);

//função para controlar direcionamento/movimento da cobrinha com as 4 teclas de direção do teclado (37, 38, 39, 40)
function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left";    
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function startGame(){

    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0; 
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert("Game Over! :(");
        }
    }

    
    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 +1) * box;
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let jogo = setInterval(startGame, 100);




