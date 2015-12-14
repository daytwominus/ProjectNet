var signupApp = angular.module('signupApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


signupApp.controller('signupController', function ($scope, signupFactory, $location) {
    $scope.saveUser = function(){
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