// the number after each filename is roughly where in teh image the focal point is
// must be number between 0 and 1
var screenshots = {
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

var IMAGE_SIZE = [960, 540];
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
			$(this).append('<img src="' +
				'images/projects/' + screenshotKeys[currentScreenshot%screenshotKeys.length] +
				'" class="projimg" width="960" height="540" style="margin-left:' +
				($(this).width()/2 - screenshots[screenshotKeys[currentScreenshot%screenshotKeys.length]]*IMAGE_SIZE[0]) + 'px; ' + 
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