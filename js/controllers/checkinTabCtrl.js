angular.module('ionicApp.controllers')

.controller('CheckinTabCtrl', function($scope, $rootScope, $cordovaBarcodeScanner, $state, WebsocketClient, UserInfo, URL, DateUtil) {
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
		alert(JSON.stringify(msg));
		var functionKey = msg.functionKey;
		if(functionKey == 'openTab') {
			openTabResponse(msg);
		}
		else if(functionKey == 'checkinWithBarcode') {
			checkinWithBarcodeResponse(msg);
		}
		else if(functionKey == 'checkoutWithBarcode') {
			checkoutWithBarcodeResponse(msg);
		}
	});

	$scope.getCheckinButtonName = function() {
		if ($scope.employee == null || $scope.employee.isCheckin != true) {
			return '请扫码Checkin';
		}
		else {
			return '请扫码Checkout';
		}
	}

	var openTabResponse = function(msg) {
		$scope.barcode = "";
		$scope.employee = UserInfo.getUserInfo().employee;
	}

    $scope.scanBarcode = function() {
        $cordovaBarcodeScanner.scan().then(function(imageData) {
        	if ($scope.employee.isCheckin != true) {
				checkinWithBarcode(imageData.text);
			}
			else {
				checkoutWithBarcode(imageData.text);
			}
        }, function(error) {
            alert('Can not scan the ORCode');
        });
    };

    var checkinWithBarcode = function(barcode) {
    	var payLoad = {};
    	payLoad.id = UserInfo.getUserInfo().employee.id;
    	payLoad.barcode = barcode;
    	payLoad.checkinAction = 'checkin';
    	var data = {
            functionKey: 'checkinWithBarcode',
            urlName: 'EmployeeCheckin',
            payLoad: JSON.stringify(payLoad),
            urlParameter: null
        }
        sendMsg(data);
    }

    var checkinWithBarcodeResponse = function(msg) {
    	alert(JSON.stringify(msg));
    	var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert(msg.responsePayLoad);
            return;
        }
        $scope.employee.isCheckin = true;
        var checkinStoreName = msg.responsePayLoad;
        var successMsg = $scope.employee.name + '于' + DateUtil.getCurrentTimeStr() + '在' + checkinStoreName + 'checkin';
        alert(successMsg);
        $scope.$digest();
    }

    var checkoutWithBarcode = function(barcode) {
    	var payLoad = {};
    	payLoad.id = UserInfo.getUserInfo().employee.id;
    	payLoad.barcode = barcode;
    	payLoad.checkinAction = 'checkout';
    	var data = {
            functionKey: 'checkoutWithBarcode',
            urlName: 'EmployeeCheckin',
            payLoad: JSON.stringify(payLoad),
            urlParameter: null
        }
        sendMsg(data);
    }

    var checkoutWithBarcodeResponse = function(msg) {
    	var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert(msg.responsePayLoad);
            return;
        }
        $scope.employee.isCheckin = false;
        var checkoutStoreName = msg.responsePayLoad;
        var successMsg = $scope.employee.name + '于' + DateUtil.getCurrentTimeStr() + '在' + checkoutStoreName + 'checkout';
        alert(successMsg);
        $scope.$digest();
    }
	
	var sendMsg = function(msg) {
		msg.routeKey = 'CheckinTabCtrl';
		$scope.$emit("MainCtrl", msg);
	}

});