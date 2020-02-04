let canvas = document.getElementById('game-screen');
let ctx = canvas.getContext('2d');
let lastTime = 0;
const GAME_WIDTH = 806;
const GAME_HEIGHT = 600;
const GAMESTATE = {
    MENU: 0,
    PAUSED: 1,
    RUNNING: 2,
    LEVEL2: 3,
    LEVEL3: 4,
    GAMEWIN: 5,
    GAMEOVER: 6,
};

// START NEW GAME
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

// runs every frame
// calculates how much time has passed
// clears screen
// updates paddle
// redraws paddle
// calls gameLoop again with the next frames timeStamp
function gameLoop(timestamp) {
    let deltaTime = timestamp - lastTime;
    lastTime = timestamp;
    // clear the board between each frame
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // update the board
    game.update(deltaTime);
    // draw the board
    game.draw(ctx);
    // from browser
    // everytime funciton runs, it'll say "hey when the next frame is ready, call the gameLoop again and pass it the timestamp"
    requestAnimationFrame(gameLoop);
};

// instead of calling the gameLoop(), we can req animation to get valid time stamp
// gameLoop();
requestAnimationFrame(gameLoop);