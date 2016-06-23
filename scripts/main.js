var Main = (function() {

	var currentTab = "home";
	var switchSpeed = 200;

	var loadAbout = function() {
		var mainbody = document.getElementById('mainbody'); //jquery failed me
		mainbody.scrollTop=0;
		// console.log("ABOUT CALLED");
		$("#home-header").hide(switchSpeed);
		$("#home-info").hide(switchSpeed);
		$("#labs-header").hide(switchSpeed);
		$("#labs-pipeline").hide(switchSpeed);
		$("#about-info").show(switchSpeed);
		$("#about-facilitators").show(switchSpeed);
		// $("#home").style.backgroundColor = "transparent"
	   	$("#blue-box").animate({left:$("#about").position().left - $("#blue-box-region").position().left + 20 + "px"}, switchSpeed);
	}
	var loadHome = function() {
		var mainbody = document.getElementById('mainbody'); //jquery failed me
		mainbody.scrollTop=0;
		// console.log("HOME CALLED");
		$("#home-header").show(switchSpeed);
		$("#home-info").show(switchSpeed);
		$("#labs-header").hide(switchSpeed);
		$("#labs-pipeline").hide(switchSpeed);
		$("#about-info").hide(switchSpeed);
		$("#about-facilitators").hide(switchSpeed);
		// $("#about").style.backgroundColor = "transparent"
	   	$("#blue-box").animate({left:$("#home").position().left - $("#blue-box-region").position().left + 20 + "px"}, switchSpeed);
	}
	var loadLabs = function() {
		var mainbody = document.getElementById('mainbody'); //jquery failed me
		mainbody.scrollTop=0;
		$("#labs-header").show(switchSpeed);
		$("#labs-pipeline").show(switchSpeed);
		$("#about-info").hide(switchSpeed);
		$("#about-facilitators").hide(switchSpeed);
		$("#home-header").hide(switchSpeed);
		$("#home-info").hide(switchSpeed);
		// $("#about").style.backgroundColor = "transparent"
	   	$("#blue-box").animate({left:$("#labs").position().left - $("#blue-box-region").position().left + 20 + "px"}, switchSpeed);

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
		loadLabs();
		resize();
		// $( window ).resize(resize);
		$(".info-text").hide();
		$(".info-button").width("50px");
	};

	return {
		start: start,

		about: loadAbout,
		home: loadHome,
		labs: loadLabs,

		scheduleHover: scheduleHover,
		logisticsHover: logisticsHover,
		piazzaHover: piazzaHover,

		scheduleOut: scheduleOut,
		logisticsOut: logisticsOut,
		piazzaOut: piazzaOut
	}
})();