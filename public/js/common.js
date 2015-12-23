$.getScript("/scripts/jquery.headtacular.min.js", function(){

    $(document).ready(function(){
        $('#searchtext').keydown(function(event){
            if(event.keyCode == 13) {
                event.preventDefault();
                window.location.replace('/search/' + $('#searchtext').val());
                return false;
            }
        });
        //$('.header').headtacular({ scrollPoint: 132, showScrollPoint: true  });
        var sp = 70;
        $('.header').headtacular({ scrollPoint: sp});


    });

});

