function parallax_scrolling() {
	"use strict";

	//var declaration
	var scroll_height;
	var window_height;
	var window_width;

	var scroll_top;
	var scroll_amount;
	var offset_px = {};

	var background = {};
	var background_height = {};

	var fps = 60;
	var time_interval = 1000 / fps;
	var t1 = Date.now();
	var t2;
	var t_diff;


	background = document.querySelectorAll(".bg");

	//Create cross browser requestAnimationFrame method:
	window.requestAnimationFrame = window.requestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(f) {
			setTimeout(f, time_interval)
		};

	//Scroll/Resize Listener Solution 1
	//On Scroll Event
	/*
	var didScroll = false;
	window.onscroll = function() {
		didScroll = true;
	}
	setInterval(function() {
		if(didScroll) {
			didScroll = false;
			getHeights();
		}
	}, time_interval);
	*/

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


	//Scroll/Resize Listener Solution 2
	//On Scroll Event

	window.addEventListener("scroll", function() {
		getHeights();
	}, false);

	//On Resize Event
	/*
    window.addEventListener("resize", function() {
		getHeights();
    }, false);
	*/

	//Initial Call
	animateParallax();

	//Get Scroll Height/ Window Height/ Background Height for correct presentation
	function getHeights() {
		scroll_height = document.body.scrollHeight;
		window_height = window.innerHeight;
		scroll_top = window.pageYOffset;
		background_height[0] = background[0].clientHeight;
		background_height[1] = background[1].clientHeight;
	}

	//Animate Parallax Effect
	function animateParallax() {
		t2 = Date.now();
		t_diff = t2 - t1;
		if (t_diff > time_interval) {
			//Drawing Code
			scroll_amount = (scroll_top / scroll_height);
			for (var i = 0; i < background.length; i++) {
				offset_px[i] = scroll_amount * (background_height[i] - window_height);
				background[i].style.top = 0 - offset_px[i] + "px";
			}
			t1 = Date.now();
		}
		//Request new frame
		requestAnimationFrame(animateParallax);
	}

}