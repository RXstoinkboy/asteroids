// onload oznacza, że elementy ładują się po tym jak wszystkie elemtny okna się już załadują
window.onload = function() {
    Game.init();
};

// żeby przyspieszyć pisanie w dalszej części kodu, tworzymy sobie zmienną VAR, która przechowuje elementy dotyczące gry
VAR = {
    fps: 60,
    W: 0,
    H: 0,
    lastTime: 0,

    //lastUpdate chyba nie potrzebny
    lastUpdate: -1,
    rand: function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
}

// jakby była opcja new game to warto utworzyć obiekt Game jako class
// w Game robimy Canvas
// Game to nie jest typowy zmienna, tylko obiekt przypisany do window
Game = {
    init: function() {
        Game.canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');
        Game.layout();

        window.addEventListener('resize', Game.layout)

        document.body.appendChild(Game.canvas);

        Game.animationLoop();
    },
    layout: function(e) {
        VAR.W = window.innerWidth;
        VAR.H = window.innerHeight;

        VAR.d = Math.min(VAR.H, VAR.W);
        Game.canvas.width = VAR.W;
        Game.canvas.height = VAR.H;

        Game.ctx.fillStyle = 'white';
        Game.ctx.strokeStyle = 'white';
        Game.ctx.lineWidth = 3;
        Game.ctx.lineJoin = 'round';
    },

    animationLoop: function(time) {
        requestAnimationFrame(Game.animationLoop);
        if (time - VAR.lastTime >= 1000 / VAR.fps) {
            VAR.lastTime = time;
            Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
        };
    },
}