// Record the answers to the questions on the page in this variable. The answers should be in the following format: {"question 1 id attr":question 1 answer,"question 2 id attr":question 2 answer,...} Each type of question has a different format for the answer:
// 	Multiple-choice (1 possible answer): "value attribute of correct option"
// 	Diagram labelling, Matching: {"id attr of box 1":"id attr of matching label","id attr of box 2":"id attr of matching label",etc...}
// 	Multiple-select (1+ possible answers):["value attr of correct option 1","value attr of correct option 2",etc....]
// 	Ordering/Arranging:["id attr of first/top item","id attr of second item",....."id attr of last/bottom item"]  <  in the CORRECT order
// 	Fill in the blank:["acceptable answer 1","acceptable answer 2","acceptable answer 3"]
var answers = {"samp01":"A","samp02":{"samp02-drop_01":"anode","samp02-drop_02":"electrons-right","samp02-drop_03":"salt-bridge","samp02-drop_04":"cathode","samp02-drop_05":"metal-salt"},"samp03":{"samp03-drop_01":"dipole","samp03-drop_02":"acid","samp03-drop_03":"titration"},"samp04":["A","D","E"],"samp05":["samp05-drag_05","samp05-drag_02","samp05-drag_03","samp05-drag_01","samp05-drag_04"],"samp06":["five","5","5.0"]};
var incorrect = {"samp01":"The correct answer is A.","samp02":"The correct answers are (clockwise, from bottom left: Anode, Electrons >>>, Salt Bridge, Cathode, Metal Salt.","samp03":"The correct answers are (top to bottom): Dipole, Acid, Titration.","samp04":"The correct answers are A, D, and E.","samp05":"The correct answers are (top to bottom): Ag, Cu, Sn, Zn, Mg.","samp06":"The correct answer is 5."};

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

function check(question) { 
	var complete = true;
	var correct = true;
	if (question.hasClass('multiple-choice')) {
		if ($("input[name='"+question.attr('id')+"']:checked").length == 0){
			complete = false;
		} else if (answers[question.attr('id')] != $("input[name='"+question.attr('id')+"']:checked").val()) {
			$("input[name='"+question.attr('id')+"']").attr('disabled','disabled');
			correct = false;
		} else {
			$("input[name='"+question.attr('id')+"']").attr('disabled','disabled');
		}
	} else if (question.hasClass('match')) {
		jQuery.each(answers[question.attr('id')], function(key,value) {
			if ($("input[name='"+key+"']").val() == "") {
				complete = false;
				return false;
			} else if ($("input[name='"+key+"']").val() != value) {
				correct = false;
				return false;
			}
		});

		if (complete == true) {
			$("#" + question.attr('id') + " .draggable").draggable("disable");
		} 
	} else if (question.hasClass('select-all')) {
		if ($("input[name='"+question.attr('id')+"']:checked").length == 0) {
			complete = false;
		} else {
			$("input[name='"+question.attr('id')+"']").each(function(){ 
				if ((($(this).is(':checked')) && (jQuery.inArray($(this).val(),answers[question.attr('id')]) == -1)) || ((! $(this).is(':checked')) && (jQuery.inArray($(this).val(),answers[question.attr('id')]) != -1))) {
					correct = false;
					return false;
				} 
			});
			
			$("input[name='"+question.attr('id')+"']").attr('disabled','disabled');
		}
	} else if (question.hasClass('arrange')) {
		if (answers[question.attr('id')] == $("input[name='"+question.attr('id')+"']").val()) {
			$(".sortable").sortable("disable");
		} else {
			correct = false;
			$("#sort-"+$(this).attr('id')).sortable("disable");
		}
	} else if (question.hasClass('fill-in')) {
		if (jQuery.inArray($("input[name='"+question.attr('id')+"']").val(),answers[question.attr('id')]) != -1) {
			$("input[name='"+question.attr('id')+"']").attr('disabled','disabled');
		} else if ($("input[name='"+question.attr('id')+"']").val() == ""){
			complete = false;
		} else {
			correct = false;
			$("input[name='"+question.attr('id')+"']").attr('disabled','disabled');
		}
	}
	if (!complete) {
		$("#results-" + question.attr('id')).css('display','block').html("You have not fully completed this question.").addClass("incorrect");
	} else if (!correct) {
		$("#results-"+question.attr('id')).css('display','block').addClass('incorrect').html("Incorrect. " + incorrect[question.attr('id')]);
	} else {
		$("#results-"+question.attr('id')).css('display','block').addClass('correct').html("Correct!");
	}
	return false;
}

function resetForms() {
	$(".tutor input").each(function() {
		$(this).removeAttr('disabled','');
	});

	$(".tutor").each(function() {
		// $(this).children('input').each(function(){
		// 	$(this).attr('disabled','');
		// });

		$(this).each(function() {
			this.reset();
		});
	});


}