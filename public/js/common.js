$(document).ready(function(){
    $('#searchtext').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            window.location.replace('/search/' + $('#searchtext').val());
            return false;
        }
    });
});


