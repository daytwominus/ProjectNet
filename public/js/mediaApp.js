var mediaApp = angular.module('mediaApp', []).filter('to_trusted', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);

mediaApp.controller('mediaController', function ($scope, mediaFactory) {
	$scope.videos = mediaFactory.getList();
	/*
		mediaFactory.getList()
			.success(function (response) {
				$scope.videos = response;	
			})
	*/

	$scope.videoPopUp = function (url) {
		$scope.currentVideo = url;

		$('#video-dialog').modal('show');
	};

	$scope.modalClose = function () {
		$scope.currentVideo = '';

		$('#video-dialog').modal('hide');
	}

});

mediaApp.factory('mediaFactory', function($http){
	var factory = {};

	factory.getList = function() {
		//return $http.get('url');

		return [
			{
				name: 'video1 name',
				url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bwP36bu08fc" frameborder="0" allowfullscreen></iframe>',
				previewUrl: 'http://talkyland.com/media/CACHE/images/posts/2013/1/15/0e9ac17973c446298516870396f146bc/f24393ecbacd8d912c091c73eca95354.jpg'
			},
			{
				name: 'video2 name',
				url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bwP36bu08fc" frameborder="0" allowfullscreen></iframe>',
				previewUrl: 'http://talkyland.com/media/CACHE/images/posts/2013/1/15/0e9ac17973c446298516870396f146bc/f24393ecbacd8d912c091c73eca95354.jpg'

			},
			{
				name: 'video3 name',
				url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bwP36bu08fc" frameborder="0" allowfullscreen></iframe>',
				previewUrl: 'http://talkyland.com/media/CACHE/images/posts/2013/1/15/0e9ac17973c446298516870396f146bc/f24393ecbacd8d912c091c73eca95354.jpg'
			},
			{
				name: 'video4 name',
				url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bwP36bu08fc" frameborder="0" allowfullscreen></iframe>',
				previewUrl: 'http://talkyland.com/media/CACHE/images/posts/2013/1/15/0e9ac17973c446298516870396f146bc/f24393ecbacd8d912c091c73eca95354.jpg'
			},
			{
				name: 'video5 name',
				url: '<iframe width="560" height="315" src="https://www.youtube.com/embed/bwP36bu08fc" frameborder="0" allowfullscreen></iframe>',
				previewUrl: 'http://talkyland.com/media/CACHE/images/posts/2013/1/15/0e9ac17973c446298516870396f146bc/f24393ecbacd8d912c091c73eca95354.jpg'
			}
		]
	}

	return factory;
});