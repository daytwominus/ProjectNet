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
    function processAddPostButton() {
        $scope.isEditing = !$scope.isEditing;
        if ($scope.isEditing)
            $scope.addButtonText = "Submit";
        else{
            $scope.addButtonText = "Add Post";
            $scope.getPosts();
        }
    };
    $scope.addPost = function(){
        console.log("opening area for adding post");

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
    $scope.editPost = function(p){
        console.log('editing post ' + JSON.stringify(p.data));
        $scope.isEditing = false;

        CKEDITOR.instances.editor2.setData(p.data);
        $scope.editingPost = p;
    };
    $scope.savePost = function(){
        homeFactory.savePost($scope.editingPost)
            .success(function(response) {
            })
            .error(function(error){
            });
    };

    $scope.deletePost = function(){
        $scope.isEditing = false;
        homeFactory.deletePost($scope.editingPost)
            .success(function(response) {
                console.log("post deleted");
                $scope.getPosts();
            })
            .error(function(error){
            });
    };

    $scope.editingPost = {};
    $scope.getHome();
    $scope.getPosts();
    $scope.isEditing = false;
    $scope.addButtonText = "Add Post";

    $scope.editorOptions = {
        language: 'en',
        'skin': 'moono',
        'extraPlugins': "imagebrowser,mediaembed",
        imageBrowser_listUrl: '/api/v1/ckeditor/gallery',
        filebrowserBrowseUrl: '/api/v1/ckeditor/files',
        filebrowserImageUploadUrl: '/api/v1/ckeditor/images',
        filebrowserUploadUrl: '/api/v1/ckeditor/files',
        toolbarLocation: 'bottom',
        toolbar: 'full',
        toolbar_full: [
            { name: 'basicstyles',
                items: [ 'Bold', 'Italic', 'Strike', 'Underline' ] },
            { name: 'paragraph', items: [ 'BulletedList', 'NumberedList', 'Blockquote' ] },
            { name: 'editing', items: ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
            { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
            { name: 'tools', items: [ 'SpellChecker', 'Maximize' ] },
            { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
            { name: 'styles', items: [ 'Format', 'FontSize', 'TextColor', 'PasteText', 'PasteFromWord', 'RemoveFormat' ] },
            { name: 'insert', items: [ 'Image', 'Table', 'SpecialChar', 'MediaEmbed' ] },'/',
        ]
    };
});

homeApp.factory('homeFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/profile');
    };

    factory.submitPost = function() {
        var data = CKEDITOR.instances.editor1.getData();
        console.log("submitting post: " + data);
        var tosend = {};
        tosend.data = data;
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

    factory.getPosts = function() {
        return $http.get('/rest/posts');
    };
    return factory;
})

