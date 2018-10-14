// Stuff for the rotating background images.

var cycleDelay = 5; // Specify, in seconds, how long to wait before cycling to the next image
var fadeTime = 4; // Specify, in seconds, how long dissolve should take

var tl = new TimelineMax({ repeat: -1 });
tl.append(TweenMax.to("#bg-img1", fadeTime, { css: { autoAlpha: 1 }, yoyo: true, repeat: 1, repeatDelay: cycleDelay }));
tl.append(TweenMax.to("#bg-img2", fadeTime, { css: { autoAlpha: 1 }, yoyo: true, repeat: 1, repeatDelay: cycleDelay }), -fadeTime);
tl.append(TweenMax.to("#bg-img3", fadeTime, { css: { autoAlpha: 1 }, yoyo: true, repeat: 1, repeatDelay: cycleDelay }), -fadeTime);
tl.append(TweenMax.to("#bg-img4", fadeTime, { css: { autoAlpha: 1 }, yoyo: true, repeat: 1, repeatDelay: cycleDelay }), -fadeTime);
tl.append(TweenMax.to("#bg-img5", fadeTime, { css: { autoAlpha: 1 }, yoyo: true, repeat: 1, repeatDelay: cycleDelay }), -fadeTime);