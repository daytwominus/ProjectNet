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

    $scope.addUser = function(){
        $scope.editingUser = {};
        console.log("opening area for adding user");
        $scope.isEditing = false;
        $scope.dialogLabel = "NEW USER";
    };

    $scope.editUser = function(u){
        $scope.dialogLabel = "EDITING USER";
        console.log("opening area for editing user", u);
        $scope.isEditing = true;
        $scope.editingUser = u;
    };

    $scope.deleteUser = function(){
        var txt;
        var r = confirm("Do you really want to delete user " + $scope.editingUser.displayName + "?");
        if (r == true) {
            usersFactory.deleteUser($scope.editingUser)
                .success(function (response) {
                    console.log('user deleted');
                    $scope.getUsers();
                })
                .error(function (error) {
                });
            $scope.getUsers();
        } else {

        }


    };

    $scope.saveOrUpdateUser = function(u){
        var action = usersFactory.createUser;
        if($scope.isEditing)
            action = usersFactory.updateUser;

        action($scope.editingUser)
            .success(function(response) {
            })
            .error(function(error){
            });
        $scope.getUsers();
    };
});

usersApp.factory('usersFactory', function($http){
    var factory = {};

    factory.getUsers = function() {
        return $http.get('/rest/users');
    };

    factory.updateUser = function(u) {
        console.log("updating user: " + JSON.stringify(u));

        return $http.put('/rest/users/' + u._id, u);
    };

    factory.createUser = function(u) {
        console.log("creating user: " + JSON.stringify(u));

        return $http.post('/rest/users', u);
    };

    factory.deleteUser = function(u) {
        console.log("deleting user: " + JSON.stringify(u));

        return $http.delete('/rest/users/' + u._id, u);
    };
    return factory;
});