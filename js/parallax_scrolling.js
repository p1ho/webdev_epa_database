function parallax_scrolling(theme) {
	"use strict";

	//var declaration
	var scroll_height;
	var window_height;
	var window_width;

	var scroll_top;
	var scroll_amount;
	var offset_px;

	var fps = 60;
	var time_interval = 1000 / fps;
	var t1 = Date.now();
	var t2;
	var t_diff;

	var stop_parallax = false;
	var myReq; // for canceling AnimationFrame

	//Account for different themes	
	var background = document.getElementById(theme);
	var background_height;
	if (background === null) {
		return;
	}

	//Create cross browser requestAnimationFrame method:
	window.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(f) {
			setTimeout(f, time_interval)
		};

	//On Resize Event
	var didResize = false;
	window.onresize = function() {
		didResize = true;
	}
	setInterval(function() {
		if (didResize) {
			didResize = false;
			getHeights();
		}
	}, time_interval);

	//On Scroll Event
	window.addEventListener("scroll", getHeights, false);

	//On Theme Change Event 
	window.addEventListener("stop-parallax", stopParallax, false);

	//Initial Call
	getHeights();
	animateParallax();

	//Get Scroll Height/ Window Height/ Background Height for correct presentation
	function getHeights() {
		scroll_height = document.body.scrollHeight;
		window_height = window.innerHeight;
		scroll_top = window.pageYOffset;
		background_height = background.clientHeight;
	}

	//Give name to stop-parallax function to remove listener
	function stopParallax() {
		stop_parallax = true;
	}

	//Animate Parallax Effect
	function animateParallax() {
		if (!stop_parallax) {
			t2 = Date.now();
			t_diff = t2 - t1;
			if (t_diff > time_interval) {
				//Drawing Code
				scroll_amount = (scroll_top / scroll_height);
				offset_px = scroll_amount * (background_height - window_height);
				background.style.transform = "translate(0, -" + offset_px + "px)";
				t1 = Date.now();
			}
			//Request new frame
			myReq = requestAnimationFrame(animateParallax);
		} else {
			//On Scroll Event
			window.removeEventListener("scroll", getHeights, false);

			//On Theme Change Event 
			window.removeEventListener("stop-parallax", stopParallax, false);

			cancelAnimationFrame(myReq);
		}
	}

}