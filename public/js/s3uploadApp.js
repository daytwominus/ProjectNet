var s3uploadApp = angular.module('s3uploadApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

s3uploadApp.controller('s3uploadController', function ($scope, cpanelFactory) {
    $scope.s3upload = function() {
        cpanelFactory.s3upload()
            .success(function (response) {
                console.log(response);
                $scope.fileUrl = response;
            })
            .error(function (error) {
            });
    };
    $scope.s3upload();
});

cpanelApp.factory('s3uploadFactory', function($http){
    var factory = {};

    factory.s3upload = function() {

    };
    return factory;
});