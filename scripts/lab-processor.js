var toggleSpeed = 100;

var appendLabsToPipeline = function() {
	for (var pipelineElem in allLabs) {
		if (allLabs[pipelineElem].araknid.length == 0) {
			for (var i = 0; i < allLabs[pipelineElem].bugg.length; i++) {
				$('<div class="pipeline-dropdown">' + allLabs[pipelineElem].bugg[i].toUpperCase() + '</div>').appendTo("#" + pipelineElem);
			}
		} else {
			$('<div class="pipeline-level"> BASIC </div>').appendTo("#" + pipelineElem);
			for (var i = 0; i < allLabs[pipelineElem].bugg.length; i++) {
				$('<div class="pipeline-dropdown">' + allLabs[pipelineElem].bugg[i].toUpperCase() + '</div>').appendTo("#" + pipelineElem);
			}
			$('<div class="pipeline-level"> ADVANCED</div>').appendTo("#" + pipelineElem);
			for (var i = 0; i < allLabs[pipelineElem].araknid.length; i++) {
				$('<div class="pipeline-dropdown">' + allLabs[pipelineElem].araknid[i].toUpperCase() + '</div>').appendTo("#" + pipelineElem);
			}
		}
	}
	$(".pipeline-dropdown").hide();
	$(".pipeline-level").hide();

	$(".pipeline-bubble").click(function(){
		var lineCorrection = window.setInterval(correctPipelines, 6);
		$(this).siblings().toggle(toggleSpeed);
		$(this).toggleClass('pipeline-bubble-highlighted');
		window.setTimeout(function() {
			window.clearInterval(lineCorrection);
		}, toggleSpeed+20);
	});

	$(".pipeline-dropdown").click(function() {
		createLab($(this)[0].innerHTML);
	});
};

var correctPipelines = function() {
	heights = [($("#modeling").offset().top + 40 - $("#svg").offset().top)/$("#svg").height(),
		($("#rigging").offset().top + 40 - $("#svg").offset().top)/$("#svg").height(),
		($("#animation").offset().top + 40 - $("#svg").offset().top)/$("#svg").height()];
	for (var i = 0; i < heights.length; i++) {
		heights[i] *= 100;
	}
	$("#line1").attr('y1', heights[0]);
	$("#line1").attr('y2', heights[0]);
	$("#line2").attr('y1', heights[0]);
	$("#line3").attr('y1', heights[0]);
	$("#line4").attr('y1', heights[0]);
	$("#line5").attr('y1', heights[1]);
	$("#line5").attr('y2', heights[1]);
	$("#line6").attr('y1', heights[2]);
	$("#line2").attr('y2', heights[2]);
	$("#line3").attr('y2', heights[2]);
	$("#line4").attr('y2', heights[2]);
	$("#line6").attr('y2', heights[2]);
}

var createLab = function(filename) {
	// $("#lab").load("scripts/labs/user/basic_modeling.html");
	// $("#lab").show();
	var reader = new FileReader();

    reader.onload = function(e) {
        console.log(reader.result);
    }

    reader.readAsText(filename);
}