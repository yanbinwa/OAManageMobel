angular.module('ionicApp.controllers')

.controller('HomeTabCtrl', function($scope, $rootScope, $state, UserInfo, URL) {
	$scope.$watch('$viewContentLoaded', function(event) {

	})
	
	$scope.$on("GeneralEvent", function(event, msg) {
		var functionKey = msg.functionKey;
		if (functionKey == 'onSessionConnected') {
			onSessionConnectedResponse(msg);
		}
	});
	
	var onSessionConnectedResponse = function(msg) {
		var stateAuth = msg.stateAuth;
		if (!stateAuth) {
			$state.go(URL.getLoginStateName());
		}
	}
	
});