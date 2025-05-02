// Your game state logic and functions will go here (like the previous examples)

// Initialize game state
function initializeGameState() {
    if (!localStorage.getItem('gameState')) {
        const initialState = {
            playerX: 50,
            playerY: 50,
            playerScore: 0
        };
        localStorage.setItem('gameState', JSON.stringify(initialState));
    }
}

// Update game state in localStorage
function updateGameState(newState) {
    localStorage.setItem('gameState', JSON.stringify(newState));
}

// Move player based on direction
function movePlayer(direction) {
    let state = getGameState();

    if (direction === 'up') {
        state.playerY -= 10;
    } else if (direction === 'down') {
        state.playerY += 10;
    } else if (direction === 'left') {
        state.playerX -= 10;
    } else if (direction === 'right') {
        state.playerX += 10;
    }

    updateGameState(state);  // Save the updated state
}

// Poll game state at regular intervals
function pollGameState() {
    const state = getGameState();
    console.log(`Player Position: X=${state.playerX}, Y=${state.playerY}, Score=${state.playerScore}`);

    // Update the display with the new state
    updateDisplay(state);

    // Repeat polling every 2 seconds
    setTimeout(pollGameState, 2000);
}

// Update display with the latest player data
function updateDisplay(state) {
    document.getElementById('playerPosition').textContent = `Position: (${state.playerX}, ${state.playerY})`;
    document.getElementById('playerScore').textContent = `Score: ${state.playerScore}`;
}

// Get game state from localStorage
function getGameState() {
    return JSON.parse(localStorage.getItem('gameState'));
}

// Initialize the game
initializeGameState();
pollGameState();  // Start polling
