var Main = (function() {

	var currentTab = "home";
	var switchSpeed = 300;

	var loadAbout = function() {
		var mainbody = document.getElementById('mainbody');
		mainbody.scrollTop=0;
		// console.log("ABOUT CALLED");
		$("#home-header").hide(switchSpeed);
		$("#home-info").hide(switchSpeed);
		$("#about-info").show(switchSpeed);
		$("#about-facilitators").show(switchSpeed);
	}
	var loadHome = function() {
		var mainbody = document.getElementById('mainbody');
		mainbody.scrollTop=0;
		// console.log("HOME CALLED");
		$("#mainbody").scrollTop();
		$("#home-header").show(switchSpeed);
		$("#home-info").show(switchSpeed);
		$("#about-info").hide(switchSpeed);
		$("#about-facilitators").hide(switchSpeed);
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