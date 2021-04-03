var Enemy = function(x, y, leftBound, rightBound) {
    let self = {
        x: x,
        y: y,

        xVel: 1,
        yVel: 0,

        speed: 2,

        w: 32,
        h: 32,

        leftBound: leftBound,
        rightBound: rightBound, 

        isDead: false,

        die: function() {
            this.isDead = true;
        },

        update: function() {
            this.yVel += GRAVITY; // gravity

            if (this.x > this.rightBound) {
                this.xVel = -1;
            } 

            if(this.x < this.leftBound) {
                this.xVel = 1;
            }

            this.x += this.xVel * this.speed;
            this.y += this.yVel;

            image(assets["enemyS"], this.x, this.y);
        }
    };

    return self;
};