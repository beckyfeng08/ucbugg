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


var setCurrentDate = function() {
	var d = new Date();
	var options = { year: "2-digit", month: "2-digit", day: "2-digit"};
	currentDate = new Intl.DateTimeFormat("en-US", options).format();
}

var setInfo = function(date) {
	var i = 1;
	assType = syllabusType.charAt(0).toUpperCase() + syllabusType.slice(1);
	// console.log(assType);
	$(".assignments").empty();
	while (assType + " Ass " + i in syllabusObj[date]) {
		// console.log("yolo");
		hrefStr = "";
		if (assType + " Link " + i in syllabusObj[date]) {
			hrefStr = 'href="' + syllabusObj[date][assType + " Link " + i] + '"';
		}
		$(".assignments").append('<a class="assignment" target="_blank"' + hrefStr + '>' + 
								  syllabusObj[date][assType + " Ass " + i] + 
								  ' </a>');

		i++;
	}
	$("#due-dates").empty();
	$("#due-dates").html('<p class="due"> DUE ' + syllabusObj[date]['Tues Due'].substring(0,5) + ' for TUESDAY </p>' +
						 '<p class="due"> DUE ' + syllabusObj[date]['Thurs Due'].substring(0,5) + ' for THURSDAY </p>');
	$("#button"+date.split('/').join()).css('border-color', '#f1f2f3');
}

var updateContent = function() {
	var onSuccess = function(data) {
		// console.log(data);
		syllabusObj = data;
		$("#syllabus-timeline").empty();
		var keys = Object.keys(data);
		keys.sort();
		for (var i=0; i < keys.length; i++) {
			// console.log(keys[i]);
			iconType = syllabusType.charAt(0).toUpperCase() + syllabusType.slice(1) + " Icon";
			var dateArr = keys[i].split("/");
			var tues = new Date(parseInt(dateArr[2]) + 2000, parseInt(dateArr[0]) - 1, parseInt(dateArr[1]));
			var thur = new Date(parseInt(dateArr[2]) + 2000, parseInt(dateArr[0]) - 1, parseInt(dateArr[1])+2);
			// console.log(date,tues.toString().split(" ")[1].toUpperCase(), thur.toString().split(" ")[1].toUpperCase());
			// $("#tues-date").html();
			// $("#thur-date").html(thur.toString().split(" ")[1].toUpperCase() + " " + thur.getDate());

			$("#syllabus-timeline").append('<div class="timeline-piece" id="button' + keys[i].split('/').join('') + '" onclick="setInfo(\'' + keys[i] + '\')">' +
					'<h3 class="date" id="tues-date"> ' + tues.toString().split(" ")[1].toUpperCase() + " " + tues.getDate() + ' </h3>' + 
					'<img src="images/syllabus icons/'+syllabusType+'/' + data[keys[i]][iconType] + '.svg" class="syllabus-icon">' + 
					'<h3 class="date" id="thur-date"> ' + thur.toString().split(" ")[1].toUpperCase() + " " + thur.getDate() + ' </h3>' + 
				'</div>');
		}
		var i = 0;
		while (keys[i] <= currentDate) {
			i++;
		}
		activeDate = keys[Math.max(i-1, 0)];
		setInfo(activeDate);
    };
    var onFailure = function(data, textStatus, errorThrown) { 
    	$("#lab").empty();
    	// $("#lab").append(data.responseText);
        console.error('syllabus not found'); 
        console.log(textStatus, errorThrown);
    };
    makeGetRequest('syllabus', 'json', onSuccess, onFailure)
}