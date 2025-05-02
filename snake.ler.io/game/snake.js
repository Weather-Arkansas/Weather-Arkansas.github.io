// snake.js - Handles the logic of the snake

class Snake {
    constructor(color) {
        this.body = [{ x: 50, y: 50 }];
        this.direction = 'RIGHT';
        this.color = color;
    }

    move() {
        let head = { ...this.body[0] };
        if (this.direction === 'UP') head.y -= 10;
        if (this.direction === 'DOWN') head.y += 10;
        if (this.direction === 'LEFT') head.x -= 10;
        if (this.direction === 'RIGHT') head.x += 10;
        this.body.unshift(head);
    }

    grow() {
        // Just grow the snake by adding a segment to the body
    }

    checkCollision(otherSnake) {
        const head = this.body[0];
        return otherSnake.body.some(segment => segment.x === head.x && segment.y === head.y);
    }

    render(gameBoard) {
        this.body.forEach(segment => {
            const segmentElement = document.createElement('div');
            segmentElement.style.position = 'absolute';
            segmentElement.style.width = '10px';
            segmentElement.style.height = '10px';
            segmentElement.style.backgroundColor = this.color;
            segmentElement.style.left = `${segment.x}px`;
            segmentElement.style.top = `${segment.y}px`;
            gameBoard.appendChild(segmentElement);
        });
    }
}
