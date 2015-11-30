var usersApp = angular.module('usersApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

usersApp.controller('usersController', function ($scope, usersFactory) {
    $scope.getUsers = function() {
        usersFactory.getUsers()
            .success(function (response) {
                console.log(response);
                $scope.users = response;
                $scope.newUser = {};
            })
            .error(function (error) {
            });
    };
    $scope.getUsers();
});

usersApp.factory('usersFactory', function($http){
    var factory = {};

    factory.getUsers = function() {
        return $http.get('/rest/users');
    };
    return factory;
});