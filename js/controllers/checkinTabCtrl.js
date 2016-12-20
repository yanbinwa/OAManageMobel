angular.module('ionicApp.controllers', ['ionic', 'ngCordova'])

.controller('CheckinTabCtrl', function($scope, WebsocketClient, $cordovaBarcodeScanner) {
	$scope.$watch('$viewContentLoaded', function(event) {
		
	})

	$scope.$on("CheckinTabCtrl", function(event, msg) {
		var functionKey = msg.functionKey;
		if(functionKey == 'openTab') {
			//openTabResponse(msg);
			//$scope.scanBarcode();
		}
		else if(functionKey == '') {
			
		}
	});

	$scope.barcode = "";
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