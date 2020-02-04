// the ball class
class Ball {
    constructor(game) {
        this.image = document.getElementById('ball');
        this.size = 20;
        this.gameWidth = game.gameWidth;
        this.gameHeight = game.gameHeight;
        this.game = game;
        this.reset();
    };

    reset () {
        this.position = {
            x: 10,
            y: 300
        }
        this.speed = {
            x: 5, 
            y: -5
        };
    }

    draw(ctx) {
        // ctx.drawImage(
        //     this.image, 
        //     this.position.x, 
        //     this.position.y, 
        //     this.size, 
        //     this.size
        // );
        // ctx.arc(this.position.x + 10, this.position.y + 10, 10, 0, 2 * Math.PI);
        // ctx.stroke();
        ctx.fillStyle = 'red';
        ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
        // ctx.arc(this.position.x, this.position.x, 10, 0, 2 * Math.PI);
        // ctx.stroke();
     
        // ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
    };

    update(deltaTime) {
         // wall on left or right
        if (this.position.x + this.size > this.gameWidth || this.position.x < 0) {
            this.speed.x = -this.speed.x;
        }
  
        // wall on top
        if (this.position.y < 0) {
            this.speed.y = -this.speed.y;
        }
  
        // bottom of game
        if (this.position.y + this.size > this.gameHeight) {
            this.game.ballOffscreen();
            this.reset();
        }

        if (detectCollision(this, this.game.paddle)) {
            this.speed.y = -this.speed.y;
            console.log('CURRENT SPEED: ', this.speed.x);

            let relativePaddlePosition = this.game.paddle.collisionSection(this.position.x);

            if (relativePaddlePosition === 'left') {
                this.speed.x -= 2;
            }

            if (relativePaddlePosition === 'right') {
                this.speed.x += 2;
            }
            // doesn't allow the ball to drop below the top of the paddle, prevents bug in which ball from sliding across the top of the paddle
            this.position.y = this.game.paddle.position.y - (this.size - 1);
        }

        this.position.x += this.speed.x;
        this.position.y += this.speed.y;
    };
};