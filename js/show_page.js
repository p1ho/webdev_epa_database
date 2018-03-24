function show_page() {
	"use strict";

	scroll(0, 0);
	var loader = document.querySelector(".loader-container");
	var main_tag = document.getElementsByTagName("main")[0];
	main_tag.style.display = "inline-block";
	loader.style.opacity = "0";
	setTimeout(function() {
		loader.style.display = "none";
		main_tag.style.opacity = "1";
	}, 1005);
}