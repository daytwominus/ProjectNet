var signupApp = angular.module('signupApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

validateEmail = function(e)
{
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(e);
}

validate = function(scope){
    if(!/^\w+$/.test(scope.editingUser.name)){
        scope.message = 'Use only letters or numbers in user name';
        return false;
    }

    if(!validateEmail(scope.editingUser.email)){
        scope.message = 'Email error';
        return false;
    }

    return true;
}



signupApp.controller('signupController', function ($scope, signupFactory, $location) {
    $scope.saveUser = function(){
        if(!validate($scope))
            return;

        signupFactory.createUser($scope.editingUser)
            .success(function(response) {
                alert('User has been registered but should be approved by administrator');
                $location.path("/");
                $scope.editingUser = {};
            })
            .error(function(error){
                alert('User with the name specified already exists');
                return;
            });

    };

    $scope.editingUser = {};

});

signupApp.factory('signupFactory', function($http){
    var factory = {};

    factory.createUser = function(u) {
        console.log("creating user: " + JSON.stringify(u));
        return $http.post('/rest/users', u);
    };

    return factory;
});