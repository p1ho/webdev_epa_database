function load_theme(theme) {
	"use strict";

	//Set User Preference
	if (typeof(Storage) !== "undefined") {
		localStorage.theme = theme;
	}
	//Set CSS Path
	var theme_dir = "css/theme_" + theme + ".css";
	document.getElementById("page_theme").setAttribute("href", theme_dir);
}