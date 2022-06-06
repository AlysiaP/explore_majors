// Accordion Script
$(function() {
    var Accordion = function(el, multiple) {
    	this.el = el || {};
		this.multiple = multiple || true;

		// Variables privadas
		var accordionList = this.el.find('.accordionList');

		// Evento
		accordionList.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)

	};

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');
	};	

	var accordion = new Accordion($('#accordion'), false);
});

//Accordion addition to close on tablet/mobile for major pages
$(window).resize(function resize() {
    if ($(window).width() < 768) {
                
        $('.contactDepartment .submenu').slideUp();
        $('.resources .submenu').slideUp()
        
        $('.contactDepartment').removeClass('open');
        $('.resources').removeClass('open');
    } else {
        $('.contactDepartment .submenu').slideDown();
        $('.resources .submenu').slideDown()
        
        $('.contactDepartment').addClass('open');
        $('.resources').addClass('open');
    }
}).trigger('resize');

// Swiper Slides for Major Pages
//Random variable for initial slide
var swiper = new Swiper('.swiper-container', {
  slidesPerView: 3,
  slidesPerColumn: 1,
  spaceBetween: 30,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 30,
      keyboard: {
        enabled: true,
      },
    },
  }
});

//Update swiper on window resize
$(window).on('resize', function () {
  swiper.update();
});