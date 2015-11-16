var cpanelApp = angular.module('cpanelApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);


cpanelApp.controller('cpanelController', function ($scope, cpanelFactory) {

});

cpanelApp.factory('cpanelFactory', function($http){
    var factory = {};

    return factory;
});