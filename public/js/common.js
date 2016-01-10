

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

    $('#lang-switch').click(function(event){
        console.log('locale: ', JSON.stringify(trans));
        $.ajax({
            type: "GET",
            url: "/rest/lang",
            success: function(data){
                window.location.href = '/home';
            }
        });
    });

    //var l = '<%= Session["lang"] ?? "" %>';
    //console.log('>>>', localize);
});

