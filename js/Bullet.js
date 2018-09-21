// max amount of bullets on screen
Bullet.max = 5;

// object for storing all bullets
Bullet.all = {};

// bullet velocity
Bullet.speed = 0.019;

// counting all bullets which have been shot
Bullet.count = 0;

// bullets currently on screen
Bullet.activeCount = 0;

// how long does the bullet exist on screen ( 35 frames )
Bullet.life = 35;

function Bullet() {
    if (Bullet.activeCount < Bullet.max) {
        // increment counters
        Bullet.count++;
        Bullet.activeCount++;

        // adding unique id to every bullet
        this.id = Bullet.count.toString();
        Bullet.all[this.id] = this;

        this.life = 0;
        // angle is the same as ship's angle
        this.a = Game.ship.a;

        // coordinases are that same of coordinates of ship's front 
        this.x = Game.ship.points[0].x;
        this.y = Game.ship.points[0].y;

        this.modX = Math.sin(Math.PI / 180 * this.a) * Bullet.speed * VAR.d;
        this.modY = -Math.cos(Math.PI / 180 * this.a) * Bullet.speed * VAR.d;
        // how bullet position get modified during its flight

    };


    // drawing bullet
    Bullet.draw = function () {
        for (let b in Bullet.all) {

            // collision detection
            for (let r in Rock.all) {
                if (Rock.all[r].hitTest(Bullet.all[b].x, Bullet.all[b].y)) {
                    Bullet.all[b].life += Bullet.life; // becasue of that bullet will be deleted
                    Rock.all[r].remove();
                    break;
                }

            }

            if (Bullet.all[b].life < Bullet.life) {
                Bullet.all[b].life++;
                Bullet.all[b].x += Bullet.all[b].modX;
                Bullet.all[b].y += Bullet.all[b].modY;

                if (Bullet.all[b].x < 0) {
                    Bullet.all[b].x += VAR.W;
                } else if (Bullet.all[b].x > VAR.W) {
                    Bullet.all[b].x -= VAR.W;
                }
                if (Bullet.all[b].y < 0) {
                    Bullet.all[b].y += VAR.H;
                } else if (Bullet.all[b].y > VAR.H) {
                    Bullet.all[b].y -= VAR.H;
                }

                Game.ctx.beginPath();
                Game.ctx.arc(Bullet.all[b].x, Bullet.all[b].y, 3, 0, 2 * Math.PI);
                Game.ctx.closePath();
                Game.ctx.fill();
            } else {
                Bullet.activeCount--;
                delete Bullet.all[b];
            }

        }
    }


};
