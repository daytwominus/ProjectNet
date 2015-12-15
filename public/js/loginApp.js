$(document).ready(function(){
    $(document).on('click', '#submit', function() {
        console.log('>>>');
        if($('#username').val().length > 0 && $('#password').val().length > 0){
            // Send data to server through the ajax call
            // action is functionality we want to call and outputJSON is our data
            $.ajax({
                url: '/login',
                data: {action : 'login', username : $('#username').val(), password : $('#password').val()},
                type: 'post',
                async: 'true',
                dataType: 'json'
            })
                .done(function (result) {
                    console.log('Done!');
                    window.location.replace(result.redirect);
                })
                .always(function (result) {
                    console.log('Always!');
                })
                .fail(function (request,error) {
                    console.log('Fail!');
                    // This callback function will trigger on unsuccessful action
                    //alert('Network error has occurred please try again!');
                })
        } else {
            if($('#username').val().length <= 0 && $('#password').val().length > 0) {
                alert('Please fill in your username.');
            } else if($('#username').val().length > 0 && $('#password').val().length <= 0) {
                alert('Please fill in your password.');
            } else {
                alert('Please fill in your username and password.');
            }
        }
        return false; // cancel original event to prevent form submitting
    })
});
