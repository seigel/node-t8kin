/**
 * Created by seigel on 2014-06-18.
 */
$(document).ready(function(){
    $window = $(window);
    $('section[data-type="background"]').each(function(){
        var $scroll = $(this);
        $(window).scroll(function() {
            var yPos = -($window.scrollTop() / $scroll.data('speed'));
            var coords = '50% '+ yPos + 'px';
            $scroll.css({ backgroundPosition: coords });
        });
    });
});

/* Create HTML5 element for IE */
document.createElement("section");