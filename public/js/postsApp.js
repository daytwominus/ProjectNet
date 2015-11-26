var postsApp = angular.module('postsApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

postsApp.controller('postsController', function ($scope, postsFactory) {
    $scope.init = function(postType)
    {
        console.log('initializing postsController with type ', postType);
        $scope.postType = postType;
        $scope.getPosts($scope.postType);
    };

    $scope.getposts = function(){
        if(!$scope.user)
            return;
        postsFactory.getProfile()
            .success(function(response) {
                console.log(response);
                $scope.user = response;
            })
            .error(function(error){
            });
    };
    $scope.getPosts = function(){
        postsFactory.getPosts($scope.postType)
            .success(function(response) {
                console.log(response);
                $scope.posts = response;
            })
            .error(function(error){
            });
    };
    function processAddPostButton() {
        $scope.isEditing = !$scope.isEditing;
        if ($scope.isEditing)
            $scope.addButtonText = "Submit";
        else{
            $scope.addButtonText = "Add Post";
            $scope.getPosts($scope.postType);
        }
    };
    $scope.addPost = function(){
        console.log("opening area for adding post of type ", $scope.postType);
        if($scope.isEditing)
            postsFactory.submitPost($scope.postType)
                .success(function(response) {
                    processAddPostButton();
                })
                .error(function(error){
                });
        else
            processAddPostButton();
    };
    $scope.editPost = function(p){
        console.log('editing post ' + JSON.stringify(p.data));
        $scope.isEditing = false;

        CKEDITOR.instances.editor2.setData(p.data);
        $scope.editingPost = p;
    };
    $scope.savePost = function(){
        postsFactory.savePost($scope.editingPost)
            .success(function(response) {
            })
            .error(function(error){
            });
    };

    $scope.deletePost = function(){
        $scope.isEditing = false;
        postsFactory.deletePost($scope.editingPost)
            .success(function(response) {
                console.log("post deleted");
                $scope.getPosts($scope.postType);
            })
            .error(function(error){
            });
    };

    $scope.editingPost = {};
    $scope.isEditing = false;
    $scope.addButtonText = "Add Post";
});

postsApp.factory('postsFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/profile');
    };

    factory.submitPost = function(t) {
        var data = CKEDITOR.instances.editor1.getData();
        console.log("submitting post: " + data);
        var tosend = {};
        tosend.data = data;
        tosend.categories = [t];//
        return $http.post('/rest/posts', tosend);
    };

    factory.savePost = function(p) {
        p.data = CKEDITOR.instances.editor2.getData();
        console.log("updating post: " + JSON.stringify(p));

        return $http.post('/rest/posts', p);
    };

    factory.deletePost = function(p) {
        console.log("deleting post: ", p);
        return $http.delete('/rest/posts/' + p["_id"]);
    };

    factory.getPosts = function(t) {
        return $http.get('/rest/posts', {
            params: {"categories":[t]}
         });
    };
    return factory;
})

