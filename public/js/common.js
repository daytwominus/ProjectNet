

$(document).ready(function(){
    $('#searchtext').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            window.location.replace('/search/' + $('#searchtext').val());
            return false;
        }
    });

    $.getScript("/scripts/jquery.headtacular.min.js", function(){
        var sp = 100;
        $('.header').headtacular({ scrollPoint: sp});
        //$('.header').headtacular({ scrollPoint: sp, showScrollPoint: true});
    });

    $(document).on('focusin', function(e) {
        e.stopImmediatePropagation();
    });

    $.getScript("/scripts/jquery.tooltipster.min.js", function(){
        $('.tooltip').tooltipster({
            contentAsHTML: true,
            theme: 'my-custom-theme',
            animation: 'grow'
        });
    });

    //function adjustStyle(width) {
    //    width = parseInt(width);
    //    if (width > 1600) {
    //        console.log(1600);
    //        $("#size-stylesheet").attr("href", "css/style.css");
    //        $("#size-stylesheet").attr("href", "css/header.css");
    //    } else if (width > 900) {
    //        console.log(900);
    //        $("#size-stylesheet").attr("href", "css/style-medium.css");
    //        $("#size-stylesheet").attr("href", "css/header.css");
    //    }
    //}
    //
    //$(function() {
    //    adjustStyle($(this).width());
    //    $(window).resize(function() {
    //        adjustStyle($(this).width());
    //    });
    //});

});

