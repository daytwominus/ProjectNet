var cpanelApp = angular.module('cpanelApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

cpanelApp.controller('cpanelController', function ($scope, cpanelFactory) {
    $scope.getUsers = function() {
        cpanelFactory.getUsers()
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

cpanelApp.factory('cpanelFactory', function($http){
    var factory = {};

    factory.getUsers = function() {
        return $http.get('/rest/users');
    };
    return factory;
});