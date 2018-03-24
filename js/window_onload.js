window.onload = function() {
	"use strict";

	ie_script();
	document.getElementById("search-input").focus();
	database_injection();
	
	var theme;
	(typeof(Storage) !== "undefined" && localStorage.theme) ? theme = localStorage.theme : theme = "blue";
	parallax_scrolling(theme);
	
	autoscroll();
}