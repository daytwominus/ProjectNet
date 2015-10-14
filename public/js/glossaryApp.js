var glossaryApp = angular.module('glossartApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


glossaryApp.controller('glossaryController', function ($scope, glossaryFactory) {

});


glossaryApp.factory('glossaryFactory', function($http){
    var factory = {};

    return factory;
});