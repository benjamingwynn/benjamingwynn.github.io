// On Page Scroll
$(document).on( 'scroll', '#wrapper', function(){
	if ($('#controls').position()["top"] - $('#controls').height() <= 0) {
		$('#hideshowbutton').fadeIn('fast');
	} else {
		$('#hideshowbutton').fadeOut('fast');
	}
});

// NSFL warning
$('.nsfl').append("<div class='nsfl-warning'><h1>Hidden Content</h1><p>This project may contain bad language, flashing images, loud noises, obnoxious text or otherwise generally not be safe for work. This is your trigger warning.</p><div style='text-align=center; width=100%'><button class='nsfl-button' onclick='hidensfl()'>I'm cool with this</button></div></div>" );

// NSFL button press
function hidensfl() {
	$('.nsfl *').fadeIn('fast');
	$('.nsfl-warning').hide();
}

// On hover of 'archived' class
$(".archived").hover(
	function() {
		$($(this).find("p:first")).append($("<div class='archive-banner'><p>This project has been archived and is no longer updated</p></div>"));
	}, function() {
		$(this).find( ".archive-banner" ).remove();
	}
);

// Random array
var rand = [
	"sudo rm -rf --no-preserve-root /",
	"home of particles and stuff",
	"i make things on the internet",
	"error 404 - tagline not found"
]

// Set random subheading
$("header h2").text(rand[Math.floor(rng(0, rand.length))]);

// Hide show button function
function hideshow() {
	if ($('#wrapper').css('opacity') == 0) {
		// The site is hidden, the button was pressed, show the site.
		$('#wrapper').fadeTo(250, 255);
	} else {
		// The site is visible, the button was pressed, hide the site.
		$('#wrapper').fadeTo(250, 0);
	}
}