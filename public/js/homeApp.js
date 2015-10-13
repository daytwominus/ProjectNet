var homeApp = angular.module('homeApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

homeApp.controller('homeController', function ($scope, homeFactory) {
    $scope.getHome = function(){
        if(!$scope.user)
            return;
        homeFactory.getProfile()
            .success(function(response) {
                console.log(response);
                $scope.user = response;
            })
            .error(function(error){
            });
    };
    $scope.getPosts = function(){
        homeFactory.getPosts()
            .success(function(response) {
                console.log(response);
                $scope.posts = response;
            })
            .error(function(error){
            });
    };
    $scope.addPost = function(){
        console.log("opening area for adding post");
        function processAddPostButton() {
            $scope.isEditing = !$scope.isEditing;
            if ($scope.isEditing)
                $scope.addButtonText = "Submit";
            else             {
                $scope.addButtonText = "Add Post";
                $scope.getPosts();
            }
        };
        if($scope.isEditing)
            homeFactory.submitPost()
                .success(function(response) {
                    processAddPostButton();
                })
                .error(function(error){
                });
        else
            processAddPostButton();
    };

    $scope.getHome();
    $scope.getPosts();
    $scope.isEditing = false;
    $scope.addButtonText = "Add Post";
});

homeApp.factory('homeFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/profile');
    };

    factory.submitPost = function() {
        var data = CKEDITOR.instances.editor1.getData();
        console.log("saving data: " + data);
        var tosend = {};
        tosend.data = data;
        return $http.post('/rest/posts', tosend);
    };

    factory.getPosts = function() {
        return $http.get('/rest/posts');
    };
    return factory;
})