// blur
$('#background1').blurjs({customClass: 'blurjs', radius: 10, persist: false });

// Random array
var rand = [
	"sudo rm -rf --no-preserve-root /",
	"home of particles and stuff",
	"i make things on the internet",
	"error 404 - tagline not found",
	"white != black"
]

// Set random subheading
$("header h2").text(rand[Math.floor(rng(0, rand.length))]);

// typewriter stuff
$('#typewriter').fadeIn('fast');
var typewriter = require('typewriter');
var twSpan = document.getElementById('typewriter');
var tw = typewriter(twSpan).withAccuracy(98)
.withMinimumSpeed(30)
.withMaximumSpeed(40)
.build();
tw.put('$ ')
.waitRange(100, 500)
.type('whoami')
.put('<br/>')
.waitRange(100, 500)
.put('xenxier<br/>')
.put('$ ')
.waitRange(100, 500)
.type('chown xenxier * && chmod +x home.js')
.waitRange(100, 500)
.put('<br/>$ ')
.waitRange(100, 500)
.type('./home.js')
.waitRange(100, 500)
.put('<br/>$ ', function () {
	$('#wrapper').fadeIn('slow');
	$('#wrapper *').fadeIn('slow');
	allow_animation = true;
	animationEvent();
})
.waitRange(500, 1000)
.type('exit')
.put('<br/>')
.wait(500)
.put('logout<br/><br/>')
.put('[Process completed]<br/>')
.wait(500)
.put('', function () {
	$('#typewriter').fadeOut('slow');
})