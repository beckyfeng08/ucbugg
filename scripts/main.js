var Main = (function() {

	var currentTab = "home";

	var loadAbout = function() {
		// console.log("ABOUT CALLED");
		$("#home-header").hide();
		$("#home-info").hide();
		$("#about-info").show();
		$("#about-facilitators").show();
	}
	var loadHome = function() {
		console.log("HOME CALLED");
		$("#home-header").show();
		$("#home-info").show();
		$("#about-info").hide();
		$("#about-facilitators").hide();
	}

	var start = function() {
		loadHome();
	};

	return {
		start: start,
		about: loadAbout,
		home: loadHome
	}
})();