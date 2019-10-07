throttled = false;
window.addEventListener('resize', function() {
 if (!throttled) {
  var menuToggleTargets = $('.aws-menu--toggle, .aws-menu .hs-menu-wrapper ,aws-menu .hs-menu-flow-horizontal');
  menuToggleTargets.removeClass('active');
  $('.hs-item-has-children.active, .hs-menu-children-wrapper.active').removeClass('active');
  throttled = true;
  setTimeout(function() {
   throttled = false;
  }, 500);
 }
});

(jQuery)(function($){
  initMenuToggle();
  createHero(1); /* Career resources*/
  createHero(2); /* Hire people */
  initJobset();
});
function prepDashboardIndicator() {
 var indicatorTarget = $('.nav-icon-dashboard').parents('.hs-menu-item');
 var linkLabel = indicatorTarget.text();
 indicatorTarget.addClass('indicator-dashboard-menu').html('<div class="indicator-dashboard-contents" data-label="'+linkLabel+'"><iframe src="./indicator.html"></iframe></div>');
}
function initJobset() {
  $.ajax({
   url: "http://er-scrapepage.agilus.ca/rawdata.aspx",
   crossDomain: true,
   dataType: "json",
   success: function (response) {
   var resp = JSON.parse(JSON.stringify(response));
     populateJobset(resp);
   },
   error: function (xhr, status) {
    console.log('Job listing connection: ', status);
   }
  });
}
function initMenuToggle(){
 if ( $('.aws-menu--toggle').length){
  var menuToggleTargets = $('.aws-menu--toggle, .aws-menu .hs-menu-wrapper');
  $('.aws-menu--toggle').click(function(){
   menuToggleTargets.each(function(){
    if( $(this).hasClass('active') ){
     $(this).removeClass('active');
     $('.hs-menu-flow-horizontal.active').find('.active').removeClass('active');
    } else {
     $(this).addClass('active');
    }
   });
  });
 }
 $('.hs-menu-item.hs-item-has-children > a').click(function(e){
  e.preventDefault();
//   var obj = $(this).next('.hs-menu-children-wrapper');
  var parentItem = $(this).parent('.hs-menu-item');
  if(parentItem.hasClass('active')) {
   parentItem.find('.active').addBack().removeClass('active');
  } else {
   parentItem.siblings().find('.active').addBack().removeClass('active');
   parentItem.find('.hs-menu-children-wrapper').addBack().addClass('active');
  }
 });
}
function createHero(num) {
 if ($('.aws-tableau--hero-image'+num).length && !$('.aws-tableau--hero-image'+num+ ' .aws-menu--hero-content').length) {
  var heroImage = $('.aws-tableau--hero-image'+num+' .hs_cos_wrapper_type_linked_image img').attr('src');
  var heroText = $('.aws-tableau--hero-text'+num+' .hs_cos_wrapper_type_text').text();
  var phoneNumber = $('.aws-tableau--phone .hs_cos_wrapper_type_text').text();
  var phoneContent = '<div class="aws-menu--phone">'+phoneNumber+'</div>';
  var heroContent = '<li class="aws-menu--hero'+num+'"><div class="aws-menu--hero-content" style="background-image:url('+heroImage+')"><span>'+heroText+'</span></div>'+phoneContent+'</li>';
  var heroTarget = $('.aws-menu .hs-menu-depth-1.hs-item-has-children > .hs-menu-children-wrapper').eq(num-1);
  heroTarget.append(heroContent);
 }
}

function populateJobset(jobData){
 var monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
 var jobCountTotal = 8;
//  var jobStartOffset = Math.round(Math.random() * 50);
 var jobStartOffset = 0;
 var filteredJobs = jobData.filter(function(obj) {
  return obj.CATEGORY.includes("Geophysical")
  || obj.CATEGORY.includes("Financial")
  || obj.CATEGORY.includes("Light Industrial")
  || obj.CATEGORY.includes("Engineering");
 });
//   console.table(filteredJobs);
 var jobOutput = '';
 for (i=0;i<jobCountTotal;i++) {
  var curJob = filteredJobs[i+jobStartOffset];
  var date = new Date(curJob['Posted Date']);
  var jobDate = date.getDate() + ' ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
  var jobCity = curJob['CITY'];
  var jobProv = curJob['STATE'];
  var jobTitle = curJob['TITLE'].trim().replace(/([\/;:\)\]\}])/g, "$1\u200B");;
  var jobContractStatus = curJob['EmploymentType'];
  var overSize = jobTitle.length > 40 || longest_word_length(jobTitle) > 13 ? ' class="smaller"' : '';
  var jobUnit =
  '<a href="#">'
  + '<div class="aws-section--jobset-unit-wrapper">'
  + '<div class="aws-section--jobset-unit">'
  + '<div class="aws-section--jobset-unit-maincontent">'
  + '<h2'+overSize+'>'+jobTitle+'</h2>'
  + '<h3>'+jobCity+', '+jobProv+'</h3>'
  + '<h4>'+jobContractStatus+'</h4>'
  + '</div>'
  + '<h5>'+jobDate+'</h5></div>'
  + '</div>'
  + '</a>';
  jobOutput += jobUnit;
 }
 $('.aws-section--jobset-group-wrapper').html(jobOutput);
 function reviver(key, value) {
  if (typeof value === "string" && dateFormat.test(value)) { return new Date(value); }
  return value;
 }
}
function longest_word_length(str)
{
 var array1 = str.match(/\w[a-z]{0,}/gi);
 var result = array1[0];
 for(var x = 1 ; x < array1.length ; x++) { if(result.length < array1[x].length) { result = array1[x]; }
 }
 return result.length;
}

 if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
   'use strict';
   if (typeof start !== 'number') { start = 0; }
   if (start + search.length > this.length) { return false; } else { return this.indexOf(search, start) !== -1; }
  };
 }
 if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
   'use strict';
   if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
   throw new TypeError();
   var len = this.length >>> 0,
   res = new Array(len), // preallocate array
   t = this, c = 0, i = -1;
   var kValue;
   if (thisArg === undefined){ while (++i !== len){ if (i in this){ kValue = t[i]; if (func(t[i], i, t)){ res[c++] = kValue; } } } } else { while (++i !== len){ if (i in this){ kValue = t[i]; if (func.call(thisArg, t[i], i, t)){ res[c++] = kValue; } } } }

   res.length = c; // shrink down array to proper size
   return res;
  };
 }
