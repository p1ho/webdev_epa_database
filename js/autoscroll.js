function autoscroll() {
	"use strict";

	window.addEventListener("click", function(e) {
		var e = e || window.event;

		//using indexOf() instead of includes() for IE compatibility
		if (e.target.className.indexOf("autoscroll") > -1) {
			setTimeout(function() {
				scrollBy(0, -60);
			}, 1);
		}
	})
}