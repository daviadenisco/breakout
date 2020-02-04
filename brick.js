class Brick {
    constructor(game, position) {
        this.image = document.getElementById("brick");
        this.game = game;
        this.position = position;
        this.width = 62;
        this.height = 24;
        this.markedForDeletion = false;
    };
    draw(ctx) {
        ctx.drawImage(
          this.image,
          this.position.x,
          this.position.y,
          this.width,
          this.height
        );
        
        // ctx.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        // ctx.stroke();
    };
    update(deltaTime) {
        if (detectCollision(this.game.ball, this)) {
            let collidedSide = detectCollidedSide(this.game.ball, this);
            console.log("collidedSide", collidedSide);
            this.game.handleCollision(collidedSide);
      
            this.markedForDeletion = true;
        };
    };
};