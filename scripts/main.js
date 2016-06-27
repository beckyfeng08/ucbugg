var Main = (function() {

	var switchSpeed = 200;
	var tabs = {
		"home":["home-header", "home-info"],
		"about":["about-info", "about-facilitators"],
		"syllabus":["placeholder"],
		"labs":["labs-header", "labs-pipeline"],
		"projects":["placeholder"]
	}
	var activeTab = "labs";

	var loadActiveTab = function() {
		var mainbody = document.getElementById('mainbody'); //jquery failed me
		mainbody.scrollTop=0;
		// console.log(activeTab);
		for (var tab in tabs) {
			for (var i = 0; i < tabs[tab].length; i++) {
				if (tab === activeTab) {
					$("#" + tabs[tab][i]).show(switchSpeed);
					$("#" + tab + "-image").attr("src", "images/menu bar icons/hover-"+tab+".svg");
					$("#" + tab).css('pointer-events', 'none');
				}
				else {
					$("#" + tabs[tab][i]).hide(switchSpeed);
					$("#" + tab + "-image").attr("src", "images/menu bar icons/"+tab+".svg");
					$("#" + tab).css('pointer-events', 'all');
				}
			}
		}
	   	$("#blue-box").animate({left:$("#"+activeTab).position().left - $("#blue-box-region").position().left + 20 + "px"}, switchSpeed);
	   	// $("#" + activeTab).css('pointer-events', none);
	}

	var loadHome = function() {
		activeTab = "home";
		loadActiveTab();
	}
	var loadAbout = function() {
		activeTab = "about";
		loadActiveTab();
	}
	var loadSyllabus = function() {
		activeTab = "syllabus";
		loadActiveTab();
	}
	var loadLabs = function() {
		activeTab = "labs";
		loadActiveTab();
	}
	var loadProjects = function() {
		activeTab = "projects";
		loadActiveTab();
	}

	var scheduleHover = function() {
		$("#schedule-button").animate({width:"175px"}, switchSpeed/1.5);
		$("#schedule-text").show(switchSpeed/1.5);
	}
	var scheduleOut = function() {
		$("#schedule-button").animate({width:"60px"}, switchSpeed/1.5);
		$("#schedule-text").hide(switchSpeed/1.5);
	}
	var logisticsHover = function() {
		$("#logistics-button").animate({width:"175px"}, switchSpeed/1.5);
		$("#logistics-text").show(switchSpeed/1.5);
		
	}
	var logisticsOut = function() {
		$("#logistics-button").animate({width:"60px"}, switchSpeed/1.5);
		$("#logistics-text").hide(switchSpeed/1.5);
	}
	var piazzaHover = function() {
		$("#piazza-button").animate({width:"145px"}, switchSpeed/1.5);
		$("#piazza-text").show(switchSpeed/1.5);
	}
	var piazzaOut = function() {
		$("#piazza-button").animate({width:"60px"}, switchSpeed/1.5);
		$("#piazza-text").hide(switchSpeed/1.5);
	}

	var resize = function() {
		// contactMargin = window.innerWidth/16 + "px";
		// console.log(contactMargin);
	 //  	$(".contact-icon").css("margin-top", contactMargin);
	}

	var start = function() {
		loadActiveTab();
		resize();
		// $( window ).resize(resize);
		appendLabsToPipeline();
		$(".info-text").hide();
		$(".info-button").width("50px");
	};

	return {
		start: start,

		about: loadAbout,
		home: loadHome,
		labs: loadLabs,
		projects: loadProjects,
		syllabus: loadSyllabus,

		scheduleHover: scheduleHover,
		logisticsHover: logisticsHover,
		piazzaHover: piazzaHover,

		scheduleOut: scheduleOut,
		logisticsOut: logisticsOut,
		piazzaOut: piazzaOut
	}
})();