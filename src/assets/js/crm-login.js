$(document).ready(function() {
	// forecast realtime update per hour ---------------------------------------
	//getWeather();
	//setInterval(getWeather, 60000); //Update the weather every hr.

	function getWeather() {
		$.simpleWeather({
			location: 'BKK, TH',
			unit: 'c',
			success: function(weather) {
				html = '<div><i class="icon-'+weather.code+'"></i> '+weather.temp+'&deg;'+weather.units.temp+'</div>';
				html += '<div class="currently">'+weather.currently+'</div>';

				$("#forecast-display").html(html);
			},
			error: function(error) {
				$("#forecast-display").html('<p>'+error+'</p>');
			}
		});
	}

	// clock realtime update per minute---------------------------------------
	function updatetime() {
		$('#datetime-display').html(moment().format('ddd, MMM D h:mm A'));
	}
	//updatetime();
	//setInterval(updatetime, 1000);

	// calculate footer at bottom ---------------------------------------
	setTimeout(function () {
	    //centercontent();
	}, 0);

	function centercontent() {
		var bheight = $(window).innerHeight();
		var cheight = $('.content').innerHeight();
		var hheight = $('.logo-company').innerHeight();
		var fheight = $('footer').innerHeight();
		var allh = cheight+hheight+fheight;

		var rspace = bheight - hheight;
		rspace = rspace - fheight;
		var fromtop =  cheight - rspace;

		if(bheight > allh){
			$('body').css('min-height', bheight);
			$('.content').css('margin-top',Math.abs(fromtop/2));
			$('footer').css('top', bheight-fheight);
		}else{
			$('body').css('min-height', allh);
			$('footer').css('top', 'auto');
		}
	}
	$( window ).resize(function() {
		setTimeout(function () {
			//centercontent();
		}, 0);
	});

	$('.btn-submit-1').click(function(){
		setTimeout(function () {
			//centercontent();
		}, 0);
	});

	// $('.btn-submit-2').click(function(){
	// 	setTimeout(function () {
	// 		centercontent();
	// 	}, 100);
	// });

});
