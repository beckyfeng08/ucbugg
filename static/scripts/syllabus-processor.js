var syllabusType = "basic";
var syllabusTypes = {"basic": null, "advanced": null};
var currentDate = "";
var activeDate = "";
var syllabusObj = {};

var updateSyllabus = function(type) {
	setCurrentDate();
	if (type in syllabusTypes) {
		syllabusType = type;
	}
	updateHash("syllabus" + syllabusType);
	$("#syllabus-type").html(syllabusType.toUpperCase() + " UCBUGG");
	updateContent();
	// console.log(currentDate);
	// currentDate = "12/23/16"; // Uncomment this line to play with fake dates
}

var collapseDate = function(date) {
	return date.split('/').join('');
}
var setCurrentDate = function() {
	// THESE 2 LINES OF CODE WERE SO GREAT! WHY IS SAFARI SUCH SHIT?
	// var options = { year: "2-digit", month: "2-digit", day: "2-digit"};
	// currentDate = new Intl.DateTimeFormat("en-US", options).format();

	// SAFARI I CANT BELIEVE THE SHIT I DO FOR YOU 
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yy = today.getFullYear()%100;
	if(dd<10){
	    dd='0'+dd
	} 
	if(mm<10){
	    mm='0'+mm
	} 
	currentDate = mm + "/" + dd + "/" + yy;
	// UNCOMMENT THIS NEXT LINE TO TEST DIFFERENT DATES
	// currentDate = '09/30/16';
}

var setInfo = function(date) {
	var i = 1;
	assType = syllabusType.charAt(0).toUpperCase() + syllabusType.slice(1);
	$("#due-dates" + collapseDate(date)).prepend('<p class="due"> DUE <b>' + syllabusObj[date]['Tues Due'].substring(0,5) + '</b> for TUESDAY </p>' +
						 '<p class="due"> DUE <b>' + syllabusObj[date]['Thurs Due'].substring(0,5) + '</b> for THURSDAY </p>');
	// console.log(assType);
	// $("#due-dates" + collapseDate(date)).empty();
	while (assType + " Ass " + i in syllabusObj[date]) {
		// console.log("yolo");
		hrefStr = "";
		if (assType + " Link " + i in syllabusObj[date]) {
			hrefStr = 'href="' + syllabusObj[date][assType + " Link " + i] + '"';
		}
		$("#due-dates"+ collapseDate(date)).prepend('<a class="assignment" target="_blank"' + hrefStr + '>' + 
								  syllabusObj[date][assType + " Ass " + i] + 
								  ' </a>');

		i++;
	}
	$("#week-title" + collapseDate(date)).append('<p class="weektitle">' + syllabusObj[date]['Title'] + '</p>');
	// $("#due-dates" + collapseDate(date)).empty();
	// $("#button"+date.split('/').join()).css('background-color', '#f1f2f3');

}

var updateContent = function() {
	var onSuccess = function(data) {
		// console.log(data);
		syllabusObj = data;
		$("#syllabus-timeline").empty();
		var keys = Object.keys(data);
		keys.sort();
		var i = 0;
		while (keys[i] <= currentDate) {
			i++;
		}
		activeDate = keys[Math.max(i-1, 0)];
		for (var i=0; i < keys.length; i++) {
			// console.log(keys[i]);
			iconType = syllabusType.charAt(0).toUpperCase() + syllabusType.slice(1) + " Icon";
			var dateArr = keys[i].split("/");
			var tues = new Date(parseInt(dateArr[2]) + 2000, parseInt(dateArr[0]) - 1, parseInt(dateArr[1]));
			var thur = new Date(parseInt(dateArr[2]) + 2000, parseInt(dateArr[0]) - 1, parseInt(dateArr[1])+2);
			// console.log(date,tues.toString().split(" ")[1].toUpperCase(), thur.toString().split(" ")[1].toUpperCase());
			// $("#tues-date").html();
			// $("#thur-date").html(thur.toString().split(" ")[1].toUpperCase() + " " + thur.getDate());
			highlight = keys[i] == activeDate ? 'highlight' : 'normal';
			$("#syllabus-timeline").append('<div class="timeline-piece" id="row' + collapseDate(keys[i]) + '" >' +
					'<div class="timeline-elem-piece-week">'  +
					'<h3 class="date" id="tues-date"> ' + tues.toString().split(" ")[1].toUpperCase() + " " + tues.getDate() + ' </h3>' + 
					'<h3 class="hyphen" > - </h3>' + 
					'<h3 class="date" id="thur-date"> ' + thur.toString().split(" ")[1].toUpperCase() + " " + thur.getDate() + ' </h3>' + 
					'</div>' + 
					'<div class="timeline-elem-piece-icon" id="icon">'  +					
					'<img src="images/syllabus icons/'+ highlight + "/" + syllabusType+'/' + data[keys[i]][iconType] + '.svg" class="syllabus-icon" id="syllabus-icon' + collapseDate(keys[i]) + '"">' + 
					'<p class="weeknum"> WEEK ' + (i+1) + '</p>'  + 
					'</div>' + 
					'<div class="timeline-elem-piece" id="week-title' + collapseDate(keys[i]) + '"">  </div>' + 
					'<div class="timeline-elem-piece" id="due-dates' + collapseDate(keys[i]) + '""> <a class="submit-button"  id="submit'+collapseDate(keys[i])+'"> SUBMIT HERE </a> </div>' + 
				'</div>');
			setInfo(keys[i]);
		}
		console.log(keys);
		$("#row" + collapseDate(activeDate)).css('background-color', "rgba(98, 170, 238, 0.09)");
		$("#row" + collapseDate(activeDate)).children().children().css('color', "#fcfcfd");
		$("#due-dates" + collapseDate(activeDate)).children().css('color', "#313132");
		$("#row" + collapseDate(activeDate)).find(".date").css('font-weight', "bold");
		// $("#row" + collapseDate(activeDate)).find("#icon").find(".weeknum").css('font-size', "16pt");
		$(".submit-button").css('color', '#fcfcfd');
		$("#submit"+collapseDate(activeDate)).css('background-color', "#62aaee");
		// $("#due-dates" + collapseDate(activeDate)).css('color', "#212122");
		// $("#tues" + collapseDate(activeDate)).children().css('color', "#f1f1f2");
		// setInfo(activeDate);
    };
    var onFailure = function(data, textStatus, errorThrown) { 
    	$("#lab").empty();
    	// $("#lab").append(data.responseText);
        console.error('syllabus not found'); 
        console.log(textStatus, errorThrown);
    };
    makeGetRequest('syllabus', 'json', onSuccess, onFailure)
}
