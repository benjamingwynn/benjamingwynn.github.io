
			// On click of a tag
			$(".tag").click(function() {
				if ($(".tag").length > 1) {
					var targetTag = $(this).text().toLowerCase();

					if ($(this).hasClass('active')) {

						$('.tag').removeClass('active');
						$("article").fadeTo('fast', 1);

					} else {
						$("article").each(function() {
							if ($(this).children(".tag").text().toLowerCase() == targetTag) {
								$(this).children(".tag").addClass('active');
								$(this).fadeTo('fast', 1);
							} else {
								$(this).children(".tag").removeClass('active');
								$(this).fadeTo('fast', 0.1);
							}
						});
					}
				}
			});
			
			String.prototype.replaceAll = function(x, y) {
				return this.toString().split(x).join(y);
			}

			$("code").each(function(){
				// innerhtml to text
				$(this).text(
					this.innerHTML
						.replaceAll('&lt;', '<')
						.replaceAll('&gt;', '>')
						.replaceAll('&quot;', '\'')
						.replaceAll('&amp;', '&')
				);

				// Correctly indent code
				var baseTabCount = 0;
				var stringsplit = this.innerHTML.split("\n");
				
				if (stringsplit.length < 1) {
					this.innerHTML = "";
				} else {
					this.innerHTML = "<span>" + this.innerHTML + "</span>";
				}

				for (var i = 1; i < stringsplit.length - 1; i++) {
					if (stringsplit[i].trim() != "") {

						var chars = stringsplit[i].split("");

						var thisTabCount = 0;
						var finishedTabs = false;

						for (var x = 0; x < chars.length; x++) {
							if ((chars[x] == " " || chars[x] == "\t") && !finishedTabs) {
								thisTabCount++;
							} else {
								finishedTabs = true;
								if (baseTabCount == 0) baseTabCount = thisTabCount;
							}
						}

						var tabCount = 0;

						if (thisTabCount > baseTabCount) {
							for (var tabs = 0; tabs < thisTabCount - baseTabCount; tabs++) {
								tabCount++;
							}
						}

						this.innerHTML += "<span style='margin-left:" + tabCount + "em'>" + stringsplit[i] + "</span><!--<br>-->";
					} else {
						this.innerHTML += "<br>"
					}
				}
			});
			// Load background:

			var bg = Math.round(new Date().getHours() / (24 / 7) + 1);
			$("header").css('background-image', 'url("/background/' + bg + '.jpg")');
			$("body").css('background-image', 'url("/background/' + bg + '-small.jpg")');
			// Once everything has loaded:
			$( document ).ready(function() {
				$("#load-overlay").fadeOut('slow');
			});
