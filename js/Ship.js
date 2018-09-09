// ship constructor - ship is written into a circle
class Ship {
    constructor() {
        //  circle frame radius
        this.r = 0.04;
        // angle of rear part ofthe ship (alternating between + and minus)
        this.rearA = 50;
        // front of the ship angle
        this.a = 0;
        this.x = VAR.W / 2;
        this.y = VAR.H / 2;


        //addition ship props for acceleration
        // x difference from the middle of canvas
        this.modX = 0;
        this.modY = 0;
        // acceleration
        this.acc = 0.0004;

        // max speed
        this.maxMod = 0.019;

        // container for ship's coordinates
        this.points = [{}, {}, {}];
    }

    // draw method
    draw() {
        // ship's controls included to dynamicly adjust ship angle
        if (Game.key_37 || Game.key_39) {
            // rotation speed = 7 deg/frame
            this.a = this.a + 7 * (Game.key_37 ? -1 : 1);
        }

        // adding acceleration
        if (Game.key_38) {
            this.modX = Math.max(-this.maxMod * VAR.d, Math.min(this.maxMod * VAR.d, this.modX + Math.sin(Math.PI / 180 * this.a) * this.acc * VAR.d));
            this.modY = this.modY - Math.cos(Math.PI / 180 * this.a) * this.acc * VAR.d;

            // ship slows down after relesaing a button
        } else {
            this.modX = this.modX * 0.98;
            // let it stop after it reaches very low speed
            this.modX = Math.abs(this.modX) < 0.0001 ? 0 : this.modX;

            this.modY = this.modY * 0.98;
            this.modY = Math.abs(this.modY) < 0.0001 ? 0 : this.modY;

        }

        // speeding up
        this.x += this.modX;
        this.y += this.modY;


        // drawing function for every peak of triangle
        Game.ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            // loop through every peak of triangle
            // new temporary angle (tempA) used for drawing
            this.tempA = i === 0 ? this.a : (this.a + 180 + (i == 1 ? this.rearA : -this.rearA));
            this.tempR = i === 0 ? this.r : (this.r * 0.7);
            // saving coordinated in 'this.points array' - point's coordinates calculated based on middle of circle
            this.points[i].x = Math.sin(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.x;
            this.points[i].y = -Math.cos(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.y;
            // telling canvas to draw lines between points - one stroke is missing
            Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);

        }
        // adding last stroke with 'closePath' to close a triangle shape
        Game.ctx.closePath();
        Game.ctx.stroke();

        // drawing flames behind ship
        Game.ctx.beginPath();
        if (Game.key_38) {

        }
    }
} 