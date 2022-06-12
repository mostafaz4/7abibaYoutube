// ==UserScript==
// @name         7abiba Youtube
// @namespace    http://tampermonkey.net/
// @version      0.5
// @description  Sanitized youtube version for 7abiba
// @author       Bondok
// @updateURL    https://github.com/mostafaz4/7abibaYoutube/raw/main/7abibaYoutube.user.js
// @downloadURL  https://github.com/mostafaz4/7abibaYoutube/raw/main/7abibaYoutube.user.js
// @match        *.youtube.com/*
// @grant        none
// ==/UserScript==

var blacklist = [
"[ء-ي]",
"Bug", "Spider", "Insect", "Tarantula", "Roach", "Beetle",
"Monster", "Beast", "Fiend", "Ghost", "Freak", "Zombie",
"Afraid", "Horror", "Terrified", "Halloween",
"Fight", "Kill", "Hate", "Attack", "Kick",
"Nasty", "Vomit", "Gross", "Disgusting",
"Candy", "Loll?ipop", "Kinder",
"Theif", "Jail", "Steal",
"Death", "Dead", "Die",
"Inappropriate", "Bad",
"Ugly", "Bizarre",
"Action Time TV",
"Throw.?up",
"Make.?up",
"Creep",
"Evil",
"Toilet",
"Shfa",
"Needle",
"Naughty",
"Punish",
"Inject"
]
var regexPattern = blacklist.join("|");

function hide(elms){
    for (var i = 0; i < elms.length; i++) {
        if (new RegExp(regexPattern, "i").test(elms[i].innerText)) {
            elms[i].style.display = "none";
        }
    }
}

function hideListing() {
	// search videos
    hide(document.querySelectorAll("ytm-compact-video-renderer"));
	// search playlists
    hide(document.querySelectorAll("ytm-compact-playlist-renderer"));
	// homescreen
    hide(document.querySelectorAll("ytm-rich-item-renderer"));
	// current playing video
    if (document.querySelector(".slim-video-metadata-header") == null) { return; }
    if (new RegExp(regexPattern, "i").test(document.querySelector(".slim-video-metadata-header").innerText)) {
        document.location = "https://www.youtube.com/user/checkgate/videos";
    }
}

/*
function hideList() {
    var lazyList = document.querySelector("ytm-section-list-renderer > lazy-list > ytm-item-section-renderer > lazy-list");
    if (lazyList == null) { return; }
    hide(lazyList.children);
}
*/
// hides inappropriate videos on home screen
/*
function hideToWatch() {
    var lazyList = document.querySelector("div [tab-identifier=FEwhat_to_watch]");
    if (lazyList == null) { return; }
    hide(lazyList.children[0].children[0].children);
}
*/

function printHabibaMode(){
	var hab = document.createElement("span");
	hab.style = "z-index: 100; position: absolute; text-align: center; width: 100%;";
	hab.innerText = "7abiba Youtube";
	document.body.insertBefore(hab, document.body.children[0]);
}
printHabibaMode();

const config = { attributes: true, childList: true, subtree: true };
const callback = function (mutationsList, observer) {
    hideListing();
    //hideList();
    //hideToWatch();
};
const observer = new MutationObserver(callback);
observer.observe(document.body, config);
