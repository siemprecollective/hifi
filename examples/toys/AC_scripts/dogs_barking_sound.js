//  Adds a dogs barking noise to Toybox.
//  By Ryan Karpf 10/20/2015
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//


var SOUND_URL = "http://hifi-public.s3.amazonaws.com/ryan/dogs_barking_1.L.wav";
var SOUND_POSITION = { x: 523, y: 495, z: 469 };

var MINUTE = 60 * 1000;
var PLAY_SOUND_INTERVAL = 1 * MINUTE;

var audioOptions = {
    position: SOUND_POSITION,
    volume: .05,
    loop: false,
};

var sound = SoundCache.getSound(SOUND_URL);
var injector = null;

function playSound() {
    print("Playing sound");
    if (injector) {
        // try/catch in case the injector QObject has been deleted already
        try {
            injector.stop();
        } catch (e) {
        }
    }
    injector = Audio.playSound(sound, audioOptions);
}

function checkDownloaded() {
    if (sound.downloaded) {
        print("Sound downloaded.");
        Script.clearInterval(checkDownloadedTimer);
        Script.setInterval(playSound, PLAY_SOUND_INTERVAL);
        playSound();
    }
}

// Check once a second to see if the audio file has been downloaded
var checkDownloadedTimer = Script.setInterval(checkDownloaded, 1000);

Script.scriptEnding.connect(function() {
    if (injector) {
        injector.stop();
    }
});