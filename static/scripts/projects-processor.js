// the number after each filename is roughly where in teh image the focal point is
// must be number between 0 and 1
var screenshots = {
	"2tailz.png": .5,
	"dailycommute.png": .75,
	"generousghost.png":.35,
	"herebedragons.png": .75,
	"penguins.png": .5,
	"sidewalkshuffle.png": .25,
	"stars.png": .4,
	"sweetvictory.png": .6,
	"watercycle.png": .4,
	"worlddomination.png": .35
	// "dummy.png": .5
}

// veronica ignore everything below this

var IMAGE_SIZE = [960, 600];

var screenshotKeys = Object.keys(screenshots);
// shuffle screenshotKeys
var c=screenshotKeys.length; while(c)b=Math.random()*(--c+1)|0,d=screenshotKeys[c],screenshotKeys[c]=screenshotKeys[b],screenshotKeys[b]=d
var currentScreenshot = 0;

var initProjects = function() {
	// console.log("update projects called");
	var keys = Object.keys(screenshots);
	slices = $("#projects-samples").children();
	while(currentScreenshot < screenshotKeys.length) {
		slices.each(function() {
			console.log($(this).width(),screenshots[screenshotKeys[currentScreenshot%screenshotKeys.length]], IMAGE_SIZE[0]);
			$(this).append('<img src="' +
				'images/projects/' + screenshotKeys[currentScreenshot%screenshotKeys.length] +
				'" class="projimg" width="960" height="600" style="margin-left:' +
				($(this).width()/2 - screenshots[screenshotKeys[currentScreenshot%screenshotKeys.length]]*IMAGE_SIZE[0]) + 
				'px;">');
			currentScreenshot++;
			// $(this).children().each(function() {
			// 	$(this).attr('src', 
			// 		'images/projects/' + screenshotKeys[currentScreenshot]);
			// 	// console.log($(this).parent().width(), screenshots[screenshotKeys[currentScreenshot]],IMAGE_SIZE[0] );
			// 	$(this).css('margin-left', 
			// 		$(this).parent().width()/2 - screenshots[screenshotKeys[currentScreenshot]]*IMAGE_SIZE[0]);
			// 	currentScreenshot = (currentScreenshot+1) % screenshotKeys.length;
			// });
		});
	}
}