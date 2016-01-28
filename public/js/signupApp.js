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
        if(trans['lang'] === 'EN')
            scope.message = 'Use only letters or numbers in user name';
        else
            scope.message = 'Используйте только букви или цифры в имени';
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
                if(trans['lang'] === 'EN')
                    alert('User has been registered but should be approved by administrator');
                else
                    alert('Заявка зарегистрирована и будет рассмотрена администратором');
                $location.path("/");
                $scope.editingUser = {};
            })
            .error(function(error){
                if(trans['lang'] === 'EN')
                    alert('User with the login specified already exists');
                else
                    alert('Пользователь с указанным логином уже существует');
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