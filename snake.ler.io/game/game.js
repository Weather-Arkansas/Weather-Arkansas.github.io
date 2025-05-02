// game.js - Core game logic and update loop

let gameBoard = document.getElementById("game-board");
let playerSnake = new Snake("green");
let otherSnakes = [new Snake("blue")];  // Example: Random snake
let food = getRandomFoodPosition();
let playerDirection = 'RIGHT';

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp' && playerDirection !== 'DOWN') playerDirection = 'UP';
    if (event.key === 'ArrowDown' && playerDirection !== 'UP') playerDirection = 'DOWN';
    if (event.key === 'ArrowLeft' && playerDirection !== 'RIGHT') playerDirection = 'LEFT';
    if (event.key === 'ArrowRight' && playerDirection !== 'LEFT') playerDirection = 'RIGHT';
});

function updateGame() {
    // Move player snake
    playerSnake.move();
    // Move other snakes
    otherSnakes.forEach(snake => snake.move());

    // Check for snake collision
    otherSnakes.forEach(snake => {
        if (playerSnake.checkCollision(snake)) {
            // Handle collision - you could remove parts of the snake or add game over logic
        }
    });

    // Check if player eats food
    if (playerSnake.body[0].x === food.x && playerSnake.body[0].y === food.y) {
        playerSnake.grow();
        food = getRandomFoodPosition();  // Generate new food position
    }

    // Update the display
    renderGame();
}

function renderGame() {
    gameBoard.innerHTML = ''; // Clear the board

    // Render player snake
    playerSnake.render(gameBoard);

    // Render other snakes
    otherSnakes.forEach(snake => snake.render(gameBoard));

    // Render food
    const foodElement = document.createElement('div');
    foodElement.style.position = 'absolute';
    foodElement.style.width = '10px';
    foodElement.style.height = '10px';
    foodElement.style.backgroundColor = 'red';
    foodElement.style.left = `${food.x}px`;
    foodElement.style.top = `${food.y}px`;
    gameBoard.appendChild(foodElement);
}

setInterval(updateGame, 100);  // Update game every 100ms
