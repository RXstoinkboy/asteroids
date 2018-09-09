// onload oznacza, że elementy ładują się po tym jak wszystkie elemtny okna się już załadują
window.onload = function () {

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
    rand: function (min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
}

// jakby była opcja new game to warto utworzyć obiekt Game jako class
// w Game robimy Canvas
// Game to nie jest typowy zmienna, tylko obiekt przypisany do window
Game = {
    init: () => {

        // drawing canvas
        Game.canvas = document.createElement('canvas');
        Game.ctx = Game.canvas.getContext('2d');

        // initializing layout function
        Game.layout();

        // dynamic resize tracking
        window.addEventListener('resize', Game.layout, false)

        document.body.appendChild(Game.canvas);

        // calling ship instance
        Game.ship = new Ship()

        // event listeners for ship controls
        window.addEventListener('keydown', Game.onKey, false);
        window.addEventListener('keyup', Game.onKey, false);

        // animation initialisation
        Game.animationLoop();
    },

    // steering
    onKey: (e) => {

        // working only with arrows and 'space'
        if (e.keyCode == 32 || e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39) {
            e.preventDefault();

            // ship rotation
            // checkes if a give key is not already pressed
            if (e.type == 'keydown' && !Game['key_' + e.keyCode]) {
                Game['key_' + e.keyCode] = true;

                // if two keys are pressed, new one will work
                if (e.keyCode == 37) {
                    Game.key_39 = false;
                } if (e.keyCode == 39) {
                    Game.key_37 = false;
                }

                // stop rotation after key release
            } else if (e.type == 'keyup') {
                Game['key_' + e.keyCode] = false;
            }

        };
    },

    // dynamic dimension calculations
    layout: (e) => {
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

    // main animation function
    animationLoop: (time) => {
        requestAnimationFrame(Game.animationLoop);
        if (time - VAR.lastTime >= 1000 / VAR.fps) {
            VAR.lastTime = time;
            // clearing previous frame            
            Game.ctx.clearRect(0, 0, VAR.W, VAR.H);
            // drawing ship instance in every frame
            Game.ship.draw();
        };
    },
}