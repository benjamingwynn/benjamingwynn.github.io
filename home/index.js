var greetings = [
	"Hi",
	"Hello",
	"Hey"
]

window.onload = function() {
	$("header h1").text(greetings[Math.floor(Math.random() * greetings.length)]);
	
	setTimeout(function() {
		$("main").css("display", "flex");
		$("main *").addClass("animated fadeInUp");
	}, 1000);
}

function searchSubmit(data) {
	console.log(data);
}