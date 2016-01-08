

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

    $('#russian-lang').click(function(event){
        //alert('!');
        //alert($sectionsLibrary);
        //alert(sectionsLibrary);
    });

});

