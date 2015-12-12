var usersApp = angular.module('usersApp', ['angularFileUpload']).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

usersApp.controller('usersController', function ($scope, usersFactory, FileUploader) {
    $scope.getUsers = function() {
        usersFactory.getUsers()
            .success(function (response) {
                $scope.users = response;
                $scope.newUser = {};
            })
            .error(function (error) {
            });
    };

    $scope.getUsers();
    $scope.uploadInProgress = false;
    var uploader = $scope.uploader = new FileUploader({
        url: 'rest/upload',
        autoUpload:true
    });
    usersFactory.getProfile()
        .success(function(response) {
            $scope.uploadInProgress = false;
            console.log('user retreived: ', response);
            $scope.user = response;
            console.log('user=', response);
        })
        .error(function(error){
            console.log(error);
        });

    // FILTERS
    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{jpg|jpeg|png}*/, options) {
            return this.queue.length < 10;
        }
    });
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
        $scope.uploadInProgress = true;

    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //console.info('onCompleteItem', fileItem, response, status, headers);
        console.log('uploaded url:', response);
        $scope.editingUser.imageUrl = response;
        $scope.editingUser.tempImageUrl = response;
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
        $scope.uploadInProgress = false;
    };

    $scope.addUser = function(){
        $scope.editingUser = {isAdmin:false};
        console.log("opening area for adding user");
        $scope.isEditing = false;
        $scope.dialogLabel = "NEW USER";
    };

    $scope.editUser = function(u){
        $scope.dialogLabel = "EDITING USER";

        console.log('>', u.roles);
        console.log('>', contains(u.roles, "admin"));
        if(contains(u.roles, "admin"))
            u.isAdmin = true;
        else
            u.isAdmin = false;
        console.log("opening area for editing user", u);
        $scope.isEditing = true;
        $scope.editingUser = u;
    };

    $scope.switchActivation = function(){
        var isActive = $scope.editingUser["isActive"];
        if(!isActive){
            isActive = 1;
        }
        else{
            if(isActive == 1){
                isActive = 0;
            }
            else{
                isActive = 1;
            }
        }
        console.log('setting isActive to ' + isActive);

        $scope.editingUser["isActive"] = isActive;

        usersFactory.updateUser($scope.editingUser)
            .success(function(response) {
            })
            .error(function(error){
            });
        $scope.getUsers();
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
                $scope.getUsers();
            })
            .error(function(error){
            });
        $scope.getUsers();
    };

    $scope.getPermissions = function(){
        usersFactory.getPermissions()
            .success(function(response) {
                console.log('permissions: ', response);
                $scope.permissions = response;
            })
            .error(function(error){
            });
    };

    $scope.getPermissions();
});

usersApp.factory('usersFactory', function($http){
    var factory = {};

    factory.getUsers = function() {
        return $http.get('/rest/users');
    };

    factory.updateUser = function(u) {
        if(u.isAdmin && !contains(u.roles, "admin"))
            u.roles.push("admin");
        if(!u.isAdmin && contains(u.roles, "admin"))
            u.roles.delete("admin");
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

    factory.getProfile = function() {
        return $http.get('/rest/user/');
    };

    factory.getPermissions = function(t) {
        return $http.get('/rest/permissions');
    };

    return factory;
});