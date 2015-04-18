// Random array
var rand = [
	"sudo rm -rf --no-preserve-root /",
	"home of particles and stuff",
	"i make things on the internet",
	"error 404 - tagline not found",
	"password is a bad password",
	"hello, i am benjamin",
	"i make your browser do awesome things",
	"[redacted]",
	"I'm using motion controls!"
]

// Set random subheading
window.onload = function() {
	$("header h2").text(rand[Math.floor(Math.random() * rand.length)]);
}