const level1 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0],
];
const level2 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,1,0,1,0,1,0,1,0,1,0]
];
const level3 = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,1,1,0,0,0,0,0,1,1,1,0],
    [0,1,1,0,0,0,1,0,0,0,1,1,0],
    [1,1,0,0,0,1,1,1,0,0,0,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1],
    [1,1,0,0,0,1,1,1,0,0,0,1,1],
    [0,1,1,0,0,0,1,0,0,0,1,1,0],
    [0,1,1,0,0,0,1,0,0,0,1,1,0],
    [1,1,0,0,0,1,1,1,0,0,0,1,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,1,1,1,1,1,1,1,1,1,1,1],
];

function detectCollidedSide(ball, brick) {

    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;
    let leftOfBall = ball.position.x;
    let rightOfBall = ball.position.x + ball.size;
  
    let topOfObject = brick.position.y;
    let leftSideOfObject = brick.position.x;
    let rightSideOfObject = brick.position.x + brick.width;
    let bottomOfObject = brick.position.y + brick.height;

    let ballPositions = [bottomOfBall, topOfBall, leftOfBall, rightOfBall];
    let brickPositions = [topOfObject, bottomOfObject, rightSideOfObject, leftSideOfObject]

    let min = 9999;
    let result = '';

    for (let i = 0; i < ballPositions.length; i++) {
        let distance = Math.abs(ballPositions[i] - brickPositions[i]);
        if (distance < min) {
            min = distance;

            if (i > 2) {
                result = 'leftOrRight';
            } else {
                result = 'topOrBottom';
            }
        }
    }

    return result;
}

function detectCollision(ball, gameObject) {
    let bottomOfBall = ball.position.y + ball.size;
    let topOfBall = ball.position.y;
    let leftOfBall = ball.position.x;
    let rightOfBall = ball.position.x + ball.size;
  
    let topOfObject = gameObject.position.y;
    let leftSideOfObject = gameObject.position.x;
    let rightSideOfObject = gameObject.position.x + gameObject.width;
    let bottomOfObject = gameObject.position.y + gameObject.height;

    if (
        topOfBall <= bottomOfObject &&
        bottomOfBall >= topOfObject && 
        ball.position.x >= leftSideOfObject && ball.position.x + ball.size <= rightSideOfObject) {
            // console.log('ball.position.y: ', ball.position.y);
            // console.log('gameObject.position.y: ', gameObject.position.y);
            // console.log(' ')
            // console.log('ball.position.x: ', ball.position.x);
            // console.log('gameObject.position.x: ', gameObject.position.x);
        ball.position.y = gameObject.position.y - 2;
        // ball.position.x = gameObject.position.x - (gameObject.width - 1);
        return true;
    } else {
        return false;
    }
}

function buildLevel(game, level) {
    let bricks = [];
    level.forEach((row, rowIndex) => {
        row.forEach((brick, brickIndex) => {
            if (brick === 1) {
                let position = {
                    x: 62 * brickIndex,
                    y: 24 * rowIndex
                }
                bricks.push(new Brick(game, position));
            }
        }) 
    });
    return bricks;
}
