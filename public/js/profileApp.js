var profileApp = angular.module('profileApp', ['angularFileUpload']);

profileApp.controller('profileController', function ($scope, profileFactory, FileUploader) {
    $scope.updateUser = function(){
        profileFactory.updateProfile($scope.user)
            .success(function(response) {
                $scope.updateSuccessFlag = true;
                profileFactory.getProfile($scope.user)
                    .success(function(response) {
                        $scope.user = response;
                        console.log(response);
                    })
                    .error(function(error){
                        console.log(error);
                    });
            })
            .error(function(error){
                $scope.updateErrorFlag = true;
            });
    };

    $scope.editingUser = $scope.user;
    $scope.uploadInProgress = false;
    profileFactory.getProfile()
        .success(function(response) {
            $scope.uploadInProgress = false;
            console.log('user retreived: ', response);
            $scope.user = response;
            console.log('user=', response);
        })
        .error(function(error){
            console.log(error);
        });

    var uploader = $scope.uploader = new FileUploader({
        url: 'rest/upload',
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
        $scope.uploadInProgress = true;

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
        //console.info('onCompleteItem', fileItem, response, status, headers);
        console.log('uploaded url:', response);
        $scope.user.imageUrl = response;
        $scope.user.tempImageUrl = response;
    };
    uploader.onCompleteAll = function() {
        console.info('onCompleteAll');
        $scope.uploadInProgress = false;
    };

    console.info('uploader', uploader);
});

profileApp.factory('profileFactory', function($http){
    var factory = {};

    factory.getProfile = function() {
        return $http.get('/rest/user/');
    };

    factory.updateProfile = function(user) {
        console.log("submitting user update ", user);
        return $http.post('/rest/users', user);
    };

    return factory;
})