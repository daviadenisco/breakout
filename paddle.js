// the paddle class
class Paddle {
    // set attributes for paddle, get gameWidth and gameHeight from index.js
    constructor(game) {
        this.gameWidth = game.gameWidth;
        // set width, height of the rectangle that will be used as the paddle
        this.width = 150;
        this.height = 20;
        this.maxSpeed = 12;
        this.speed = 0;
        // use object for this, makes updating position easier
        // paddle should start at center of screen
        this.position = {
            // start at center of screen
            x: game.gameWidth / 2 - this.width / 2,
            // at bottom if screen but a little above absolute bottom
            y: game.gameHeight - this.height - 10
        };
    };

    
    moveLeft() {
        this.speed = -this.maxSpeed;
    };

    moveRight() {
        this.speed = this.maxSpeed;
    };

    stop() {
        this.speed = 0;
    };

    // method for drawing the paddle, needs the ctx
    draw(ctx) {
        if (game.currentLevel === 1) {
            this.width = 125;
        }
        if (game.currentLevel === 2) {
            this.width = 100;
        }
        // ctx.fillStyle = 'lightgrey';
        ctx.fillStyle = 'blue';

        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        // ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        ctx.stroke();
    };

    update(deltaTime) {
        // sets the x position at the specified speed, which moves the paddle left or right at the designated speed
        this.position.x += this.speed;
        // doesn't allow the paddle to go beyond the boundaries of the game board (canvas)
        if (this.position.x < 0) this.position.x = 0;
        // if the position plus the width of the paddle is greater than the width of the game board, set the position to the width of the board minus the width of the paddle
        if (this.position.x + this.width > GAME_WIDTH) this.position.x = GAME_WIDTH - this.width;

    };

    collisionSection(xValue) {
        if (xValue > this.position.x + (2 * (this.width / 3))) {
            return "right";
        } else if (xValue > (this.width / 3)) {
            return "middle";
        } else {
            return "left";
        }
    }
};