function ie_script() {
	"use strict";

	//Script for IE Compatibility
	if (typeof window.CustomEvent === "function") return false; //If not IE

	function CustomEvent(event, params) {
		params = params || {
			bubbles: false,
			cancelable: false,
			detail: undefined
		};
		var evt = document.createEvent('CustomEvent');
		evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
		return evt;
	}

	CustomEvent.prototype = window.Event.prototype;
	window.CustomEvent = CustomEvent;

	//remove slidebar transition (faulty in IE)
	document.querySelector(".sidebar").style.transition = 0;
}