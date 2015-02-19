/* 
	Animate-all-the-things.js

	I wrote this originally for techanet.co.uk, but we never ended up using it.
	This script requires animate.css and jQuery
*/

var allow_animation = false;

// Animation from animate.css to use
var animation = "fadeInUp";

// Animate what?
var animateObjects = ["#wrapper *"];

// This is broken :(
var doAnimateOnScrollUp = false;

function animationEvent() {
	if (allow_animation) {
		var scrollpos = $(document).scrollTop();
		for (i = 0; i < animateObjects.length; i++) {
			$(animateObjects[i]).each(function(index) {
				var elem_position = $(this).offset().top;
				var elem_height = $(this).height();
				var window_height = $(window).height();

				if (!$(this).hasClass('noanimate')) {
					$(this).css({opacity: 0});
					if (scrollpos >= elem_position - window_height + 1) {
						if (!$(this).hasClass('animated') && !$(this).hasClass(animation)) {
							$(this).css({opacity: 1});
							$(this).addClass('animated ' + animation);
						}
					} else if (scrollpos < elem_position - window_height && doAnimateOnScrollUp) {
						if ($(this).hasClass('animated') && $(this).hasClass(animation)) {
							$(this).removeClass('animated ' + animation);
						}
					} else if (scrollpos > elem_position && doAnimateOnScrollUp) {
						if ($(this).hasClass('animated') && $(this).hasClass(animation)) {
							$(this).removeClass('animated ' + animation);
						}
					}
				}
			})
		}
	}
}