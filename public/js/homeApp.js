var homeApp = angular.module('homeApp', []);

homeApp.controller('homeController', function ($scope, homeFactory) {
    $scope.getHome = function(){
        homeFactory.getProfile()
            .success(function(response) {
                console.log(response);
                $scope.user = response;
            })
            .error(function(error){
            });
    };
    $scope.getHome();

});

homeApp.factory('homeFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/profile');
    };
    return factory;
})