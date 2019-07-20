
document.addEventListener( 'wpcf7mailsent', function( event ) {
 // ga( 'send', 'event', 'Contact Form', 'submit' );
 jQuery(event.detail.id).addClass('form--completed').find('input').attr('disabled','');
 // jQuery(event.detail.id).find('label.active').removeClass('active');
 // jQuery(event.detail.id).find('.input--valid').removeClass('input--valid').find('input').attr('disabled','');

 // console.log(event);
}, false );


jQuery(function(){
 var validMessageClass = 'form--validationmessage';
 var validateFormElements = 'input[name="your-postcode"].wpcf7-form-control, .wpcf7-form-control.wpcf7-email';
 jQuery('.wpcf7-submit[disabled]').removeAttr('disabled').addClass('disabled');
 jQuery('.wpcf7-submit').each(function(){

  jQuery(this).on('click',function(e){
   /* blink incomplete form elements */
   if (jQuery(this).hasClass('disabled')) {
    var formParentObj = jQuery(this).parentsUntil('[role="form"]');
    var requiredFieldCount = formParentObj.find('[aria-required="true"]').length
    + formParentObj.find('.wpcf7-acceptance input[type="checkbox"]').length;
    var validatedFieldCount = formParentObj.find('.form--labelinput.input--valid').length
    + (formParentObj.find('.wpcf7-acceptance input[type="checkbox"]').prop('checked') ? 1 : 0);

    if (requiredFieldCount !== validatedFieldCount) {
     e.preventDefault();
     e.stopImmediatePropagation();
     jQuery(this).removeAttr('disabled');
    } else {
     return;
    }

    var consentIsChecked = formParentObj.find('.wpcf7-form-control-wrap.your-consent input[type="checkbox"]').prop('checked');
    checkedConsentParentClassRef = consentIsChecked ? '' : '.wpcf7-form-control.wpcf7-acceptance, ';
    formParentObj.find(checkedConsentParentClassRef+'[class="form--labelinput"]').each(function(){
     jQuery(this).addClass('input--notvalid');
     jQuery(this).animate({opacity:1},900,function() { jQuery(this).removeClass('input--notvalid'); });
    });
   }
   return false;
  });
 });

 jQuery(validateFormElements).each(function(i){
  var inputType = jQuery(this).attr('type');
  if (inputType == 'text' && jQuery(this).attr('name')=='your-postcode') {inputType='postalcode'}
  var messageId = validMessageClass+i;

  jQuery(this).on('focus',function(){
   jQuery(this).parent().parent().find('label').addClass('active');
  });

  jQuery(this).on('blur',function(){
   if (jQuery(this).val()=='') {
    jQuery(this).parent().parent().find('label').removeClass('active');
   }
   if (inputType=='postalcode') {
    var currentInputValue = jQuery(this).val();
    var isGoodValue = validateInputValue(currentInputValue,inputType);
    if (isGoodValue) {jQuery(this).val(normalizeCanadianPostalCode(currentInputValue));}
   }
  });

  jQuery(this)
  .keyup(function(){
   if (inputType !== 'postalcode') {
    jQuery(this).val(jQuery(this).val().trim());
   }
   var currentInputValue = jQuery(this).val();
   if (inputType=='email' && currentInputValue.indexOf(' ') >= 0) {
    currentInputValue = currentInputValue.replace(/\s/g, "");
    jQuery(this).val(currentInputValue);
   }
   var isGoodValue = validateInputValue(currentInputValue,inputType);
   var isEmpty = currentInputValue.length;

   jQuery(this).parents('.form--labelinput')
   .addClass(isGoodValue ? 'input--valid' : 'input--notvalid')
   .removeClass(!isGoodValue ? 'input--valid' : 'input--notvalid')
   .removeClass(!isEmpty ? 'input--valid' : '')
   .removeClass(!isEmpty ? 'input--notvalid' : '');
  })
  .after('<div class="'+validMessageClass+'" id="'+messageId+'"></div>').parent().css({position:'relative',display:'block'});
 });
 jQuery('.form--labelinput > label').each(function(){
  jQuery(this).on('click',function(){
   var formParentObj = jQuery(this).parentsUntil('[role="form"]');
   jQuery(this).addClass('active');
   jQuery(this).parent().find('input[type="text"], input[type="email"]').eq(0).focus();
  });
 });
});


function validateInputValue(value,type) {
 switch (type) {
  case 'email':
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  break;
  case 'postalcode':
  var re = /^(\d{5}(-\d{4})?|[a-ceghj-nprstvxy]\d[a-ceghj-nprstv-z][ ]{0,}?\d[a-ceghj-nprstv-z]\d)$/;
  break;
 }
 return re.test(String(value).toLowerCase().trim());
}

function normalizeCanadianPostalCode(value) { return value.replace(/^(.{3})(.*)$/,'$1 $2').toUpperCase(); }
