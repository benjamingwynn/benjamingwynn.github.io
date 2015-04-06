/*
 *	markdot.js 0.1
 *	Written by Benjamin Gwynn (http://xenxier.com)
 */

var markdot = {
	md: new String(),
	version: "0.1.0-dev",

	markdot: function(file, target) {
		// Reset
		markdot.md = "";
		
		// Test jQuery
		if (typeof(jQuery) === "undefined") {
			console.error("Markdot failed to load as jQuery is missing.");
			return;
		} else if (parseFloat($.fn.jquery) > 1 && parseFloat($.fn.jquery) < 2) {
			console.info("Markdot " + markdot.version + " - Created by Benjamin Gwynn (http://xenxier.com)");
			console.info("Markdot loaded with jQuery version " + $.fn.jquery + ".");
		} else {
			console.error("Markdot failed to load due to an incompatible jQuery library.");
			return;
		}
		
		// Allow older IE versions to recognise HTML5 elements
		if (window.navigator.userAgent.indexOf('MSIE ') > -1) {
			console.warn("This is an older version of IE, adding elment support via .createElement.");
		    document.createElement('article');
		    document.createElement('aside');
		    document.createElement('footer');
		    document.createElement('header');
		    document.createElement('hgroup');
		    document.createElement('main');
		    document.createElement('nav');
		    document.createElement('section');
		}
		
		// Add CSS HTML5 element support for older browesers
		$("head").append("<style>article,aside,footer,header,hgroup,main,nav,section{display:block}</style>");
	
		// Put the file into a string array, split by new lines
		markdot.md = this.readTextFile(file).split("\n");
	
		// When the document is ready to be manipulated
		$(document).ready(function() {
			if (typeof(target) === "undefined") {
				markdot.buildPage("body");
			} else {
				markdot.buildPage(target);
			}
		});
	},

	buildPage: function(target) {
		var started = Date.now();
		
		// Remove noscript. Even though it won't display, it makes our markup look ugly.
		$("noscript").remove();

		// The first line of a markdot file is the title of the document (stripped of formatting)
		$("head").append("<title>" + markdot.md[0].replace(/\W/g, '') + "</title>");

		// Build
		if (target === "body") {
			var header = markdot.buildHeader();
			$(target).append(header[0]);
			var content = markdot.buildContent(header[1]);
			$(target).append(content[0]);
			$(target).append(markdot.buildFooter(content[1]));
		} else {
			markdot.buildContent(0);
		}
		
		// Log time
		console.info("Markdot page generated in ~" + (Date.now() - started) + "ms.");
	},

	/*
		buildHeader
		This builds the <header> tag of the page.
	*/

	buildHeader: function() {
		var header = new String();
		var i;
		
		// Loop through the document
		for (i = 0; i < markdot.md.length; i++) {
			// Was this an empty line?
		    if (markdot.md[i] === "") {
				// After the first empty line, stop the loop.
				break;
		    }
		
			if (i < 6) {
				header = header + "<h" + (i + 1) + ">" + markdot.parseLine(i + 1) + "</h" + (i + 1) + ">"
			} else {
				header = header + "<h6>" + markdot.parseLine(i + 1) + "</h6>"
			}
		}
		
		return ["<header>" + header + "</header>", i + 1];
	},
	
	buildContent: function(startline) {
		var build = new String("<section>");
		var currenthead = new String(Math.random());
		var lastline = 0;
		
		// Find the last empty line
		for (var i = startline; i < markdot.md.length + 1; i++) {
			if (markdot.parseLine(i) === "") {
				lastline = i;
			}
		}
		
		// Build body
		for (var i = startline; i < lastline; i++) {		
			// Get the line
			var line = markdot.parseLine(i);
			
			// Ignore the line if it's empty
			if (line !== "") {
				// p/title?
				if (!markdot.isCharacterAlphabetical(line.charAt(line.length - 1))) {
					// If we haven't started a article tag
					if (build === "") {
						build = build + "<article>";
					}

					// Add this line as <p>
					build = build + "<p>" + line + "</p>"
				} else { // this is a title
					if (line.toLowerCase().search(currenthead.toLowerCase() + ":") > -1) {
						// Add everything after :
						build = build + "<h2>" + line.slice(line.indexOf(":") + 1) + "</h2>"
					} else if (line.toLowerCase().search(currenthead.toLowerCase()) > -1) {
						// It doesn't, add the whole thing
						build = build + "<h2>" + line + "</h2>"
					} else {
						// It doesn't, therefore this is a h1 line
						currenthead = line;
						build = build + "</article><article id=" + line.replace(/\s+/g, '').toLowerCase() + "><h1>" + line + "</h1>";
					}
				}
			}
		}
		
		return ["</article></section>" + build, lastline];
	},
	
	buildFooter: function(startline) {
		var footer = new String("<footer>");
		
		// Find the last empty line
		for (var i = startline; i < markdot.md.length; i++) {
			if (i < startline + 6) {
				footer = footer + "<h" + (i - startline + 1) + ">" + markdot.parseLine(i + 1) + "</h" + (i - startline + 1) + ">"
			} else {
				footer = footer + "<h6>" + markdot.parseLine(i + 1) + "</h6>"
			}
		}	
		return footer + "</footer>";
	},


	parseTag: function(line, tag, html, linenumber) {
		var tagcount = (line.split(tag).length - 1);
		
		// If the line has 0 tags, abort
		if (tagcount == 0) {
			return line;
		}
		
		// If the number of tags is not a multiple of two, abort
		if ((line.split(tag).length - 1) % 2 != 0) {
			markdot.badSyntax(linenumber, "Odd number of " + tag + " characters, ignoring parsing of " + tag + " on this line.")
			return line;
		}
		
		var newline = new String();
		var splitted = line.split(tag);
		
		for (var i = 0; i < tagcount; i += 2) {
			newline = newline + splitted[i] + "<" + html + ">" + splitted[i + 1] + "</" + html + ">";
		}
		
		return newline + splitted[tagcount];
	},

	parseLine: function(linenumber) {
		// Split with the refuse parse character
		var codesplit = markdot.getLine(linenumber).split("&gt;", 2);
		
		// If there is no text before the refuse parse character
		if (codesplit[0] === "") {
			// Don't parse
			return markdot.getLine(linenumber).slice(4);
		} else {
			// Parse
			return markdot.linkParse(markdot.parseTag(markdot.parseTag(markdot.parseTag(markdot.getLine(linenumber), "*", "strong", linenumber), "~", "del", linenumber), "_", "em", linenumber));
		}
	},
	
	/*
		Checks for links and converts them into link tags
	*/
	
	linkParse: function(line) {
		// Parse for image links first
		
		var splitted = line.split(" ");
		
		for (var i = 0; i < splitted.length; i++) {
			if (markdot.isImageLink(splitted[i])) {
				// If the last character is a dot, put that out of the link
				if (splitted[i].charAt(splitted[i].length - 1) === ".") {
					splitted[i] = "<img src='" + splitted[i].slice(0, splitted[i].length - 1) + "'>.";
				} else {
					splitted[i] = "<img src='" + splitted[i] + "'>";
				}
			} else if (markdot.isValidHyperlink(splitted[i])) {
				// loop backwards and look for where the hyperlink should start
				
				for (var l = i - 1; l > 0; l--) {
					// If this is a hyperlink or a dot part?
					if (markdot.isValidHyperlink(splitted[l]) || !markdot.isCharacterAlphabetical(splitted[l].charAt(splitted[l].length - 1))) {
						// Exit loop
						l++;
						break;
					}
				}
				
				// Add this to the splitted array
				if (markdot.isCharacterAlphabetical(splitted[i].charAt(splitted[i].length - 1))) {
					splitted[l] = "<a href='" + splitted[i] + "'>" + splitted[l]
					splitted[i] = "</a>"
				} else {
					splitted[l] = "<a href='" + splitted[i].slice(0, splitted[i].length - 1) + "'>" + splitted[l]
					splitted[i] = "</a>"
				}
			}
		}
		
		// Rejoin splitted
		var newline = "";
		for (var i = 0; i < splitted.length; i++) {
			newline = newline + splitted[i].trim() + " ";
		}
		
		return newline.trim();
	},
	
	isValidHyperlink: function(string) {
		if((string.search("http://") > -1)
		|| (string.search("https://") > -1)
		|| (string.search("ftp://") > -1)
		|| (string.search("mailto:") > -1)) {
			return true;
		}
	},
	
	isImageLink: function(hyperlink) {
		var negate = 1;
		
		if (hyperlink.split(".")[hyperlink.split(".").length - negate] === "") {
			negate++;
		}
		
		switch(hyperlink.split(".")[hyperlink.split(".").length - negate]) {
			case "png":
			case "jpg":
			case "jpeg":
			case "gif":
			case "bmp":
			case "svg":
			case "webp":
			case "apng":
			case "mng":
			case "tiff":
			case "tif":
			case "xbm":
			case "jp2":
				return true;
			default:
				return false;
		}
	},

	isCharacterAlphabetical: function(character) {
		// We use switch/case over an array, since switch/case is faster.
		switch (character.toLowerCase()) {
			case "a":
			case "b":
			case "c":
			case "d":
			case "e":
			case "f":
			case "g":
			case "h":
			case "i":
			case "j":
			case "k":
			case "l":
			case "m":
			case "n":
			case "o":
			case "p":
			case "q":
			case "r":
			case "s":
			case "t":
			case "u":
			case "v":
			case "w":
			case "x":
			case "y":
			case "z":
			case "0":
			case "1":
			case "2":
			case "3":
			case "4":
			case "5":
			case "6":
			case "7":
			case "8":
			case "9":
				return true;
			default:
				return false;
		}
	},
	
	badSyntax: function(linenumber, tell) {
		console.warn("Invalid Markdot syntax on line " + linenumber + ". " + tell);
	},
	
	getLine: function(linenumber) {
		// Get the line and trim it
		var line = markdot.md[linenumber - 1].trim();
		
		// Fix > and <
		line = line.replace(/>/g, "&gt;");
		line = line.replace(/</g, "&lt;");
		
		// Return
		return line;
	},

	// Modified version of http://stackoverflow.com/a/14446538
	readTextFile: function(file) {
		var allText;
	    var rawFile = new XMLHttpRequest();
	    rawFile.open("GET", file, false);
	    rawFile.onreadystatechange = function () {
	        if (rawFile.readyState === 4) {
	            if (rawFile.status === 200 || rawFile.status == 0) {
	                allText = rawFile.responseText;
	            }
	        }
	    }
	    rawFile.send(null);
		return allText;
	}
}