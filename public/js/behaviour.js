$('.footerItem').hover(
    function (){
        $('.footerItem').animate({
            bottom: '0px',
            background: '#ccc'
        }, 100);
    },
    function (){
        $('.footerItem').animate({
            bottom: '-40px',
            background: '#ccc'
        }, 100);
    }
);
jQuery(document).ready(function() {
    var offset = 220;
    var duration = 500;
    jQuery(window).scroll(function() {
        if (jQuery(this).scrollTop() > offset) {
            jQuery('.back-to-top').fadeIn(duration);
        } else {
            jQuery('.back-to-top').fadeOut(duration);
        }
    });

    jQuery('.back-to-top').click(function(event) {
        event.preventDefault();
        jQuery('html, body').animate({scrollTop: 0}, duration);
        return false;
    })
});

//window.onscroll=function(){
//    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
//        document.getElementById("footerItem").style.bottom="0px";
//        console.log(document.getElementById("footerItem").style.bottom);
//    }
//    else{
//        document.getElementById("footerItem").style.bottom="-40px";
//    }
//};