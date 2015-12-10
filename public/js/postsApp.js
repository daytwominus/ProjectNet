var postsApp = angular.module('postsApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

postsApp.controller('postsController', function ($scope, postsFactory) {
    $scope.init = function(postType, showSections)
    {
        if(showSections){
            $scope.getSections();
        }

        console.log('initializing postsController with type ', postType);
        $scope.postType = postType;
        $scope.getPosts();
        $scope.getPermissions();
    };

    $scope.getPermissions = function(){
        postsFactory.getPermissions()
            .success(function(response) {
                console.log('permissions: ', response);
                $scope.permissions = response;
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
            $scope.addButtonText = "Add";
            $scope.getPosts($scope.postType);
        }
    };
    $scope.addPost = function(){
        console.log("opening area for adding post of type ", $scope.postType);
        if($scope.isEditing)
            postsFactory.submitPost($scope.postType, $scope.user)
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
        $scope.sectionsForEditing = $scope.getSectionsForEditing(p);

        CKEDITOR.instances.editor2.setData(p.data);
        $scope.editingPost = p;
    };
    $scope.savePost = function(){
        $scope.editingPost.sections = [];
        var sections = $scope.sections;
        for (var i = 0; i < sections.length; i++) {
            if(sections[i].selected)
                $scope.editingPost.sections.push(sections[i]["_id"]);
        }
        postsFactory.savePost($scope.editingPost)
            .success(function(response) {
                $scope.editingPost = {};
            })
            .error(function(error){
            });
        $scope.editingPost = {};
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

    postsFactory.getProfile()
        .success(function(response) {
            $scope.user = response;
                console.log('user=', response);
        })
        .error(function(error){
            console.log(error);
        });

    $scope.getSections = function() {
        postsFactory.getSections()
            .success(function (response) {
                console.log('all sections: ', response);
                $scope.sections = response;
            })
            .error(function (error) {
            });
    }

    var findSection = function(id){
        var sections = $scope.sections;
        console.log(sections);
        for (var i = 0; i < sections.length; i++) {
            //console.log(sections[i]["_id"], id);
            if(sections[i]["_id"] == id){
                //console.log(sections[i]["_id"]);
                return sections[i];
            }
        }
        return null;
    }

    $scope.getSectionsForEditing = function(p) {
        if(!$scope || !$scope.sections)
            return;
        var final = [];
        var sections = $scope.sections;
        for (var i = 0; i < sections.length; i++) {
            var s = sections[i];
            final.push(s);
            s.selected = false;
        }

        if(p.sections){
            for (var i = 0; i < p.sections.length; i++) {
                var s = findSection(p.sections[i]);
                s.selected = true;
                console.log('>>', s);
            }
        }
        console.log('!!', final);
        return final;
    }

    $scope.editingPost = {};
    $scope.isEditing = false;
    $scope.addButtonText = "Add";
});

postsApp.factory('postsFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/user/');
    };

    factory.submitPost = function(t, u) {
        var data = CKEDITOR.instances.editor1.getData();
        console.log("submitting post: " + data);
        var tosend = {};
        tosend.data = data;
        tosend.categories = [t];
        if(u)
        tosend.userId = u._id;
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
        var p = {};
        if(t === "home")
            p = { params: {showOnMain:true} };
        else
            p = { params: {"categories":[t]} };

        return $http.get('/rest/posts', p);
    };

    factory.getPermissions = function(t) {
        return $http.get('/rest/permissions');
    };

    factory.getSections = function() {
        console.log('getting sections');
        return $http.get('/rest/sections');
    };

    return factory;
})

