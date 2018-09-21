// ship constructor - ship is written into a circle
class Ship {
    constructor() {
        //  circle frame radius
        this.r = 0.04;
        // angle of rear part ofthe ship (alternating between plus and minus)
        this.rearA = 40;
        // front of the ship angle
        this.a = 0;
        this.x = VAR.W / 2;
        this.y = VAR.H / 2;

        // addition ship property for acceleration
        this.modX = 0;
        this.modY = 0;
        // acceleration
        this.acc = 0.0006;

        // max speed
        this.maxMod = 0.019;

        // container for ship's coordinates
        this.points = [{}, {}, {}];
    };

    // ship / rock collision detection
    hitTest() {
        for (let i = 0; i < this.points.length; i++) {
            for (let r in Rock.all) {
                if (Rock.all[r].hitTest(this.points[i].x, this.points[i].y)) {
                    Rock.all[r].remove();
                    return true;
                }
            }
        }
        return false;
    }

    // draw method
    draw() {
        if (!this.destroyed) {
            if (this.hitTest()) {
                this.destroyed = true;
                Game.stop();
            } else {
                // ship's controls included to dynamicly adjust ship angle
                if (Game.key_37 || Game.key_39) {
                    // rotation speed = 7 deg/frame
                    this.a = this.a + 7 * (Game.key_37 ? -1 : 1);
                }

                // adding acceleration
                if (Game.key_38) {
                    this.modX = Math.max(-this.maxMod * VAR.d, Math.min(this.maxMod * VAR.d, this.modX + Math.sin(Math.PI / 180 * this.a) * this.acc * VAR.d));
                    this.modY = Math.max(-this.maxMod * VAR.d, Math.min(this.maxMod * VAR.d, this.modY - Math.cos(Math.PI / 180 * this.a) * this.acc * VAR.d));

                    // ship slows down after relesaing a button
                } else {
                    this.modX = this.modX * 0.98;
                    // let it stop after it reaches very low speed
                    this.modX = Math.abs(this.modX) < 0.0001 ? 0 : this.modX;

                    this.modY = this.modY * 0.98;
                    this.modY = Math.abs(this.modY) < 0.0001 ? 0 : this.modY;

                };

                // speeding up
                this.x += this.modX;
                this.y += this.modY;


                // drawing function for every peak of triangle
                Game.ctx.beginPath();
                for (let i = 0; i < 3; i++) {
                    // loop through every peak of triangle
                    // new temporary angle (tempA) used for drawing
                    this.tempA = i === 0 ? this.a : (this.a + 180 + (i == 1 ? this.rearA : -this.rearA));
                    this.tempR = i === 0 ? this.r : (this.r * 0.6);
                    // saving coordinated in 'this.points array' - point's coordinates calculated based on middle of circle
                    this.points[i].x = Math.sin(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.x;
                    this.points[i].y = -Math.cos(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.y;
                    // telling canvas to draw lines between points - one stroke is missing
                    Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);

                };
                // adding last stroke with 'closePath' to close a triangle shape
                Game.ctx.closePath();
                Game.ctx.stroke();

                // drawing flames behind ship
                Game.ctx.beginPath();
                if (Game.key_38 && this.thrust) { // this.thrust toggles active each frame - it causes flame to keep 'blinking'
                    this.thrust = false;
                    for (let i = 0; i < 3; i++) {
                        this.tempA = i != 1 ? this.a + 180 + (i === 0 ? -this.rearA + 14 : this.rearA - 14) : this.a + 180;
                        this.tempR = i != 1 ? this.r * 0.5 : this.r;
                        Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](
                            Math.sin(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.x,
                            - Math.cos(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.y
                        );
                    };
                    Game.ctx.stroke();
                } else if (Game.key_38 && !this.thrust) {
                    this.thrust = true;
                };

                // detection if ship left window  + Math.max(this.points[0].x, this.points[1].x, this.points[2].x) * 0.9)
                // when ship leaves a screen it will be redrawn on the opisite side
                if (this.points[0].x < 0 && this.points[1].x < 0 && this.points[2].x < 0) {
                    this.x += VAR.W - Math.min(this.points[0].x, this.points[1].x, this.points[2].x) * 0.9;
                } else if (this.points[0].x > VAR.W && this.points[1].x > VAR.W && this.points[2].x > VAR.W) {
                    this.x -= VAR.W + (Math.max(this.points[0].x, this.points[1].x, this.points[2].x) - VAR.W) * 0.9;
                } else if (this.points[0].y < 0 && this.points[1].y < 0 && this.points[2].y < 0) {
                    this.y += VAR.H - Math.min(this.points[0].y, this.points[1].y, this.points[2].y) * 0.9;
                } else if (this.points[0].y > VAR.H && this.points[1].y > VAR.H && this.points[2].y > VAR.H) {
                    this.y -= VAR.H + (Math.max(this.points[0].y, this.points[1].y, this.points[2].y) - VAR.H) * 0.9;
                };
            }
        }
    }
}