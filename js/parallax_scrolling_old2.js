function parallax_scrolling() {
	"use strict";

	var scroll_height;
	var window_height;
	var window_width;
	var background;
	var background_height;
	var scroll_top;
	var scroll_amount;
	var offset_px;

	//Account for different themes
	var theme = ["theme_blue", "theme_orange", "theme_legacy"];
	var current_theme = document.getElementById("page_theme").getAttribute("href").substr(4).replace(".css", "");
	background = document.querySelectorAll(".bg").item(currentThemePtr());
	if (background == null) {
		return;
	}

	//Create cross browser requestAnimationFrame method:
	window.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(f) {
			setTimeout(f, 16)
		}

	//On Scroll Event
	window.addEventListener("scroll", function() {
		getHeights();
	}, false);

	//On Resize Event
	window.addEventListener("resize", function() {
		getHeights();
		getWidth();
	}, false);

	//Initial Call on PageLoad
	setInterval(animateParallax(), 10);

	//On Theme Change Event
	var theme_btn = document.querySelectorAll(".swap-theme");
	for (var i = 0; i < theme_btn.length; i++) {
		theme_btn.item(i).addEventListener("click", function() {
			current_theme = document.getElementById("page_theme").getAttribute("href").substr(4).replace(".css", "");
			background = document.querySelectorAll(".bg").item(currentThemePtr());
			setInterval(animateParallax(), 10);
		}, false);
	}

	//Return current theme background
	function currentThemePtr() {
		for (var i in theme) {
			if (current_theme == theme[i]) {
				return i;
			}
		}
		//return -1 if nothing matches
		return -1;
	}

	//Get Scroll Height/ Window Height/ Background Height for correct presentation
	function getHeights() {
		scroll_height = document.body.scrollHeight;
		window_height = window.innerHeight;
		scroll_top = window.pageYOffset;
		if (background != null) {
			background_height = background.clientHeight;
		}
	}

	//Get Width to set Picture Fallbacks
	function getWidth() {
		window_width = window.innerWidth;
		if (window_width > 1920) {
			if (currentThemePtr() == 0) {
				background.setAttribute("src", "img/background-blue-ultra.jpg");
			} else if (currentThemePtr() == 1) {
				background.setAttribute("src", "img/background-orange-ultra.jpg");
			}
		} else if (window_width > 1080) {
			if (currentThemePtr() == 0) {
				background.setAttribute("src", "img/background-blue-high.jpg");
			} else if (currentThemePtr() == 1) {
				background.setAttribute("src", "img/background-orange-high.jpg");
			}
		} else {
			if (currentThemePtr() == 0) {
				background.setAttribute("src", "img/background-blue-original.jpg");
			} else if (currentThemePtr() == 1) {
				background.setAttribute("src", "img/background-orange-original.jpg");
			}
		}
	}

	//Animate Parallax Effect
	function animateParallax() {
		if (background == null) {
			return;
		}
		scroll_amount = (scroll_top / scroll_height);
		offset_px = scroll_amount * (background_height - window_height);
		background.style.top = 0 - offset_px + "px";
		requestAnimationFrame(animateParallax);
	}

}