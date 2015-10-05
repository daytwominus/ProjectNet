var libraryApp = angular.module('libraryApp', []);

libraryApp.controller('libraryController', function ($scope, libraryFactory) {
    $scope.getLibrary = function(){
        libraryFactory.getLibrary()
            .success(function(response) {
                console.log(response);
                $scope.libItems = response;
            })
            .error(function(error){
            });
    };
    $scope.getLibrary();
    //libraryFactory.
});

libraryApp.factory('libraryFactory', function($http){
    var factory = {};

    factory.getLibrary = function() {
        return $http.get('/library/items');
    };
    return factory;
})