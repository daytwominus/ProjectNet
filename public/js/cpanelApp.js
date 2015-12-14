var cpanelApp = angular.module('cpanelApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

cpanelApp.controller('cpanelController', function ($scope, cpanelFactory) {
    $scope.addSection = function(){
        console.log("opening area for adding section");
        $scope.editingSection = {};
        $scope.isEditing = false;
        $scope.dialogLabel = "NEW SECTION";
    };

    $scope.editSection = function(u){
        $scope.dialogLabel = "EDITING SECTION";
        console.log("opening area for editing section", u);
        $scope.isEditing = true;
        $scope.editingSection = u;
    };

    $scope.getSections = function() {
        cpanelFactory.getSections()
            .success(function (response) {
                console.log(response);
                $scope.sections = response;
                $scope.newSection = {};
            })
            .error(function (error) {
            });
    };

    $scope.saveOrUpdateSection = function(){
        cpanelFactory.updateOrCreateSection($scope.editingSection)
            .success(function(response) {
                $scope.getSections();
            })
            .error(function(error){
            });
        $scope.getSections();
    };

    $scope.deleteSection = function(){
        var txt;
        var r = confirm("Do you really want to delete section " + $scope.editingSection.name + "?");
        if (r == true) {
            cpanelFactory.deleteSection($scope.editingSection)
                .success(function (response) {
                    console.log('section deleted');
                    $scope.getSections();
                })
                .error(function (error) {
                });
            $scope.getSections();
        } else {

        }
    };

    cpanelFactory.getPermissions()
        .success(function(response) {
            console.log('permissions: ', response);
            $scope.permissions = response;
        })
        .error(function(error){
        });

    $scope.editingSection = {};
    $scope.getSections();
});

cpanelApp.factory('cpanelFactory', function($http){
    var factory = {};

    factory.getSections = function() {
        console.log('getting sections');
        return $http.get('/rest/sections');
    };

    factory.updateOrCreateSection = function(u) {
        console.log("submitting section: " + JSON.stringify(u));

        return $http.post('/rest/sections', u);
    };

    factory.deleteSection = function(u) {
        console.log("deleting section: " + JSON.stringify(u));

        return $http.delete('/rest/sections/' + u._id, u);
    };
    factory.getPermissions = function(t) {
        return $http.get('/rest/permissions');
    };

    return factory;
});