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


  // form interact function ---------------------------------------
  $('input.form-control , textarea.form-control').keypress(function() {
    $(this).closest('.form-group,.form-group-full').find('button.clear-ipt').css('opacity','1');
  });
  $('input.form-control , textarea.form-control').blur(function() {
    if($(this).val() == ''){
      $(this).closest('.form-group,.form-group-full').find('button.clear-ipt').css('opacity','0');
    }
  });
  $('.clear-ipt').click(function () {
    $(this).closest('.form-group,.form-group-full').find('input,textarea').val('');
    $(this).closest('.form-group,.form-group-full').find('input,textarea').focus();
    $(this).css('opacity','0');
  });

  $('.history-ticket').each(function (i, obj) {
    $(this).mCustomScrollbar();
  });

  $('.note-history-list').mCustomScrollbar();

  $( "#appointmentdatepicker" ).datepicker();

  $(window).scroll(function() {
      var footh = $('footer').innerHeight();
    if($(window).scrollTop() + $(window).height() == $(document).height()) {
      $('.ticket-btn-list').css('bottom',footh+'px');
    }else{
      $('.ticket-btn-list').css('bottom','0');
    }
  });

  $( ".tk-step-title" ).each(function(index) {
    $(this).on("click", function(){
      setTimeout(function () {
        var ctbgh = $('.content').innerHeight();
        ctbgh = ctbgh-415;
        $('head').append('<style>.dashboard-page.customer-calling .content:before{height: ' + ctbgh + 'px;}</style>');
      }, 350);
    });
  });

  // clock realtime update per minute---------------------------------------
  function updatetime() {
    $('#datetime-display').html(moment().format('ddd, MMM D h:mm A'));
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
    gapw = gapw + 30 + 6; //skew

    $('head').append('<style>.dashboard-page.customer-calling .customer-detail .customer-profile:before{width: ' + (gapw) + 'px; left: -' + (gapw-1) + 'px;}</style>');

    var bheight = $(window).innerHeight();
    var cheight = $('.content').innerHeight();
    var c2height = $('.customer-detail').innerHeight();
    var hheight = $('.header-inner').innerHeight();
    var fheight = $('footer').innerHeight();
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

    var ctbgh = cheight-395;
    $('head').append('<style>.dashboard-page.customer-calling .content:before{height: ' + ctbgh + 'px;}</style>');
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

  $("header .header-inner .navbar .navbar-nav li" ).hover(function() {
    if($(this).hasClass('dropdown')){
      $(this).toggleClass('open');
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

  $('#collapsetk6 #statustoggle').click(function () {
    $('#collapsetk6 .statusth .toggle-sort').click();
  });
  $('#collapsetk6 #assitoggle').click(function () {
    $('#collapsetk6 .assith .toggle-sort').click();
  });
  $('#collapsetk6 #datetoggle').click(function () {
    $('#collapsetk6 .dateth .toggle-sort').click();
  });

  $( "#collapsetk6 .toggle-sort" ).on("click", function () {
    if ($(this).parent().hasClass('assith')) {
      $(this).toggleClass("asc desc");
      $('#collapsetk6 #assitoggle').toggleClass("asc desc");
    }
    else if ($(this).parent().hasClass('statusth')) {
      $(this).toggleClass("asc desc");
      $('#collapsetk6 #statustoggle').toggleClass("asc desc");
    }
    else if ($(this).parent().hasClass('dateth')) {
      $(this).toggleClass("asc desc");
      $('#collapsetk6 #datetoggle').toggleClass("asc desc");
    }
    else{
      $(this).toggleClass("asc desc");
    }
  });

  $('#collapsetk8 #datetoggle').click(function () {
    $('#collapsetk8 .dateth .toggle-sort').click();
  });
  $('#collapsetk8 #updatetoggle').click(function () {
    $('#collapsetk8 .updatedth .toggle-sort').click();
  });
  $( "#collapsetk8 .toggle-sort" ).on("click", function () {
    if ($(this).parent().hasClass('dateth')) {
      $(this).toggleClass("asc desc");
      $('#collapsetk8 #datetoggle').toggleClass("asc desc");
    }
    else if ($(this).parent().hasClass('updatedth')) {
      $(this).toggleClass("asc desc");
      $('#collapsetk8 #updatetoggle').toggleClass("asc desc");
    }
    else{
      $(this).toggleClass("asc desc");
    }
  });

  // step mobile

  var wwidth = $(window).width();
  var hheight = $('.header-inner').innerHeight();

  $(window).resize(function () {
    wwidth = $(window).width();
    if(wwidth < 981) {
      if ($(this).scrollTop() > hheight) {
        $('.gotostep-list').show();
        // $('.gotostep-list').css('opacity','1');
      }
      else if ($(this).scrollTop() <= hheight) {
        $('.gotostep-list').hide();
        // $('.gotostep-list').css('opacity','0');
      }
    }
  });

  $(window).scroll(function () {
    if(wwidth < 981) {
      if ($(this).scrollTop() > hheight) {
        $('.gotostep-list').show();
        // $('.gotostep-list').css('opacity','1');
      }
      else if ($(this).scrollTop() <= hheight) {
        // $('.gotostep-list').css('opacity','0');
        $('.gotostep-list').hide();
      }
    }
  });

  $('.gotostep-list .gotostep').click(function () {
    setTimeout(function () {
        $('.nav-mobile-backdrop').toggleClass('white open');
    }, 20);
    $(this).parent().toggleClass('scale');
  });

  $('.gotostep-list a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      var thishash = $(this).attr('href').substring($(this).attr('href').indexOf('#'));
      var thishashparent = $(thishash).closest('.tk-step').find('.tk-step-title.collapsed').trigger("click");
      var hh = $('.dashboard-page header').height();
      hh = hh*2;

      if (target.length) {
      $('html,body').animate({
        scrollTop: (target.offset().top)-hh
      }, 500);
      // $(thishashparent+'a').click();
      $('.nav-mobile-backdrop').toggleClass('white open');
      $('.gotostep-list').toggleClass('scale');
      return false;
      }
    }
  });



});
