var options = {
    valueNames: [ 'title', { attr: 'href', name: 'titleLink'}],item: '<li class="a-z--list-item" ><a class="titleLink title"></a></li>',};

var userList = new List('a-z-list', options, majors);

// Creates the A-Z Letter Titles
var lastLetter = '';
$('#a-z-list').find('li').each(function() {
  var $this = $(this),
      text = $.trim($this.text()),
      firstLetter = text[0];

  if (firstLetter != lastLetter) {
    $this.before('<li class="splitter"><h3>' + firstLetter + '</h3></li>');lastLetter = firstLetter;}
});