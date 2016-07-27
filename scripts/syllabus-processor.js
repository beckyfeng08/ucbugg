var syllabusType = "basic";
var syllabusTypes = {"basic": null, "advanced": null}

var updateSyllabus = function(type) {
	if (type in syllabusTypes) {
		syllabusType = type;
	}
	updateHash("syllabus" + syllabusType);
	$("#syllabus-type").html(syllabusType.toUpperCase() + " UCBUGG");
	updateContent();
}

var updateContent = function() {
	var onSuccess = function(data) {
		console.log(data);
		$("#syllabus-timeline").empty();
		var keys = Object.keys(data);
		keys.sort();
		for (var i=0; i < keys.length; i++) {
			// console.log(keys[i]);
			iconType = syllabusType.charAt(0).toUpperCase() + syllabusType.slice(1) + " Icon";
			$("#syllabus-timeline").append('<div class="timeline-piece">' +
					'<img src="images/syllabus icons/'+syllabusType+'/' + data[keys[i]][iconType] + '.svg" class="syllabus-icon">' + 
				'</div>');
		}

    };
    var onFailure = function(data, textStatus, errorThrown) { 
    	$("#lab").empty();
    	// $("#lab").append(data.responseText);
        console.error('syllabus not found'); 
        console.log(textStatus, errorThrown);
    };
    makeGetRequest('syllabus', 'json', onSuccess, onFailure)
}