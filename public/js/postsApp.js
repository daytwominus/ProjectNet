var postsApp = angular.module('postsApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

postsApp.controller('postsController', function ($scope, $location, $anchorScroll, $rootScope, postsFactory) {
    $scope.init = function(postType)
    {
        postType = postType.trim();
        //console.log('>>>', $scope.editingPost);
        $scope.postType = postType;
        $scope.getSections();
        $scope.showSections = true;

        console.log('initializing postsController with type ', postType);
        $scope.postType = postType;

        postsFactory.getProfile()
            .success(function(response) {
                $scope.user = response;
                $scope.getPosts();
                $scope.getPermissions();
            });
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
        postsFactory.getPosts($scope.postType, $scope.user)
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
            $scope.editingPost = {};
            CKEDITOR.instances.editor1.setData({});
            $scope.addButtonText = "Add";
            $scope.getPosts($scope.postType);
        }
    };

    $scope.addPost = function(){
        console.log("processing post of type ", $scope.postType);

        $scope.editingPost = {};
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
        console.log('editing post ' + JSON.stringify(p));
        $scope.isEditing = false;
        $scope.sectionsForEditing = $scope.getSectionsForEditing(p);

        CKEDITOR.instances.editor2.setData(p.data);
        $scope.editingPost = p;
    };

    $scope.savePost = function(){
        if($scope.sections){
            $scope.editingPost.sections = [];
            var sections = $scope.sections;
            for (var i = 0; i < sections.length; i++) {
                if(sections[i].selected)
                    $scope.editingPost.sections.push(sections[i]["_id"]);
            }
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

    $scope.restorePost = function(){
        $scope.editingPost.isDeleted = false;
        $scope.savePost(function(){
            $scope.getPosts($scope.postType);
        });
    };

    $scope.getSections = function() {
        postsFactory.getSections($scope.postType)
            .success(function (response) {
                console.log('all sections: ', response);
                $scope.sections = response;
            })
            .error(function (error) {
            });
    }

    var findSection = function(id){
        var sections = $scope.sections;
        console.log('!!!!', sections, id);
        for (var i = 0; i < sections.length; i++) {
            if(sections[i]["_id"] == id){
                return sections[i];
            }
        }
        return null;
    }

    $scope.getSectionById = function(id) {
        console.log('getSectionById ');

        return findSection(id);
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
                if(s)
                    s.selected = true;
            }
        }
        return final;
    }

    postsFactory.getProfile()
        .success(function(response) {
            $scope.user = response;
            console.log('user=', response);
        })
        .error(function(error){
            console.log(error);
        });

    $scope.editingPost = {};
    $scope.isEditing = false;
    $scope.addButtonText = "Add";

    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    }

    var url = $location.url().substring(1);
    setTimeout(function(){
        console.log('url=', url);
        if(url && url != "")
         $scope.scrollTo(url);
    }, 800)
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

    factory.getPosts = function(t, u) {
        var p = {};
        if(t === "index")
            p = { params: {showOnMain:true} };
        else{
            if(t == 'allforadmin'){
                p = { params: {getAll:true} };
            }
            else if(t === 'home'){
                p = { params: {} };
            }
            else
                p = { params: {"categories":[t]} };
        }

        if(t === "home" && u){
            p['params']['userId'] = u['_id'];
        }

        console.log('requesting posts with params', p.params);
        return $http.get('/rest/posts', p);
    };

    factory.getPermissions = function(t) {
        return $http.get('/rest/permissions');
    };

    factory.getSections = function(category) {
        console.log('getting sections for ', category);
        return $http.get('/rest/sections' + '?category=' + category);
    };

    return factory;
})

