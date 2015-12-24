

$(document).ready(function(){
    $('#searchtext').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            window.location.replace('/search/' + $('#searchtext').val());
            return false;
        }
    });

    $.getScript("/scripts/jquery.headtacular.min.js", function(){

        var sp = 70;
        $('.header').headtacular({ scrollPoint: sp});
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

});

