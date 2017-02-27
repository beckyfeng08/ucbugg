var toggleSpeed = 100;
var currentSection = 1;

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
	$(".scrollup").hide();
};

var correctPipelines = function() {
	heights = [($("#modeling").offset().top + 40 - $("#pipeline-svg").offset().top)/$("#pipeline-svg").height(),
		($("#rigging").offset().top + 40 - $("#pipeline-svg").offset().top)/$("#pipeline-svg").height(),
		($("#animation").offset().top + 40 - $("#pipeline-svg").offset().top)/$("#pipeline-svg").height()];
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

var scrollToLab = function() {
	$('#mainbody').animate({
    		scrollTop: $("#labs-pipeline").height() + $("#labs-header").height() + 170
    	}, 600);
}

var createLab = function(filename) {
	// console.log($("#"+filename.toLowerCase().replace(/\s/g, '')));
	var onSuccess = function(data) {
		// $("#labs-header").hide(200);
		// $("#labs-pipeline").hide(200);
		scrollToLab();

		// $("#labs-header").html('<h6 class="lab">' + filename + "</h6>");
    	$("#lab").html(data);
 
		updateHash("labs" + filename.toLowerCase().replace(/\s/g, ''));

		// console.log("filename: " + filename);
		if (filename in labLookup) {
			// console.log("wtf");
			filename = labLookup[filename];
		}
		// console.log("filename: " + filename);
		$("#lab").prepend('<section class="heading" id="labs-header">' + 
			'<h6 class="lab"> ' + filename.toUpperCase() + ' </h3> </section>');
    	$(".lab-content").children().hide();
    	scrollToSection(1);

    	// $("#lab").append(data);
    	// $('#mainbody').animate({
    	// 	scrollTop: $("#labs-pipeline").height() + $("#labs-header").height()
    	// }, 400);
    	// $("#mainbody").scroll(function (e) {
    	// 	if ($("#mainbody").scrollTop() > $("#labs-pipeline").height() + $("#labs-header").height() + 170) {
    	// 		$(".lab-outline").css("position", "fixed");
    	// 		$(".lab-outline").css("top", "80px");

    	// 	} else {
    	// 		$(".lab-outline").css("position", "relative");
    	// 	}
    	// });

    };
    var onFailure = function(data, textStatus, errorThrown) { 
    	$("#lab").empty();
    	// $("#lab").append(data.responseText);
        console.error('lab not found'); 
        console.log(textStatus, errorThrown);
    };
    makeGetRequest('labs/' + filename.toLowerCase().replace(/\s/g, ''), "html", onSuccess, onFailure);
	updateHash("labs" + filename);
}

var scrollToSection = function(sec) {
	scrollToLab();
	$("#next").show();
	$("#previous").show();
	if (sec == 1)
		$("#previous").hide();
	else if (sec == $(".lab-outline").children().length)
		$("#next").hide();
	// console.log(sec);
	$("#outline" + currentSection).css('color', "#97999b");
	// console.log("currentSection is " + currentSection);
	$("#labsection" + currentSection).hide(250);
	currentSection = sec;
	// console.log("showing #labsection" + currentSection);
	$("#outline" + currentSection).css('color', "#8dbfe7");
	$("#labsection" + currentSection).show(250);
}

