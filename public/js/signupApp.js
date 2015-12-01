var signupApp = angular.module('signupApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


signupApp.controller('signupController', function ($scope, signupFactory, $location) {
    $scope.saveUser = function(){
        signupFactory.createUser($scope.editingUser)
            .success(function(response) {
                console.log(1);
            })
            .error(function(error){
            });
        console.log(2);
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