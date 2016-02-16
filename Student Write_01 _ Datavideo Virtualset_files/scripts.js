

/*===================================================================================*/
/*	HEADER SHRINK
/*===================================================================================*/

$(document).ready(function() {

	var s = skrollr;
	var sActive = false;

	if ($(window).width() > 1024) {
		s.init({
			mobileCheck: function() {
				return false;
			}
		});
		sActive = true;
	}

	$(window).on('resize', function() {
		if ($(window).width() < 1024 && sActive) {
			s.init().destroy();
			sActive = false;
		}
		else if ($(window).width() > 1024) {
			s.init({
				mobileCheck: function() {
					return false;
				}
			});
			sActive = true;
		}
	});

});


/*===================================================================================*/
/*	STICKY NAVIGATION
/*===================================================================================*/

$(document).ready(function() {
	$('.navbar .navbar-collapse').waypoint('sticky');
});


/*===================================================================================*/
/*	DROPDOWN ON HOVER (NAVIGATION)
/*===================================================================================*/

$(document).ready(function () {

	$('.js-activated').dropdownHover({
		instantlyCloseOthers: false,
		delay: 0
	}).dropdown();

});

/*===================================================================================*/
/*	ANIMATIONS ON SCROLL
/*===================================================================================*/

//$(document).ready(function() {
//	var waypointClass = 'main [class*="col-"]';
//	var animationClass = 'fadeInUp';
//	var delayTime;
//
//	$(waypointClass).waypoint(function() {
//		delayTime += 100;
//		$(this).delay(delayTime).queue(function(next){
//			$(this).toggleClass('animated');
//			$(this).toggleClass(animationClass);
//			delayTime = 0;
//			next();
//		});
//	},
//	{
//		offset: '90%',
//		triggerOnce: true
//	});
//});


/*===================================================================================*/
/*	ISOTOPE PORTFOLIO
/*===================================================================================*/

$(document).ready(function () {

	var $container = $('.items');

	$container.imagesLoaded(function () {
		$container.isotope({
			itemSelector: '.item'
		});
	});

	var resizeTimer;

	function resizeFunction() {
		$container.isotope('reLayout');
	}

	$(window).resize(function() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 100);
	});

	$('a.panel-toggle.collapsed').click(function () {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(resizeFunction, 100);
	});

	$('.portfolio .filter li a').click(function () {

		$('.portfolio .filter li a').removeClass('active');
		$(this).addClass('active');

		var selector = $(this).attr('data-filter');

		$container.isotope({
			filter: selector
		});

		return false;
	});

});


/*===================================================================================*/
/*	ISOTOPE PORTFOLIO FULLSCREEN
/*===================================================================================*/

$(document).ready(function () {

	var isotopeBreakpoints = [

		{
			// Desktop
			min_width: 1680,
			columns: 6
		},

		{
			// iPad Landscape
			min_width: 1140,
			max_width: 1680,
			columns: 5
		},

		{
			// iPad Portrait
			min_width: 1024,
			max_width: 1440,
			columns: 4
		},

		{
			// iPhone Landscape
			min_width: 768,
			max_width: 1024,
			columns: 3
		},

		{
			// iPhone Portrait
			max_width: 768,
			columns: 1
		}

	];

	var $container = $('.items.fullscreen');

	$container.imagesLoaded(function () {
		$container.isotope({
			itemSelector: '.item'
		});
	});

	// hook to resize the portfolio items for fluidity / responsiveness
	$(window).smartresize(function () {
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();

		for (var i = 0; i < isotopeBreakpoints.length; i++) {
			if (windowWidth >= isotopeBreakpoints[i].min_width || !isotopeBreakpoints[i].min_width) {
				if (windowWidth < isotopeBreakpoints[i].max_width || !isotopeBreakpoints[i].max_width) {
					$container.find('.item').each(function () {
						$(this).width(Math.floor($container.width() / isotopeBreakpoints[i].columns));
					});

					break;
				}
			}
		}
	});

	$(window).trigger('smartresize');

});


/*===================================================================================*/
/*	ISOTOPE BLOG
/*===================================================================================*/

$(document).ready(function () {

	var $container = $('.posts');

	$container.imagesLoaded(function () {
		$container.isotope({
			itemSelector: '.post'
		});
	});

	$('.format-filter li a, .format-wrapper a').click(function () {

		var selector = $(this).attr('data-filter');

		$container.isotope({
			filter: selector
		});

		$('.format-filter li a').removeClass('active');
		$('.format-filter li a[data-filter="'+selector+'"]').addClass('active');

		$('html, body').animate({
			scrollTop: $('.format-filter').offset().top -130
		}, 600);

		return false;

	});

	$(window).on('resize', function () {
		$('.posts').isotope('reLayout')
	});

});


/*===================================================================================*/
/*	TABS
/*===================================================================================*/

$(document).ready(function () {

	$('.tabs.tabs-reasons').easytabs({
		cycle: 1500
	});

	$('.tabs.tabs-top, .tabs.tabs-circle-top, .tabs.tabs-2-big-top, .tabs.tabs-side').easytabs({
		animationSpeed: 200,
		updateHash: false
	});

});


/*===================================================================================*/
/*	ACCORDION (FOR ISOTOPE HEIGHT CALCULATION)
/*===================================================================================*/

$(document).ready(function () {
	if ($('.panel-group .portfolio').length > 0) {
		$('.panel-group .collapse.in').collapse({
			toggle: true
		});
	}
});


/*===================================================================================*/
/*	GO TO TOP / SCROLL UP
/*===================================================================================*/

! function (a, b, c) {
	a.fn.scrollUp = function (b) {
		a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))
	}, a.fn.scrollUp.init = function (d) {
		var e = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),
			f = e.scrollTitle ? e.scrollTitle : e.scrollText,
			g = a("<a/>", {
				id: e.scrollName,
				href: "#top"/*,
				title: f*/
			}).appendTo("body");
		e.scrollImg || g.html(e.scrollText), g.css({
			display: "none",
			position: "fixed",
			zIndex: e.zIndex
		}), e.activeOverlay && a("<div/>", {
			id: e.scrollName + "-active"
		}).css({
			position: "absolute",
			top: e.scrollDistance + "px",
			width: "100%",
			borderTop: "1px dotted" + e.activeOverlay,
			zIndex: e.zIndex
		}).appendTo("body"), scrollEvent = a(b).scroll(function () {
			switch (scrollDis = "top" === e.scrollFrom ? e.scrollDistance : a(c).height() - a(b).height() - e.scrollDistance, e.animation) {
			case "fade":
				a(a(b).scrollTop() > scrollDis ? g.fadeIn(e.animationInSpeed) : g.fadeOut(e.animationOutSpeed));
				break;
			case "slide":
				a(a(b).scrollTop() > scrollDis ? g.slideDown(e.animationInSpeed) : g.slideUp(e.animationOutSpeed));
				break;
			default:
				a(a(b).scrollTop() > scrollDis ? g.show(0) : g.hide(0))
			}
		}), g.click(function (b) {
			b.preventDefault(), a("html, body").animate({
				scrollTop: 0
			}, e.scrollSpeed, e.easingType)
		})
	}, a.fn.scrollUp.defaults = {
		scrollName: "scrollUp",
		scrollDistance: 300,
		scrollFrom: "top",
		scrollSpeed: 300,
		easingType: "linear",
		animation: "fade",
		animationInSpeed: 200,
		animationOutSpeed: 200,
		scrollText: "Scroll to top",
		scrollTitle: !1,
		scrollImg: !1,
		activeOverlay: !1,
		zIndex: 2147483647
	}, a.fn.scrollUp.destroy = function (d) {
		a.removeData(c.body, "scrollUp"), a("#" + a.fn.scrollUp.settings.scrollName).remove(), a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(), a.fn.jquery.split(".")[1] >= 7 ? a(b).off("scroll", d) : a(b).unbind("scroll", d)
	}, a.scrollUp = a.fn.scrollUp
}(jQuery, window, document);

$(document).ready(function () {
	$.scrollUp({
		scrollName: "scrollUp", // Element ID
		scrollDistance: 300, // Distance from top/bottom before showing element (px)
		scrollFrom: "top", // "top" or "bottom"
		scrollSpeed: 1000, // Speed back to top (ms)
		easingType: "easeInOutCubic", // Scroll to top easing (see http://easings.net/)
		animation: "fade", // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: "<i class='icon-up-open-mini'></i>", // Text for element, can contain HTML
		scrollTitle: " ", // Set a custom <a> title if required. Defaults to scrollText
		scrollImg: 0, // Set true to use image
		activeOverlay: 0, // Set CSS color to display scrollUp active point, e.g "#00FFFF"
		zIndex: 1001 // Z-Index for the overlay
	});
});


/*===================================================================================*/
/*	ANIMATED / SMOOTH SCROLL TO ANCHOR
/*===================================================================================*/

$(document).ready(function() {

	$("a.scroll-to").click(function() {

		if ($(window).width() > 1024) {
			var navbarHeight = 45;
		}
		else {
			var navbarHeight = 0;
		}

		if ($(this).attr('data-anchor-offset') !== undefined) {
			var anchorOffset = $(this).attr('data-anchor-offset');
		}
		else {
			var anchorOffset = 0;
		}

		$("html, body").animate({
			scrollTop: $($(this).attr("href")).offset().top - navbarHeight - anchorOffset + "px"
		}, {
			duration: 1000,
			easing: "easeInOutCubic"
		});
		return false;
	});

});


/*===================================================================================*/
/*	SCROLL SPY
/*===================================================================================*/

$(document).ready(function () {
	$('body').scrollspy({
		target: '.navbar-collapse',
		offset: 50
	})
});


/*===================================================================================*/
/*	IMAGE HOVER
/*===================================================================================*/

$(document).ready(function () {
	$('.icon-overlay a').prepend('<span class="icn-more"></span>');
});


/*===================================================================================*/
/*	MODALS
/*===================================================================================*/

$('.modal').on('hidden.bs.modal', function () {
	$('.video-container iframe').attr("src", $(".video-container iframe").attr("src"));
});


/*===================================================================================*/
/*	DATA REL
/*===================================================================================*/

$(document).ready(function () {
	$('a[data-rel]').each(function () {
		$(this).attr('rel', $(this).data('rel'));
	});
});


/*===================================================================================*/
/*	TOOLTIP
/*===================================================================================*/

$(document).ready(function () {
	if ($("[rel=tooltip]").length) {
		$("[rel=tooltip]").tooltip();
	}
});


/*===================================================================================*/
/*	GOOGLE MAPS
/*===================================================================================*/

//$(document).ready(function () {
//
//	function initialize() {
//		var mapOptions = {
//			zoom: 13,
//			center: new google.maps.LatLng(40.7902778, -73.9597222),
//			disableDefaultUI: true,
//			scrollwheel: false
//		}
//		var map = new google.maps.Map(document.getElementById('map'), mapOptions);
//	}
//
//	google.maps.event.addDomListener(window, 'load', initialize);
//
//	$('[id*="modal-contact"]').on('shown.bs.modal', function () {
//		initialize();
//	});
//
//});


/*===================================================================================*/
/*	CONVERTING iOS SAFARI VIEWPORT UNITS (BUGGY) INTO PIXELS
/*===================================================================================*/

//$(document).ready(function () {
//	window.viewportUnitsBuggyfill.init();
//});


/*===================================================================================*/
/*	FORM VALIDATION
/*===================================================================================*/

//$(document).ready(function() {
//
//	$('#contactform, #commentform').validate({
//
//		errorPlacement: function(error, element) {
//			$(element).attr({
//				'placeholder' : error.html()
//			});
//		},
//
//		focusInvalid: false,
//
//		rules: {
//			name: {
//				required: true,
//				minlength: 2
//			},
//			email: {
//				required: true,
//				email: true
//			},
//			message: {
//				required: true,
//				minlength: 10
//			}
//		},
//
//		messages: {
//			name: {
//				required: 'Please enter your name!',
//				minlength: jQuery.format('Name requires at least {0} characters!')
//			},
//			email: {
//				required: 'Please enter your email!',
//				email: 'Please enter a valid email!'
//			},
//			message: {
//				required: 'Please enter a message!',
//				minlength: jQuery.format('Message requires at least {0} characters!')
//			}
//		},
//
//		submitHandler: function(form) {
//			$('#contactform .btn-submit').html('Sending message ...');
//			$('#commentform .btn-submit').html('Sending comment ...');
//			$(form).ajaxSubmit({
//				success: function(responseText, statusText, xhr, $form) {
//					$(form).delay(1300).slideUp('fast');
//					$('#response').html(responseText).hide().delay(1300).slideDown('fast');
//				}
//			});
//			return false;
//		}
//
//	});
//
//});