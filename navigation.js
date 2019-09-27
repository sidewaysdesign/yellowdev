// window.resize event listener
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
 // prepDashboardIndicator();
 // $('.hs-menu-flow-horizontal').addClass('active');
});
function prepDashboardIndicator() {
 var indicatorTarget = $('.nav-icon-dashboard').parents('.hs-menu-item');
 var linkLabel = indicatorTarget.text();
 indicatorTarget.addClass('indicator-dashboard-menu').html('<div class="indicator-dashboard-contents" data-label="'+linkLabel+'"><iframe src="./indicator.html"></iframe></div>');
}

function initMenuToggle(){
 console.log('IS IT FUCKING WORKING?');
 if ( $('.aws-menu--toggle').length){
  var menuToggleTargets = $('.aws-menu--toggle, .aws-menu .hs-menu-wrapper ,aws-menu .hs-menu-flow-horizontal');
  $('.aws-menu--toggle').click(function(){
   menuToggleTargets.toggleClass('active');
  });
 }
 $('.hs-menu-item.hs-item-has-children > a').click(function(){
  var obj = $(this).next('.hs-menu-children-wrapper');
  if (!obj.hasClass('active')) {
   // console.log( $(this).parent().addClass('active').siblings('.active') );
   $(this).parent().parent().find('.active').removeClass('active');
   $(this).parent().addClass('active');
   obj.addClass('active');
  } else {
   $(this).parent().removeClass('active');
   obj.removeClass('active');
  }
 });

}
function createHero(num) {
 if ($('.aws-tableau--hero-image'+num).length) {
  var heroImage = $('.aws-tableau--hero-image'+num+' .hs_cos_wrapper_type_linked_image img').attr('src');
  var heroText = $('.aws-tableau--hero-text'+num+' .hs_cos_wrapper_type_text').text();
  var phoneNumber = $('.aws-tableau--phone .hs_cos_wrapper_type_text').text();
  var phoneContent = '<div class="aws-menu--phone">'+phoneNumber+'</div>';
  var heroContent = '<li class="aws-menu--hero'+num+'"><div class="aws-menu--hero-content" style="background-image:url('+heroImage+')"><span>'+heroText+'</span></div>'+phoneContent+'</li>';
  var heroTarget = $('.aws-menu .hs-menu-depth-1.hs-item-has-children > .hs-menu-children-wrapper').eq(num-1);
  heroTarget.append(heroContent);
 }
}
