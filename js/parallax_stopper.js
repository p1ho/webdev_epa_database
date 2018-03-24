function parallax_stopper() {
	"use strict";

	// Fires an event for Parallax_Scrolling to Catch when Theme changes
	var stop_parallax = new CustomEvent("stop-parallax");
	window.dispatchEvent(stop_parallax);
}