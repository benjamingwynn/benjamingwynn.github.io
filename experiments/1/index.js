var words = "hello|world|i|am|REDACTED|who|are|you|why|are|you|here|kitten|experiment|blue|red|okay|green|turn|words|here|there|madness|where|here|hear|nowhere|everywhere|time|nobody|all|nothing|something|track|understand|revolve|turn|rotate|return|remember|forget|delete|remove|destroy|forget|leave|tree|fire|water|ice|etc|unknown|program|london|speak|dance|sing|eat|play|sleep|nothing|nobody|noone|hope|defeat|miss|hit|transform|dog|cat|coin|fan|curtain|half|pony|drone|spy|math|aftermath|call|super|hole|star|split|text|word|world|create|element|interval|function|size|math|floor|random|length|mercy|mold|eye|toothpaste|chair|blanket|game|drop|ping|pong|cache|speaker|head|shoulder|knees|toes|mouse|mice|fall|rise|wheel|cave|man|woman|women|men|boy|girl|pen|pencil|are|my|our|us|together|reform|gold|silver|evolve".split("|");

function createTextElement(properties) {
	$("main").append("<span style='top:" + properties.y + "px; left:" + properties.x + "px;' class='size-" + Math.floor(Math.random() * 5) + " animated fadeIn glitch'>" + properties.text + "</span>");
}

setInterval(function(){
	createTextElement({
		x: Math.floor(Math.random() * $(window).width()),
		y: Math.floor(Math.random() * $(window).height()),
		text: words[Math.floor(Math.random() * words.length)]
	});
	
	/* if (Math.floor(Math.random() * 2) === 0) {
		var target = $("main>span");
		$(target[Math.floor(Math.random() * target.length)]).fadeOut('slow');
	} */
}, 250);
