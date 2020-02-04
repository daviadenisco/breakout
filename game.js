class Game {
    constructor(gameWidth, gameHeight) {
        this.newGame = document.getElementById('new-game');
        this.gamestate = GAMESTATE.MENU;
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.gameObjects = [];
        this.collisionDetected = false;
        // let ball = new Ball(GAME_WIDTH, GAME_HEIGHT);
        this.ball = new Ball(this);
        // let paddle = new Paddle(GAME_WIDTH, GAME_HEIGHT);
        this.paddle = new Paddle(this);
        this.bricks = [];
        this.lives = 3;
        this.levels = [level1, level2, level3];
        this.currentLevel = 0;
        new InputHandler(this.paddle, this);
    };
    // game class passes its own instance to the objects so they can get any info they need
    start () {
        if (
            this.gamestate !== GAMESTATE.MENU &&
            this.gamestate !== GAMESTATE.LEVEL2 &&
            this.gamestate !== GAMESTATE.LEVEL3
            ) 
            return;
        this.bricks = buildLevel(this, this.levels[this.currentLevel]);
        this.ball.reset();
        // put all game objects into an array
        this.gameObjects = [this.paddle, this.ball];
        this.gamestate = GAMESTATE.RUNNING;
        this.newGame.addEventListener('click', function(e) {
            setTimeout(() => {
                window.location.reload();
            }, 200)
        });
    };
    // update all game objects
    update(deltaTime) {
        this.collisionDetected = false;

        if (this.lives === 0) {
            this.gamestate = GAMESTATE.GAMEOVER;
        }

        if (
            this.gamestate === GAMESTATE.PAUSED || 
            this.gamestate === GAMESTATE.MENU ||
            this.gamestate === GAMESTATE.GAMEOVER
            ) 
                return;

        if (this.currentLevel === 0 && this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.LEVEL2;
            this.start();
        }

        if (this.currentLevel === 1 && this.bricks.length === 0) {
            this.currentLevel++;
            this.gamestate = GAMESTATE.LEVEL3;
            this.start();
        }

        if (this.currentLevel === 2 && this.bricks.length === 0) {
            this.gamestate = GAMESTATE.GAMEWIN;
        }

        [...this.bricks, ...this.gameObjects].forEach((object) => object.update(deltaTime));

        this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
    };

    handleCollision(collidedSide) {
        if (this.collisionDetected === false) {
            this.collisionDetected = true;

            if (collidedSide === 'leftOrRight') {
                this.ball.speed.x = -this.ball.speed.x;
            }

            if (collidedSide === 'topOrBottom') {
                this.ball.speed.y = -this.ball.speed.y;
            }
        }
    }

    // draw all game objects
    draw(ctx) {
        [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));
        if (this.gamestate === GAMESTATE.PAUSED) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Paused \nPress ENTER to keep playing', this.gameWidth / 2, this.gameHeight / 2);
        };

        if (this.gamestate === GAMESTATE.MENU) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,1';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Press SPACEBAR To Start, Press ENTER To Pause', this.gameWidth / 2, this.gameHeight / 2);
        };

        if (this.gamestate === GAMESTATE.GAMEOVER) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('Game Over', this.gameWidth / 2, this.gameHeight / 2);
        };

        if (this.gamestate === GAMESTATE.GAMEWIN) {
            ctx.rect(0,0,this.gameWidth, this.gameHeight);
            ctx.fillStyle = 'rgba(0,0,0,0.5';
            ctx.fill();
            ctx.font = '30px Arial';
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';
            ctx.fillText('You Win!', this.gameWidth / 2, this.gameHeight / 2);
        };
    };

    togglePause() {
        if (this.gamestate === GAMESTATE.PAUSED) {
            this.gamestate = GAMESTATE.RUNNING;
        } else {
            this.gamestate = GAMESTATE.PAUSED;
        };
    };

    ballOffscreen() {
        if (this.gamestate !== GAMESTATE.GAMEWIN) {
            this.lives--;
        }
    }
};
