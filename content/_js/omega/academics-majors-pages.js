// Get current page information
var currentSchool = $('.page--major').attr('id');
var currentMajor = $('.hero-title h1').text();

// Create new array with spans around degree levels
var badgedMajors = majors;
var relatedMajors = [];
badgedMajors.forEach(createBadges);

function createBadges(arrayItem, index, array) {
    var itemSchool = 'school-'+arrayItem.school;
    
    // Check if the items are in the same school and make sure the current major isn't part of the array
    if( itemSchool == currentSchool && arrayItem.title != currentMajor) {
        var str = arrayItem.degreeLevels; 
        str = wrapWords(str);
        badgedMajors[index].degreeLevels = str;
    
        relatedMajors.push(arrayItem);
    }
};

//Badges
function wrapWords(str, tmpl) {
  return str.replace(/\w+/g, tmpl || "
<span>$&</span>");
};

//Randomizer for list of majors in specific school
if(relatedMajors.length >= 1) {
    $('.page--major .s-grey').show();
    var n = relatedMajors.length;
    var tempUserList = [];
    for (var i = 0; i
<3; i++) {
        // Removes one random element from userList and pushes it onto tempUserList
        if(relatedMajors[i] != undefined) {
            tempUserList.push(relatedMajors.splice(Math.floor(Math.random()*relatedMajors.length),1)[0]);
        }
        
    }
    //Push the remaining item onto tempUserList
    console.log(relatedMajors);
    //tempUserList.push(relatedMajors[0]);
    //console.log(tempUserList);
    
    var options = {
        valueNames: [ 'title', 'description', 'degreeLevels', { attr: 'href', name: 'titleLink'}],
        item: '<li class="swiper-slide"><a class="titleLink"><h3 class="title"></h3></a><p class="description"></p><p class="degreeLevels"></p></li>'};
    
    var userList = new List('related-list', options, tempUserList);

} else {
    $('.page--major .s-grey').hide();
}