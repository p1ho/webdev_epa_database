function search() {
	"use strict";

	//var declaration
	var entries = document.querySelectorAll(".entry");
	var entries_length = entries.length;
	var entry;
	var entry_content;
	var result_count = 0;

	//fetch user input
	var search_bar = document.getElementById("search-input");
	var input = String(search_bar.value);
	//fetch result output
	var result_display = document.querySelector(".search-result");

	//Unlikely Situation: if there are no entries
	if (entries.length == 0) {
		//search_bar.value = "";
		scroll(0, 0);
		return false;
	}

	//Reset all display
	for (var i in entries) {
		entry = entries.item(i);
		if (entry.style.display == "none") {
			entry.style.display = "";
		}
	}

	while (result_display.firstChild) {
		result_display.removeChild(result_display.firstChild);
	}
	if (input.length == 0) {
		result_display.appendChild(document.createTextNode("You didn't enter any keywords."));
		scroll(0, 0);
		return false;
	} else {
		result_display.appendChild(document.createTextNode("You searched for: " + input));
	}
	result_display.appendChild(document.createElement("br"));

	//Remove non-results from screen if separate words
	if (!(input.charAt(0) == "\"" && input.charAt(input.length - 1) == "\"")) {
		input = input.split(" ");
		var input_array = [];
		for (var i = 0; i < input.length; i++) {
			input_array[i] = input[i].toLowerCase();
		}
		for (var i in entries) {
			entry = entries.item(i);
			entry_content = entry.childNodes[0].innerHTML.toLowerCase();
			for (var j in input_array) {
				if (entry_content.indexOf(input_array[j]) > -1) {
					entry_content = entry_content.replace(input_array[j], " ");
				} else {
					entry.style.display = "none";
					break;
				}
			}
		}
	} else { //Remove non-results from screen if begin/ends with "
		input = input.substring(1, input.length - 1).toLowerCase();
		for (var i in entries) {
			entry = entries.item(i);
			entry_content = entry.childNodes[0].innerHTML.toLowerCase();
			if (!(entry_content.indexOf(input) > -1)) {
				entry.style.display = "none";
			}
		}
	}

	//result count
	for (var i = 0; i < entries_length; i++) {
		entry = entries.item(i);
		if (entry.style.display != "none") {
			result_count++;
		}
	}
	result_display.appendChild(document.createTextNode("Your search returned: " + result_count + " entries!"));

	//search_bar.value = "";
	scroll(0, 0);
	return false;
}