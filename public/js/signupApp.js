var signupApp = angular.module('signupApp', ['angularFileUpload']).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

signupApp.controller('signupController', function ($scope, signupFactory) {
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

    $scope.addUser = function(){
        $scope.editingUser = {};
        console.log("opening area for adding user");
        $scope.isEditing = false;
        $scope.dialogLabel = "NEW USER";
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