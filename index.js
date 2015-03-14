// Load glitch.js
distort_objects_one_at_a_time=false; distort_chance=8; glitch();

// On scroll:
$(window).scroll(function() {
	animationEvent();
});

// On resize:
window.onresize = function(event) {
	animationEvent();
}

// Random array
var rand = [
	"sudo rm -rf --no-preserve-root /",
	"home of particles and stuff",
	"i make things on the internet",
	"error 404 - tagline not found",
	"password is a bad password",
	"i am not benjamin"
]

// Set random subheading
$("header h2").text(rand[Math.floor(rng(0, rand.length))]);

window.onload = function() {
	allow_animation = true
	$('*').show();
	animationEvent();
}