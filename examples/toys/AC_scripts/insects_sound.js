//  Adds an insect noise to Toybox.
//  By Ryan Karpf 10/20/2015
//
//  Distributed under the Apache License, Version 2.0.
//  See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
//



var soundURL = "http://hifi-public.s3.amazonaws.com/ryan/insects3.wav";
var position = { x: 560, y: 495, z: 474};
var audioOptions = {
    position: position,
    volume: .25,
    loop: true
};

var sound = SoundCache.getSound(soundURL);
var injector = null;
var count = 300;

Script.update.connect(function() {
  if (count > 0) {
    count--;
    return;
  }
  
  if (sound.downloaded && injector === null) {
    print("Sound downloaded.");
    injector = Audio.playSound(sound, audioOptions);
    print("Playing: " + injector);
  }
});

Script.scriptEnding.connect(function() {
    if (injector !== null) {
        injector.stop();
    }
});