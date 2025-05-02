// utils.js - Utility functions like random food generation, etc.

function getRandomFoodPosition() {
    return {
        x: Math.floor(Math.random() * 50) * 10,
        y: Math.floor(Math.random() * 50) * 10,
    };
}
