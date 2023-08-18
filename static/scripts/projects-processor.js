// the number after each filename is roughly where in teh image the focal point is
// must be number between 0 and 1
var screenshots = {
	"Omni.png": .5,
	"restroom.png": 0.5,
	"shootingSnail.png": 0.75,
	"ThereYouAre.png": 0.5,
	"WindUpMouse.png": 0.5,
	"VRChase.png": 0.5,
	"TheConductor.png": 0.5,
	"Chopsticks.png": 0.5,
	"2tailz.png": .5,
	"dailycommute.png": .75,
	"generousghost.png":.35,
	"herebedragons.png": .75,
	"penguins.png": .47,
	"sidewalkshuffle.png": .25,
	"stars.png": .4,
	"sweetvictory.png": .6,
	"watercycle.png": .33,
	"worlddomination.png": .35,
	"bandits.png": .5,
	"curiousballoon.png": .15,
	"elle.png": .5,
	"extinguished.png": .35,
	"fruitful.png": .63,
	"goodnightbear.png": .45,
	"horsepower.png": .75,
	"industrialaccident.png": .45,
	"nightmare.png": .47,
	"papermagician.png": .25,
	"sofly.png": .35,
	"squirrelstory.png": .65,
	"terrencegetsrekt.png": .55,
	"yogasunset.png": .55

	// "dummy.png": .5
}

// veronica ignore everything below this

var IMAGE_SIZE = [533, 300];
var initialized = false;

var screenshotKeys = Object.keys(screenshots);
// shuffle screenshotKeys
var c=screenshotKeys.length; while(c)b=Math.random()*(--c+1)|0,d=screenshotKeys[c],screenshotKeys[c]=screenshotKeys[b],screenshotKeys[b]=d
var currentScreenshot = 0;

var initProjects = function() {
	if (initialized) return;
	initialized = true;
	var keys = Object.keys(screenshots);
	slices = $("#projects-samples").children();
	while(currentScreenshot < screenshotKeys.length) {
		slices.each(function() {
			var width = $(this).width()/2;
			// console.log(width);
			if (width < 30) width = window.innerWidth * .05;
			if (width < 30) width = 60; // failsafe
			$(this).append('<img src="' +
				'images/projects/' + screenshotKeys[currentScreenshot%screenshotKeys.length] +
				'" class="projimg" width="' + IMAGE_SIZE[0] + '" height="' + IMAGE_SIZE[1] + '" style="margin-left:' +
				(width - screenshots[screenshotKeys[currentScreenshot%screenshotKeys.length]]*IMAGE_SIZE[0]) + 'px; ' + 
				'z-index: ' + Math.floor(currentScreenshot/slices.length) + ';">');
			currentScreenshot++;
		});
	}
	window.setInterval(updateProjects, 4000);
}

var updateProjects = function() {
	slices = $("#projects-samples").children();
	slices.each(function() {
		$(this).children().each(function() {
			var curZ = $(this).css('z-index');
			if (curZ == 0) {
				curZ += $(this).parent().children().length;
				$(this).css('opacity', 0);
				$(this).animate({opacity:"1"}, 1000);
			}
			curZ--;
			$(this).css('z-index', curZ);

		});
	});
}