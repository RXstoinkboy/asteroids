let Sound = {
    active: false,
    init: function () {
        Sound.fx = new Howl({
            src: ['audio/asteroids.' + (Modernizr.audio.m4a ? 'm4a' : 'ogg')],
            sprite: { // sound is one file
                bum1: [0, 1100], // object to extract a proper part of sound
                bum2: [1125, 1000], // first number is beginning of sound in ms
                laser: [2150, 290], // second number is sound length
                win: [2475, 575],
                thrust: [3100, 290]
            },
            onload: Sound.loaded
        });
    },
    loaded: function () {
        Sound.active = true;
    },
    play: function (s) {
        if (Sound.active) {
            Sound.fx.play(s);
        }
    }
}

module.exports = Sound;