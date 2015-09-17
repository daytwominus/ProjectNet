var profileApp = angular.module('profileApp', []);

profileApp.controller('profileController', function ($scope, profileFactory) {

    $scope.updateUser = function(){
        profileFactory.updateProfile($scope.user)
            .success(function(response) {
                $scope.updateSuccessFlag = true;
            })
            .error(function(error){
                $scope.updateErrorFlag = true;
            });
    };

    profileFactory.getProfile()
        .success(function(response) {
            $scope.user = response;
            console.log(response);
        })
        .error(function(error){
            console.log(error);
        });
});

profileApp.factory('profileFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/profile');
    };

    factory.updateProfile = function(data) {
        return $http.post('/rest/profile', data);
    };

    return factory;
})