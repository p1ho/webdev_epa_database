function database_injection() {
	"use strict";

	//Alphabet Array for Destination Pointer
	var alphabet = [];
	var charA = 'a',
		charZ = 'z';

	for (var i = charA.charCodeAt(0); i <= charZ.charCodeAt(0); i++) {
		alphabet.push(String.fromCharCode(i));
	}

	//Set Icon Size
	var icon_size = 35; //px

	//AJAX Request
	var loader_msg = document.querySelector(".loader-msg");
	var loader = document.querySelector(".loader");

	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			loader_msg.innerHTML = "Database retrieved";
			var database = JSON.parse(this.responseText);
			loader_msg.innerHTML = "Displaying entries to page";
			var main_container = document.getElementById("main_container");
			addEntries(database.entries, main_container);
			addUpdateTime(database.update_time, main_container);
			loader_msg.innerHTML = "Load successful!";
			show_page();
		} else if (this.status >= 400) {
			loader.className += " error";
			loader_msg.innerHTML = "Load failed: error " + this.status + "<br/>Try refreshing the page or contact the admin";
		}
	};

	ajax.open("GET", "./database/summary_database.json", true);
	ajax.send();
	loader_msg.innerHTML = "Sending Database request";

	//Display Last Updated Date
	function addUpdateTime(update_time, main_container) {
		var date_container = document.createElement("div");
		date_container.setAttribute("id", "update_time");

		var date_content = document.createTextNode("Last Updated: " + update_time);
		date_container.appendChild(date_content);
		main_container.parentNode.insertBefore(date_container, main_container);
	}

	//Add Entries
	function addEntries(entries, main_container) {
		for (var i in entries) {
			addEntry(entries[i], i, main_container);
		}
	}

	//Add Single Entry
	function addEntry(entry, id, main_container) {
		var entry_container = document.createElement("div");
		entry_container.setAttribute("id", id);
		entry_container.classList.add("entry");

		var alphabet_index = addText(entry, entry_container);
		addIcon(entry, id, entry_container);
		main_container.children[alphabet_index].appendChild(entry_container);
	}

	//Add Entry Text
	function addText(entry, entry_container) {
		var text_container = document.createElement("p");
		text_container.classList.add("text_container");
		text_container.appendChild(document.createTextNode(entry.title));
		entry_container.appendChild(text_container);

		for (var i = 0; i < alphabet.length; i++) {
			if (entry.title[0].toLowerCase() == alphabet[i]) {
				return i;
			}
		}
		return 26; //if doesn't match any, set to "others"
	}

	//Add Entry Icon Array
	function addIcon(entry, id, entry_container) {
		var icon_container = document.createElement("div");
		icon_container.classList.add("icon_container");

		if (entry.pdf != "") {
			addPDF(entry.pdf, id, icon_container);
		}
		if (entry.ppt[0] != "") {
			addPPT(entry.ppt, id, icon_container);
		}
		entry_container.appendChild(icon_container);
	}

	//Add PDF Links
	function addPDF(pdf, id, icon_container) {
		var pdf_container = document.createElement("a");
		setAttributeHelper(pdf_container, {
			href: "pdf/" + pdf,
			target: "_blank"
		});

		var pdf_icon = document.createElement("img");
		setAttributeHelper(pdf_icon, {
			src: "img/pdf_icon.svg",
			height: icon_size + "px",
			width: icon_size * 0.8 + "px",
			alt: "pdf"
		});
		pdf_icon.className = "click_icon";

		pdf_container.appendChild(pdf_icon);
		icon_container.appendChild(pdf_container);
	}

	//Add PPT Links
	function addPPT(ppt, id, icon_container) {
		for (var i in ppt) {
			var ppt_container = document.createElement("a");
			setAttributeHelper(ppt_container, {
				href: "ppt/" + ppt[i]
			});

			var ppt_icon = document.createElement("img");
			setAttributeHelper(ppt_icon, {
				src: "img/ppt_icon.svg",
				height: icon_size + "px",
				width: icon_size * 0.8 + "px",
				alt: "ppt"
			});
			ppt_icon.className = "click_icon";

			ppt_container.appendChild(ppt_icon);
			icon_container.appendChild(ppt_container);
		}
	}

	//Set Attribute Helper Function
	function setAttributeHelper(el, attr) {
		for (var prop in attr) {
			el.setAttribute(prop, attr[prop]);
		}
	}
}