($)(function(){
 $('.header-container').append('<div class="nav--user"></div><div class="nav--actions"></div>');
 $('.nav--actions').click(function(){
  $('body').toggleClass('nav-active');
 });
 $('.hs-menu-item.hs-item-has-children > a').click(function(){
  $(this).next('.hs-menu-children-wrapper').addClass('active');
 });
});

// window.resize event listener
window.addEventListener('resize', function() {
 if (!throttled) {
  $('body').removeClass('nav-active');
  throttled = true;
  setTimeout(function() {
   throttled = false;
  }, 500);
 }
});


($)(function(){
 console.clear();
 createHero(1);/* Career resources*/
 createHero(2);/* Hire people */
 initMenuToggle();
});
function initMenuToggle(){
   console.log('initMenuToggle');

if ( $('.aws-menu--toggle').length){
 var menuToggleTargets = $('.aws-menu--toggle, .aws-menu .hs_cos_wrapper_type_menu');
 $('.aws-menu--toggle').click(function(){
  menuToggleTargets.toggleClass('active');
 });
 $( window ).resize(function() { menuToggleTargets.removeClass('active'); });
}
 $('.hs-menu-item.hs-item-has-children > a').click(function(){
  $(this).next('.hs-menu-children-wrapper').addClass('active');
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