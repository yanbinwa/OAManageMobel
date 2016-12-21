angular.module('ionicApp.controllers')

.controller('CheckinTabCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $state, WebsocketClient, UserInfo, URL) {
	$scope.$watch('$viewContentLoaded', function(event) {
		openTabResponse();
	})
	
	$scope.$on("GeneralEvent", function(event, msg) {
		var functionKey = msg.functionKey;
		if (functionKey == 'onSessionConnected') {
			onSessionConnectedResponse(msg);
		}
	});
	
	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url;
		if (URL.getCtrByUrl(url) == 'CheckinTabCtrl') {
			openTabResponse();
		}
	})

	var onSessionConnectedResponse = function(msg) {
		var stateAuth = msg.stateAuth;
		if (!stateAuth) {
			$state.go(URL.getLoginStateName());
		}
		else {
			openTabResponse();
		}
	}

	$scope.$on("CheckinTabCtrl", function(event, msg) {
		var functionKey = msg.functionKey;
		if(functionKey == 'openTab') {
			openTabResponse(msg);
			//$scope.scanBarcode();
		}
		else if(functionKey == '') {
			
		}
	});

	var openTabResponse = function(msg) {
		$scope.barcode = "";
	}

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
            $scope.barcode = imageData.text;
        }, function(error) {
            alert('Can not scan the ORCode');
        });
    };
	
	var sendMsg = function(msg) {
		msg.routeKey = 'CheckinTabCtrl';
		$scope.$emit("MainCtrl", msg);
	}

});