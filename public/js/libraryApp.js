var libraryApp = angular.module('libraryApp', ['angularFileUpload']);

libraryApp.controller('libraryController', function ($scope, libraryFactory, FileUploader) {
    $scope.getLibrary = function(){
        libraryFactory.getLibrary()
            .success(function(response) {
                console.log(response);
                $scope.libItems = response;
                $scope.newLibItem = {};
            })
            .error(function(error){
            });
    };

    $scope.addLibItem = function(){
        libraryFactory.addLibItem($scope.newLibItem)
            .success(function(response) {
                libraryFactory.getLibrary()
                    .success(function(response) {
                        console.log(response);
                        $scope.libItems = response;
                        $scope.newLibItem = {};
                    })
                    .error(function(error){
                    });
            })
            .error(function(error){
                $scope.updateErrorFlag = true;
            });
    };

    var uploader = $scope.uploader = new FileUploader({
        url: 'rest/uploadLibItem',
        autoUpload:true
    });

    $scope.getLibrary();
    //libraryFactory.
});

libraryApp.factory('libraryFactory', function($http){
    var factory = {};

    factory.getLibrary = function() {
        return $http.get('/library/items');
    };

    factory.addLibItem = function(data) {
        return $http.post('/library/libItems', data);
    };

    return factory;
})