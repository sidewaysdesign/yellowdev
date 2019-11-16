(jQuery)(function($){ initMenuToggle(); )};

function initMenuToggle(){
 if ( $('.aws-menu--toggle').length ){
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
  var parentItem = $(this).parent('.hs-menu-item');
  if ( parentItem.hasClass('active') ) {
   parentItem.find('.active').addBack().removeClass('active');
  } else {
   parentItem.siblings().find('.active').addBack().removeClass('active');
   parentItem.children('.hs-menu-children-wrapper').addBack().addClass('active');
  }
 });
}
