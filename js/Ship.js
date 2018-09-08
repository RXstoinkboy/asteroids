class Ship {
    constructor() {
        this.r = 0.04;
        this.rearA = 50;
        this.a = 0;
        this.x = VAR.W / 2;
        this.y = VAR.H / 2;
        this.points = [{}, {}, {}];
    }

    draw() {
        if (Game.key_37 || Game.key_39) {
            this.a = this.a + 7 * (Game.key_37 ? -1 : 1);
        }

        Game.ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            this.tempA = i === 0 ? this.a : (this.a + 180 + (i == 1 ? this.rearA : -this.rearA));
            this.tempR = i === 0 ? this.r : (this.r * 0.7);
            this.points[i].x = Math.sin(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.x;
            this.points[i].y = -Math.cos(Math.PI / 180 * this.tempA) * this.tempR * VAR.d + this.y;

            Game.ctx[i === 0 ? 'moveTo' : 'lineTo'](this.points[i].x, this.points[i].y);

        }
        Game.ctx.closePath();
        Game.ctx.stroke();
    }
} 