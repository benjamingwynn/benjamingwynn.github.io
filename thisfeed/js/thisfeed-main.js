var colours = [
	'#7FFFD4', '#5F9EA0', '#ADFF2F', '#6495ED', '#1E90FF', 
	'#FF69B4', '#7CFC00', '#ADD8E6', '#F08080', '#90EE90',
	'#FFB6C1', '#FFA07A', '#20B2AA', '#87CEFA', '#778899',
	'#B0C4DE', '#66CDAA', '#00FA9A', '#CD853F', '#4169E1',
	'#4682B4', '#87CEEB', '#00FF7F', '#4682B4', '#EE82EE', 
	'#EE82EE', '#F5DEB3'
];

// When DOM stuff is ready
$(document).ready(function() {
	$('#loadtext').show();
	$('#nojstext').hide();
	$('.feed').hide();
	$('#image-background').hide();
	$('#image-background-overlay').hide();
	feedClock();
});

// When all stuff has loaded:
$(window).load(function() {
	// wait one second so the user can see the pretty animation :3
	setTimeout(function(){animate('header', 'fadeOutUp', true);}, 1000);
});

// Feed Clock:
function feedClock() {
	var feeds = $('.feed');
	var i = 1;
	createFeed(feeds[0]);
	window.setInterval(function() {
		createFeed(feeds[i]);

		if (i === 0) { // if this is the first feed
			destroyFeed(feeds[feeds.length - 1]); // destroy the last feed
		} else { // if this isn't the last feed
			destroyFeed(feeds[i - 1]); // destroy the previous feed
		}

		if (i === feeds.length - 1) { // if we created the last feed
			i = 0; // create the first feed next
		} else { // otherwise
			i = i + 1; // create the next feed
		}
	}, 5000);
}

function createFeed(feed) {
	animate(feed, 'fadeInLeft', false);
	tweet = $($(feed).find('p')).text();
	if (tweet_images_can_be_backgrounds) {
		$('#image-background').fadeOut('slow');
	}

	// If the tweet contains a link:
	if (tweet.indexOf("http://") > -1) {
		// Isolate everything after the link:
		after_http = tweet.substring(tweet.indexOf("http://"), tweet.length);
		// Look for spaces after http
		if (after_http.indexOf(" ") > -1) {
			isolated_link = after_http.substring(0, after_http.indexOf(" "));
		} else {
			isolated_link = after_http;
		}

		/* This sets isolated_link as a background, if the links is not
		 * an image then all tested browsers will disregard it - meaning
		 * I don't need to check if it's an image or not.
		 */
		showImage(isolated_link);
	}

	// colours!
	if ($(feed).data('colour') === 'rand') {
		letter_char = $($(feed).find('p')).text().substr(0,1).toLowerCase();
		letter_number = letter_char.charCodeAt(0) - 97;
		if (colours[letter_number]) {
			$('body').animate({backgroundColor: colours[letter_number]}, 'slow');
		} else {
			$('body').animate({backgroundColor: '#333'}, 'slow');
		}
	} else {
		$('body').animate({backgroundColor: $(feed).data('colour')}, 'slow');
	}
}

function destroyFeed(feed) {
	animate(feed, 'fadeOutLeft', true);
}

function showImage(image) {
	if (tweet_images_can_be_backgrounds) {
		console.log("showImage got '" + image + "'");
		$('#image-background').css('backgroundImage', 'url("' + image + '")');
		$('#image-background').fadeIn('slow');
	}
}

function animate(jquery_object, animation_css_name, is_destroy) {
	$(jquery_object).show();
	$(jquery_object).addClass('animated');
	$(jquery_object).addClass(animation_css_name);
	$(jquery_object).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
		$(jquery_object).removeClass(animation_css_name);
		if (is_destroy) {
			$(jquery_object).hide();
		}
	});
}