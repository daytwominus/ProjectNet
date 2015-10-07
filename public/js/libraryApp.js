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

    $scope.getLibrary();

    $scope.addLibItem = function(){
        libraryFactory.addLibItem($scope.newLibItem)
            .success(function(response) {
                libraryFactory.getLibrary()
                    .success(function(response) {
                        console.log(response);
                        $scope.libItems = response;
                        jQuery('.file-uploader').val('');


                    })
                    .error(function(error){
                    });
            })
            .error(function(error){
                $scope.updateErrorFlag = true;
            });
    };

    var uploader = $scope.uploader = new FileUploader({
        url: 'rest/libItemFile',
        autoUpload:true
    });


    // upload for preview
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        $scope.newLibItem.fileUrl = response;
        uploader.clearQueue();
    };

    var uploaderForPreview = $scope.uploaderForPreview = new FileUploader({
        url: 'rest/libItemPreview',
        autoUpload:true
    });

    uploaderForPreview.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
        $scope.newLibItem.previewUrl = response;
        uploaderForPreview.clearQueue();

    };


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