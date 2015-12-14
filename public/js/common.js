$(document).ready(function(){
    $('#searchtext').keydown(function(event){
        if(event.keyCode == 13) {
            event.preventDefault();
            window.location.replace('rest/search/' + $('#searchtext').val());
            return false;
        }
    });
});


