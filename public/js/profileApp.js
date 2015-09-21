var profileApp = angular.module('profileApp', ['angularFileUpload']);

profileApp.controller('profileController', function ($scope, profileFactory, FileUploader) {

    $scope.updateUser = function(){
        profileFactory.updateProfile($scope.user)
            .success(function(response) {
                $scope.updateSuccessFlag = true;
            })
            .error(function(error){
                $scope.updateErrorFlag = true;
            });
    };

    profileFactory.getProfile()
        .success(function(response) {
            $scope.user = response;
            console.log(response);
        })
        .error(function(error){
            console.log(error);
        });

    var uploader = $scope.uploader = new FileUploader({
        url: 'rest/uploadAvatar',
        autoUpload:true
    });

    // FILTERS

    uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{jpg|jpeg|png}*/, options) {
            return this.queue.length < 10;
        }
    });

    // CALLBACKS

    uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
        console.info('onWhenAddingFileFailed', item, filter, options);
    };
    uploader.onAfterAddingFile = function(fileItem) {
        console.info('onAfterAddingFile', fileItem);
    };
    uploader.onAfterAddingAll = function(addedFileItems) {
        console.info('onAfterAddingAll', addedFileItems);
    };
    uploader.onBeforeUploadItem = function(item) {
        console.info('onBeforeUploadItem', item);
    };
    uploader.onProgressItem = function(fileItem, progress) {
        console.info('onProgressItem', fileItem, progress);
    };
    uploader.onProgressAll = function(progress) {
        console.info('onProgressAll', progress);
    };
    uploader.onSuccessItem = function(fileItem, response, status, headers) {
        console.info('onSuccessItem', fileItem, response, status, headers);
    };
    uploader.onErrorItem = function(fileItem, response, status, headers) {
        console.info('onErrorItem', fileItem, response, status, headers);
    };
    uploader.onCancelItem = function(fileItem, response, status, headers) {
        console.info('onCancelItem', fileItem, response, status, headers);
    };
    uploader.onCompleteItem = function(fileItem, response, status, headers) {
        console.info('onCompleteItem', fileItem, response, status, headers);
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
    };

    console.info('uploader', uploader);
});

profileApp.factory('profileFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/profile');
    };

    factory.updateProfile = function(data) {
        return $http.post('/rest/profile', data);
    };

    return factory;
})