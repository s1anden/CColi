$(function () {
	$(".draggable").draggable({snap: ".droppable", snapMode: "inner", containment: "parent"});
	$(".droppable").droppable({
		tolerance:"intersect",
		drop:function(event,ui) {
			$(this)
				.html(ui.draggable.html())
				.droppable('option','accept',ui.draggable);
			$(ui.draggable)
				.css("opacity","0.0");
			$(":input[name='" + $(this).attr('id') + "']")
				.val(ui.draggable.attr('id'));
		},
		out:function(event,ui) {
			$(this)
				.html("")
				.droppable('option','accept','.draggable');
			$(ui.draggable)
				.css("opacity","1.0")
				.css("width","auto")
				.css("height","auto")
				.css("padding","5px");
			$("input[name=" + $(this).prop('id') + "]")
				.val("");
		}
	});

	$(".sortable").sortable({
		revert:true,
		create: function() {
			$("input[name='"+$(this).attr('id').replace('sort-','')+"']").val($(this).sortable("toArray"));
		},
		update: function() {
			$("input[name='"+$(this).attr('id').replace('sort-','')+"']").val($(this).sortable("toArray"));
		}
	});

	$("ul, li").disableSelection();
});

function checkAnswers() {
	var numQuestions = $(".question-wrapper").length;
	var numCorrect = 0;
	$(".question-wrapper").each(function(){
		var complete = true;
		var correct = true;
		if ($(this).hasClass('multiple-choice')) {
			if ($("input[name='"+$(this).attr('id')+"']:checked").length == 0){
				complete = false;
			} else if (answers[$(this).attr('id')] != $("input[name='"+$(this).attr('id')+"']:checked").val()) {
				$("input[name='"+$(this).attr('id')+"']").attr('disabled','disabled');
				correct = false;
			} else {
				$("input[name='"+$(this).attr('id')+"']").attr('disabled','disabled');
			}
		} else if ($(this).hasClass('match')) {
			jQuery.each(answers[$(this).attr('id')], function(key,value) {
				if ($("input[name='"+key+"']").val() == "") {
					complete = false;
					return false;
				} else if ($("input[name='"+key+"']").val() != value) {
					correct = false;
					return false;
				}
			});

			if (complete == true) {
				$("#" + $(this).attr('id') + " .draggable").draggable("disable");
			} 
		} else if ($(this).hasClass('select-all')) {
			if ($("input[name='"+$(this).attr('id')+"']:checked").length == 0) {
				complete = false;
			} else {
				var question = $(this);
				$("input[name='"+question.attr('id')+"']").each(function(){ 
					if ((($(this).is(':checked')) && (jQuery.inArray($(this).val(),answers[question.attr('id')]) == -1)) || ((! $(this).is(':checked')) && (jQuery.inArray($(this).val(),answers[question.attr('id')]) != -1))) {
						correct = false;
						return false;
					} 
				});
				
				$("input[name='"+$(this).attr('id')+"']").attr('disabled','disabled');
			}
		} else if ($(this).hasClass('arrange')) {
			if (answers[$(this).attr('id')] == $("input[name='"+$(this).attr('id')+"']").val()) {
				$(".sortable").sortable("disable");
			} else {
				correct = false;
				$("#sort-"+$(this).attr('id')).sortable("disable");
			}
		} else if ($(this).hasClass('fill-in')) {
			if (jQuery.inArray($("input[name='"+$(this).attr('id')+"']").val(),answers[$(this).attr('id')]) != -1) {
				$("input[name='"+$(this).attr('id')+"']").attr('disabled','disabled');
			} else if ($("input[name='"+$(this).attr('id')+"']").val() == ""){
				complete = false;
			} else {
				correct = false;
				$("input[name='"+$(this).attr('id')+"']").attr('disabled','disabled');
			}
		}
		if (complete == false) {
			$("#results-" + $(this).attr('id')).css('display','block').html("You have not fully completed this question.").addClass("incorrect");
		} else if (correct == false) {
			$("#results-"+$(this).attr('id')).css('display','block').addClass('incorrect');
		} else {
			$("#results-"+$(this).attr('id')).css('display','block').addClass('correct').html("Correct!");
		}
	});
	$("#score").html("Score: " + numCorrect + " / " + numQuestions);
	window.scrollTo(0,0);
	return false;
}