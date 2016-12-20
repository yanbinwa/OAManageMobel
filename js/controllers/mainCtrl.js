angular.module('ionicApp.controllers')

.controller('MainCtrl', function($scope, $state, $rootScope, $ionicSideMenuDelegate, $timeout, $ionicModal, WebsocketClient, StoreInfo, Notification, UserInfo) {

    $scope.$watch('$viewContentLoaded', function(event) {

	})
	
	$scope.infoNum = Notification.getNotificationsSize();
	$scope.session = WebsocketClient.getSession(onOpen, onClose, onMessage);
	$scope.notifications = Notification.getNotifications();
	
	$scope.$on("MainCtrl", function(event, msg) {
		if(WebsocketClient.checkSocketAlive()) {
			sendMsgToServer(msg);
		} 
		else {
			reConnectSession(1);
			if(WebsocketClient.checkSocketAlive()) {
				sendMsgToServer(msg);
			}
			else {
				var responseMsg = {
					routeKey : msg.routeKey,
					functionKey : msg.functionKey,
					responseCode : WebsocketClient.getWebSocketError(),
					responsePayLoad : null
				};
				handleManage(responseMsg);
			}
		}
	})
	
	$scope.$on("MainCtrlNotify", function(event, notify) {
		var routeKey = notify.routeKey;
		if (routeKey == "MainCtrlNotify") {
			if (notify.functionKey == "reConnectSession") {
				reConnectSessionResponse();
			}
		}
		else {
			
		}
	})
	
	$scope.openChildrenTab = function(index) {
		var responseMsg = {
			routeKey : null,
			functionKey : 'openTab'
		};
				
		if (index == 1) {
			responseMsg.routeKey = 'CheckinTabCtrl';
		} 
		$scope.$broadcast(responseMsg.routeKey, responseMsg);
	}
	
  	var sendMsg = function(msg) {
  		msg.routeKey = 'MainCtrl';
  		$scope.$emit("MainCtrl", msg);
  	}
  	
  	var sendNotify = function(notify) {
  		notify.routeKey = 'MainCtrlNotify';
  		$scope.$emit("MainCtrlNotify", notify);
  	}
	
	/* --------- WebSocket client function ---------- */
	
  	var handleManage = function(event) {
		var msg = JSON.parse(event.data);
		var routeKey = msg.routeKey;
		if (routeKey != 'MainCtrl') {
			$scope.$broadcast(routeKey, msg);
		}
		else {
			var functionKey = msg.functionKey;
			if(functionKey == 'getNotifyMessage') {
				getNotifyMessageResponse(msg);
			}
			else if(functionKey == 'getSessionId') {
				getSessionIdResponse(msg);
			}
		}
	}
	
    function onOpen() {
		alert('websocket connected');
		WebsocketClient.sessionOnOpen();
		onSessionConnected();
	}
	
	function onMessage(event) {
		handleManage(event);
	}
	
	function onClose() {
		WebsocketClient.sessionOnClose();
	}
	
	var onSessionConnected = function() {
		getSessionId();
	}
	
  	var sendMsgToServer = function(msg) {
  		var jsonStr = JSON.stringify(msg);
  		WebsocketClient.sendMsg(jsonStr);
  	}
	
	/* ---------------------------------------------- */
	
	
	/* --------- Get Session Id ---------- */
	
	var getSessionId = function() {
		var sessionId = WebsocketClient.getSessionId();
		var data = {
			functionKey: 'getSessionId',
			urlName: 'GetSessionId',
			payLoad: sessionId,
			urlParameter: null
		}
		sendMsg(data);
	}
	
	var getSessionIdResponse = function(msg) {
		var responseCode = msg.responseCode;
		var stateAuth = false;
  		if (responseCode != WebsocketClient.getResponseOk()) {
  			return;
  		}
  		var sessionId = msg.responsePayLoad;
  		if (sessionId == WebsocketClient.getSessionId()) {
  			StoreInfo.loadStoreInfo(WebsocketClient.getStorageKey());
  			UserInfo.loadUserInfo(WebsocketClient.getStorageKey());
  			stateAuth = true;
  		}
  		else {
  			WebsocketClient.setSessionId(sessionId);
  			WebsocketClient.saveSessionId(WebsocketClient.getStorageKey());
  		}
  		
  		//send sessionOpenMsg to other states
  		var responseMsg = {
			routeKey : 'GeneralEvent',
			functionKey : 'onSessionConnected',
			stateAuth: stateAuth
		};
  		$scope.$broadcast(responseMsg.routeKey, responseMsg);
	}
	
	/* ---------------------------------------------- */

	
	/* --------- ReConnect Session ---------- */
	
	var reConnectSession = function(timeout) {
		if (WebsocketClient.isReconnecting())
		{
			return;
		}
		WebsocketClient.startReconnect();
		$timeout(function() {
			var data = {
				functionKey: 'reConnectSession',
				stateName: null
			}
			sendNotify(data);
		}, timeout);
	}
	
	var reConnectSessionResponse = function(notify) {
		$scope.session = WebsocketClient.getSession(onOpen, onClose, onMessage);
	}
	
	/* ---------------------------------------------- */
	
	
  	
  	/* --------- Other ---------- */
  	
  	$scope.toggleLeft = function() {
	 	 $ionicSideMenuDelegate.toggleLeft();
  	}
  	$scope.shouldHide = function() {
		  return true;
  	}
  	$scope.shouldShowInfoNum = function() {
  		if($scope.infoNum == 0) {
  			return false;
  		}
  		return true;
  	}
 	
  	$scope.isAdminUser = function() {
  		return UserInfo.isAdminUser();
  	}
  	
  	$scope.isNormalUser = function() {
  		return UserInfo.isNormalUser();
  	}
  	
  	/* ---------------------------------------------- */
});