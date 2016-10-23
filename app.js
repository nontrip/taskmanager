var count=0;
$(document).ready(function(){
	$('#task_inp').focus();
	var add_task = function(){

		if($('#task_inp').val() != "")
		{
			if(count>3){
				$('#menu').css('border-bottom', '1px solid #ccc');
				$('#tasks').animate({'margin-top': 30}, 500);
			}
			$('#menu').removeClass('botBorder');
			$('.task').css({'border-top':'1px solid #ccc'});
			$("#tasks").show().prepend('<div class="task"><h2>'+ $('#task_inp').val() +'</h2><span class="rem">X</span>'+'</div>');
			$('.task').eq(0).hide().slideDown(500);
			count++;
			$("#task_inp").val("");
			$('#task_inp').focus();
		}
	}

	$('#main').addClass('onLoad');

	if($('.task').length == 0)
	{
		$('#menu').addClass('botBorder');
		$('#tasks').hide();
	}

	$(document).keydown(function(e){
		if(e.which==13){
			add_task();
		}
	});

	$('#task_add').on('click', function(){
		add_task();
	});

	$(document).on('click', '.rem', function(){
		$(this).parent().slideUp(500);
		count--;
		if(count<5){$('#menu').css('border-bottom', 'none');
				$('#tasks').animate({'margin-top': 0}, 500);}
	});

	$('#removeAll').click(function()
	{
		count=0;
		$('#menu').css('border-bottom', 'none');
				$('#tasks').animate({'margin-top': 0}, 500);
		$.each($('.task'), function(index, element)
		{
			$('.task').eq(index).slideUp(500);
		});
	});

	var editMode = {
		on:false,
		row:null
	};

	$(document).on('click', '.task h2', function()
	{
		if(editMode.on == false)
		{
			editMode.on = true;
			editMode.row = $(this).index();
			$('.task').eq($(this).index()).css({'background':'#ddd'});
		}
		else
		{
			editMode.on = false;
			$('.task').eq($(this).index()).css({'background':'none'});
		}
	});

	$(document).keydown(function(e)
	{
		if(editMode.on == true)
		{
			if(e.which == 8)
			{
				var text = $('.task h2').eq(editMode.row).text();
				var arr = text.split('');
				arr.pop();
				var resText = "";

				for(var i = 0; i < arr.length;i++)
				{
					resText += arr[i].toString();
				}
				$('.task h2').eq(editMode.row).text(resText);
			}
			else
			{
				var char = String.fromCharCode(e.which).toLowerCase();
				var text = $('.task h2').eq(editMode.row).text();
				text += char;
				$('.task h2').eq(editMode.row).text(text);
			}
		}
	});




});