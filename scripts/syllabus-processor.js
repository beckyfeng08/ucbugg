var syllabusType = "basic";
var syllabusTypes = {"basic": null, "advanced": null}
var updateSyllabus = function(type) {
	if (type in syllabusTypes) {
		syllabusType = type;
	}
	updateHash("syllabus" + syllabusType);
	$("#syllabus-type").html(syllabusType.toUpperCase() + " UCBUGG");
	console.log('syllabus updated');
}