$(document).ready(function() {
	// carousel ---------------------------------------
	$('.carousel').carousel({
		interval: false
	});
	var wwidth = $(window).width();
	if(wwidth < 981){
		$(".carousel").swipe({
			swipe: function (event, direction, distance, duration, fingerCount, fingerData) {
				if (direction == 'left') $(this).carousel('next');
				if (direction == 'right') $(this).carousel('prev');
			},
			allowPageScroll: "vertical"

		});
	}
	$(window).resize(function () {
		wwidth = $(window).width();
	});

	// animate first load ---------------------------------------
	setTimeout(function () {
		$('header').css('opacity',1);
	}, 50);
	setTimeout(function () {
		$('.cbar-1').css('opacity',1);
	}, 100);
	setTimeout(function () {
		$('.cbar-2').css('opacity',1);
	}, 300);
	setTimeout(function () {
		$('.cbar-3').css('opacity',1);
	}, 500);
	setTimeout(function () {
		$('.cbar-4').css('opacity',1);
	}, 700);
	setTimeout(function () {
		$('.cbar-5').css('opacity',1);
	}, 900);
	setTimeout(function () {
		$('.status-carousel').css('opacity',1);
	}, 1200);
	setTimeout(function () {
		$('.tbl-assign').css('opacity',1);
	}, 1400);

	$('.status-detail').each(function (i, obj) {
		$(this).mCustomScrollbar();
	});


	// form interact function ---------------------------------------
	$('.tbl-assign-1 .tbl-assign-title , .tbl-assign-2 .tbl-assign-title').click(function(){
		setTimeout(function () {
			centercontent();
		}, 350);
	});

	$('.tbl-assign-1 #addrow').click(function(){
		console.log('calculate footer');
		setTimeout(function () {
			centercontent();
		}, 50);
	});

	$('.tbl-assign-2 #addrow').click(function(){
		console.log('calculate footer');
		setTimeout(function () {
			centercontent();
		}, 50);
	});

	// clock realtime update per minute---------------------------------------
	function updatetime() {
		$('#datetime-display').html(moment().format('ddd, MMM D h:mm A'));
		$('#datetime-display-mobile').html(moment().format('ddd, MMM D h:mm A'));
	}
	updatetime();
	setInterval(updatetime, 1000);

	// calculate footer at bottom ---------------------------------------
	setTimeout(function () {
	    centercontent();
	}, 200);

	function centercontent() {
		var ww = $(window).width();
		var cw = $('.container').width();

		var gapw = ww - cw;
		gapw = (gapw/2);
		gapw = gapw + 40; //skew

		$('head').append('<style>.counter-bar ul li.cbar-1:before{width: ' + (gapw+5) + 'px; left: -' + (gapw-4) + 'px;} ' +
			'.counter-bar .status-carousel:after{width: ' + gapw + 'px; right: -' + (gapw-1) + 'px;}</style>');

		var bheight = $(window).innerHeight();
		var cheight = $('.content').innerHeight();
		var c2height = $('.counter-bar').innerHeight();
		var hheight = $('.header-inner').innerHeight();
		var fheight = $('footer').innerHeight();;
		var allh = cheight+hheight+fheight+c2height;
		var rspace = bheight - hheight;
		rspace = rspace - fheight;
		var fromtop =  cheight - rspace;
		if(bheight > allh){
			$('body').css('min-height', bheight);
			$('footer').css('top', bheight-fheight);
		}else{
			$('body').css('min-height', bheight);
			$('footer').css('top', 'auto');
		}
	}
	$( window ).resize(function() {
		setTimeout(function () {
	      centercontent();
	    }, 50);
	});

	// shrink function---------------------------------------
	$('header').addClass('original').clone().insertAfter('header').addClass('cloned').css('position','fixed').css('top','0').css('margin-top','0').css('z-index','500').removeClass('original').hide();
	scrollIntervalID = setInterval(stickIt, 10);

	function stickIt() {

		var orgElementPos = $('.original').offset();
		orgElementTop = orgElementPos.top;

		if ($(window).scrollTop() >= (orgElementTop)) {
			orgElement = $('.original');
			coordsOrgElement = orgElement.offset();
			leftOrgElement = coordsOrgElement.left;
			widthOrgElement = orgElement.css('width');
			$('.cloned').css('left',leftOrgElement+'px').css('top',0).css('width',widthOrgElement).show();
			$('.original').css('visibility','hidden');
		} else {
			$('.cloned').hide();
			$('.original').css('visibility','visible');
		}
	}

	var wwidth = $(window).width();
	if(wwidth < 981){
		$('header').addClass('shrink');
	}

	$(window).resize(function () {
		wwidth = $(window).width();
		if(wwidth > 981) {
			if ($(this).scrollTop() > 10) {
				$('header').addClass('shrink');
			}
			else if ($(this).scrollTop() <= 10) {
				$('header').removeClass('shrink');
			}
		}
		else{
			$('header').addClass('shrink');
		}
	});

	$(window).scroll(function () {
		if(wwidth > 981) {
			if ($(this).scrollTop() > 10) {
				$('header').addClass('shrink');
			}
			else if ($(this).scrollTop() <= 10) {
				$('header').removeClass('shrink');
			}
		}
	});

	$('.search-shrink-toggle').click(function(){
		$('.header-search').toggleClass('toggle-shrink');
	});

	// prevent nav dropdown---------------------------------------

	$('.nav .dropdown').click(function(event){
		if(wwidth > 981) {
			event.stopPropagation();
		}
		else{
		}
	});

	$('.nav-mobile .dropdown-submenu').click(function(event){
		if(wwidth > 981) {
			event.stopPropagation();
		}
		else{
			$(this).toggleClass('open');
			event.stopPropagation();
		}
	});

	// toggle nav mobile
	$('header .navbar-toggle').click(function(event){
		$('.nav-mobile').toggleClass('open');
		setTimeout(function () {
	      $('.nav-mobile-backdrop').toggleClass('open');
	    }, 90);
	});
	$('.nav-mobile button.close').click(function(event){
		$('.nav-mobile').toggleClass('open');
		setTimeout(function () {
	      $('.nav-mobile-backdrop').toggleClass('open');
	    }, 90);
	});


	// sorting table

	$('.tbl-assign-1 #prioritytoggle').click(function () {
		$('.tbl-assign-1 .priorityth .toggle-sort').click();
	});
	$('.tbl-assign-1 #statustoggle').click(function () {
		$('.tbl-assign-1 .statusth .toggle-sort').click();
	});
	$('.tbl-assign-1 #datetoggle').click(function () {
		$('.tbl-assign-1 .dateth .toggle-sort').click();
	});

	$( ".tbl-assign-1 .toggle-sort" ).on("click", function () {
		if ($(this).parent().hasClass('priorityth')) {
			$(this).toggleClass("asc desc");
			$('.tbl-assign-1 #prioritytoggle').toggleClass("asc desc");
		}
		else if ($(this).parent().hasClass('statusth')) {
			$(this).toggleClass("asc desc");
			$('.tbl-assign-1 #statustoggle').toggleClass("asc desc");
		}
		else if ($(this).parent().hasClass('dateth')) {
			$(this).toggleClass("asc desc");
			$('.tbl-assign-1 #datetoggle').toggleClass("asc desc");
		}
		else{
			$(this).toggleClass("asc desc");
		}
	});

	$('.tbl-assign-2 #prioritytoggle').click(function () {
		$('.tbl-assign-2 .priorityth .toggle-sort').click();
	});
	$('.tbl-assign-2 #statustoggle').click(function () {
		$('.tbl-assign-2 .statusth .toggle-sort').click();
	});
	$('.tbl-assign-2 #datetoggle').click(function () {
		$('.tbl-assign-2 .dateth .toggle-sort').click();
	});

	$( ".tbl-assign-2 .toggle-sort" ).on("click", function () {
		if ($(this).parent().hasClass('priorityth')) {
			$(this).toggleClass("asc desc");
			$('.tbl-assign-2 #prioritytoggle').toggleClass("asc desc");
		}
		else if ($(this).parent().hasClass('statusth')) {
			$(this).toggleClass("asc desc");
			$('.tbl-assign-2 #statustoggle').toggleClass("asc desc");
		}
		else if ($(this).parent().hasClass('dateth')) {
			$(this).toggleClass("asc desc");
			$('.tbl-assign-2 #datetoggle').toggleClass("asc desc");
		}
		else{
			$(this).toggleClass("asc desc");
		}
	});



});
