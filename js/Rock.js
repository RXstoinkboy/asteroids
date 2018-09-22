Rock.count = 0; // Rock counter
Rock.all = {}; // object to store all generated Rocks
// specific properties of each Rock depending on the size
Rock.data = [
    { r: 0.025, speed: 0.0005, minAngle: 60, maxAngle: 90 },
    { r: 0.08, speed: 0.00025, minAngle: 50, maxAngle: 70 },
    { r: 0.2, speed: 0.00007, minAngle: 30, maxAngle: 45 }
];

function Rock(size, x, y) {
    Rock.count++;
    this.id = Rock.count;
    Rock.all[this.id] = this; // we store new Rock in our object
    this.size = size !== undefined ? size : 2; // small, medium or big
    this.r = Rock.data[this.size].r; // radius
    // random position besides center of the screen
    this.x = x !== undefined ? x : (VAR.rand(0, 1) ? VAR.rand(0, 30) / 100 : VAR.rand(70, 100) / 100) * VAR.W;
    this.y = y !== undefined ? y : (VAR.rand(0, 1) ? VAR.rand(0, 30) / 100 : VAR.rand(70, 100) / 100) * VAR.H;
    // Rocks have steady random speed    
    this.modX = Rock.data[this.size].speed * VAR.rand(1, 10) * (VAR.rand(0, 1) ? 1 : -1);
    this.modY = Rock.data[this.size].speed * VAR.rand(1, 10) * (VAR.rand(0, 1) ? 1 : -1);
    this.points = []; // every point of Rock shape is stored here
    let a = 0;
    while (a < 360) {
        a += VAR.rand(Rock.data[this.size].minAngle, Rock.data[this.size].maxAngle);
        this.points.push({
            x: Math.sin(Math.PI / 180 * a) * this.r,
            y: Math.cos(Math.PI / 180 * a) * this.r
        });
    }
};
// collision detection
Rock.prototype.hitTest = function (x, y) {
    if (x > this.x - this.r * VAR.d && x < this.x + this.r * VAR.d && y > this.y - this.r * VAR.d && y < this.y + this.r * VAR.d) {
        //
        Game.hit_ctx.clearRect(this.x - this.r * VAR.d, this.y - this.r * VAR.d, this.r * 2 * VAR.d, this.r * 2 * VAR.d);
        //
        Game.hit_ctx.beginPath();
        for (let i = 0; i < this.points.length; i++) {
            // hit_ctx rocks drawing
            Game.hit_ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * VAR.d + this.x, this.points[i].y * VAR.d + this.y);
        };
        Game.hit_ctx.closePath();
        Game.hit_ctx.fill();
        //
        if (Game.hit_ctx.getImageData(x, y, 1, 1).data[0] == 255) { // x,y coordinates, 1px by 1px area tested
            return true;
        }
    }
    return false;

};


// method for each Rock instance
Rock.prototype.draw = function () {
    this.x += this.modX * VAR.d;
    this.y += this.modY * VAR.d;

    if (this.x + this.r * VAR.d < 0) {
        this.x += VAR.W + (this.r * 2 * VAR.d);
    } else if (this.x - this.r * VAR.d > VAR.W) {
        this.x -= VAR.W + (this.r * 2 * VAR.d);
    };
    if (this.y + this.r * VAR.d < 0) {
        this.y += VAR.H + (this.r * 2 * VAR.d);
    } else if (this.y - this.r * VAR.d > VAR.H) {
        this.y -= VAR.H + (this.r * 2 * VAR.d);
    };

    Game.ctx.beginPath();

    for (let i = 0; i < this.points.length; i++) {
        // hit_ctx rocks drawing
        Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * VAR.d + this.x, this.points[i].y * VAR.d + this.y);
        Game.hit_ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x * VAR.d + this.x, this.points[i].y * VAR.d + this.y);
    };
    // ctx methods

    Game.ctx.closePath();
    Game.ctx.stroke();
};

// method to remove Rocks
Rock.prototype.remove = function () {
    Sound.play('bum' + VAR.rand(1, 2));
    // if Rock was medium or large -> generate new smaller rock
    if (this.size > 0) {
        for (let i = 0, j = VAR.rand(2, 4); i < j; i++) {
            new Rock(this.size - 1, this.x, this.y);
        }
    }
    Dot.add(this.x, this.y);
    delete Rock.all[this.id];
};

// method for whole Rock object
// we call it once to call draw method for each Rock instance
Rock.draw = function () {
    Rock.num = 0;
    for (let k in Rock.all) {
        Rock.num++;
        Rock.all[k].draw();
    };
    if (Rock.num === 0 && !Game.success) {
        Game.success = true;
        Sound.play('win');
    }
};