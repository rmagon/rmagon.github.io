$(document).ready(function(){
/* thanks to csstricks.com: 
https://goo.gl/9lRSlJ
*/
$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top-140
        }, 1000);
        return false;
      }
    }
  });
});
  
});