// Create new array with spans around degree levels
var badgedMajors = majors;
badgedMajors.forEach(createBadges);

function createBadges(arrayItem, index, array) {
    var str = arrayItem.degreeLevels; 
    str = wrapWords(str);

    badgedMajors[index].degreeLevels = str;
}

function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "<span>$&</span>");
}

var options = {
    valueNames: [ 'title', 'description', 'degreeLevels', 'schoolName', { data: ['school'] }, { attr: 'href', name: 'titleLink'}],
    item: '<li class="list--list-item" data-school ><a class="titleLink"><h3 class="titleLink title"></h3></a><p class="description"></p><p class="degreeLevels"></p><div><span class="college-icon"></span><span class="schoolName"></span></div></li>',
    page: 10,
    pagination: true,
    pagination: [{
        outerWindow: 1,
    }],
	fuzzySearch: {
		searchClass: "search-bar",
        distance: 1000,
        threshold: 0.2,
	}
};

var userList = new List('major-list', options, badgedMajors);
var values_school = [];
var values_degreeLevels = [];
var values_degreeLevelString = "";

//Sorting Degrees Alphabetically
userList.sort('title', { order: "asc" });

function resetList(){
	values_school = [];
	values_degreeLevels = [];
	userList.search();
	userList.filter();
	userList.update();
	$('.filter-all').prop('checked', true);
	$('.filter').prop('checked', false);
	$('.search-bar').val('');
	//console.log('Reset Successfully!');
};

//filtering for stackable filters
$('.filter').change(function() {
	var isChecked = this.checked;
	var value = $(this).val();
	
	if($(this).attr('name') == 'degreeLevels') {
		if(isChecked){
			//  add to list of active filters
			values_degreeLevels.push(value);
			// console.log(values_degreeLevels);
		}
		else
		{
			// remove from active filters
			values_degreeLevels.splice(values_degreeLevels.indexOf(value), 1);
		}
	} else {
		if(isChecked){
			//  add to list of active filters
			values_school.push(value);
			// console.log(values_school);
		}
		else
		{
			// remove from active filters
			values_school.splice(values_school.indexOf(value), 1);
		}
	}

	userList.filter(function (item) {
		var schoolFilter = false;
		var degreeLevels = false;
		
		if(values_school.length == 0)
		{ 
			schoolFilter = true;
		} else {
			schoolFilter = values_school.indexOf(item.values().school) >= 0;
		}

		if(values_degreeLevels.length == 0)
		{ 
			degreeLevels = true;
		} else {
			$(values_degreeLevels).each(function(index, value) {
				degreeLevels = item.values().degreeLevels.indexOf(value) >= 0;
			});
		}

		return degreeLevels && schoolFilter;
	});

	userList.update();

});


// Integrate search and filters from major pages
if(searchFilter != null) {
    userList.search(searchFilter);
    $('.page--majors .search-bar').val(searchFilter);
    
    if (userList.matchingItems.length >= 1) {
    	$('.no-result').hide();
	} else {
		$('.no-result').show()
	}
}

if(schoolFilter != null) {
    $('.filter[value="'+schoolFilter+'"]').click();
}

$(function(){
	userList.on('updated', function (list) {
		if (list.matchingItems.length >= 1) {
			$('.no-result').hide();
		} else {
			$('.no-result').show()
		}
	});
});

// Accordion Script
$(function() {
    var Accordion = function(el, multiple) {
		this.el = el || {};
		this.multiple = multiple || true;

		// Variables privadas
		var accordionList = this.el.find('.accordionList');

		// Evento
		accordionList.on('click', {el: this.el, multiple: this.multiple}, this.dropdown)

	}

	Accordion.prototype.dropdown = function(e) {
		var $el = e.data.el;
			$this = $(this),
			$next = $this.next();

		$next.slideToggle();
		$this.parent().toggleClass('open');
	}	

	var accordion = new Accordion($('#accordion'), false);
});

// Modal Script for Magnific Popup
$('.open-popup-link').magnificPopup({
  type:'inline',
  midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  fixedContentPos: true,
  fixedBgPos: false,
  overflowY: 'scroll'
});

// Page counter TESTING

var totalItems = userList.update().matchingItems.length;
var pageItems = userList.update().visibleItems.length;
var startingIndex = userList.i;

updatePageCounter();

$(function(){
    userList.on('updated', function (list) {
        updatePageCounter();
    });
});

function updatePageCounter() {
    totalItems = userList.matchingItems.length;
    startingIndex = userList.i;
    pageItems = userList.visibleItems.length;
    
    var tempPageItems = (pageItems + startingIndex)-1;
    
    if(pageItems < 1) {
        $('.page-counter').hide();
    } else {
        $('.page-counter').show();
    }

    $('.page-counter').html(startingIndex+'-'+tempPageItems+' of '+totalItems+' results');
}

// Testing Page functions in List.JS

// console.log(pagingList);

//Preloader for Search Feature
if(majors.length >= 1) {
  $('#status').fadeOut(); // will first fade out the loading animation 
  $('#preloader').fadeOut(); // will fade out the white DIV that covers the website.
}

// If Apply Today and Request Info buttons exist ~ adding extra space below compliance footer to be visible
function checkwindowSize() {
  var windowSize = $(window).width();
  if(windowSize < 768 && $('.applyRequest').length > 0) {
      document.getElementById("final-footer").style.marginBottom = "66px";
  } else
  document.getElementById("final-footer").style.marginBottom = "0px";
}    

checkwindowSize();

$(window).resize(function(){checkwindowSize()})