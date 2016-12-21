angular.module('ionicApp.controllers')

.controller('UserEmployeeTabCtrl', function($scope, $rootScope, $state, $ionicPopup, WebsocketClient, UserInfo, DateUtil, URL) {
	
	$scope.$watch('$viewContentLoaded', function(event) {
		openTabResponse();
	})
	
	$scope.$on("GeneralEvent", function(event, msg) {
		var functionKey = msg.functionKey;
		if (functionKey == 'onSessionConnected') {
			onSessionConnectedResponse(msg);
		}
	});
	
	$scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		var url = toState.url;
		if (URL.getCtrByUrl(url) == 'UserEmployeeTabCtrl') {
			openTabResponse();
		}
	})
	
	var onSessionConnectedResponse = function(msg) {
		var stateAuth = msg.stateAuth;
		if (!stateAuth) {
			$state.go(URL.getLoginStateName());
		}
		else {
			$scope.userInfo = UserInfo.getUserInfo();
		}
	}
	
	$scope.$on("UserEmployeeTabCtrl", function(event, msg) {
		var functionKey = msg.functionKey;
		if (functionKey == 'openTab') {
			openTabResponse();
		}
		else if(functionKey == 'changeUserPassword') {
			changeUserPasswordResponse(msg);
		}
		else if(functionKey == 'logout') {
			logoutResponse(msg);
		}
	});
	
	$scope.showAuthType = function(authType) {
		if (authType == "Normal") {
			return "普通用户";
		}
		else if(authType == "Admin") {
			return "管理员用户";
		}
		return null;
	}
	
	$scope.showEmployeeBirthday = function(birthday) {
		return DateUtil.getDateStrFromTimestamp(birthday);
	}
	
	$scope.changePassword = function() {
		
		$scope.password = {};
		
		var changePasswordPopup = $ionicPopup.show({
			templateUrl: 'templates/changePasswordPoput.html',
			title: '更新用户密码',
			scope: $scope,
			buttons: [
			    {text: '取消'},
			    {
			    	text: '确认',
			    	type: 'button-positive',
			    	onTap: function(e) {
			    		if(!validatePassword($scope.password)) {
			    			e.preventDefault();
			    		}
			    		else {
			    			changeUserPassword($scope.password);
			    			return;
			    		}
			    	}
			    }
			]
		});
	}
	
	$scope.logout = function() {
		var sessionId = WebsocketClient.getSessionId();
		WebsocketClient.removeSessionId(WebsocketClient.getStorageKey());
		WebsocketClient.clearSessionId();
		
		UserInfo.removeUserInfo(WebsocketClient.getStorageKey());
		UserInfo.cleanUserInfo();
		
		var payLoad = {};
		payLoad.sessionId = sessionId;
		
		var data = {
			functionKey: 'logout',
			urlName: 'UserLogout',
			payLoad: JSON.stringify(payLoad),
			urlParameter: null
		}
		sendMsg(data);
	}
	
	var logoutResponse = function(msg) {
		var responseCode = msg.responseCode;
    	if (responseCode != WebsocketClient.getResponseOk()) {
			alert(msg.responsePayLoad);
			return;
		}
    	else {
    		alert("退出成功");
    	}
    	$state.go(URL.getLoginStateName());
	}
	
	var openTabResponse = function() {
		$scope.userInfo = UserInfo.getUserInfo();
	}
	
	var validatePassword = function(password) {
		if (password.oldPassword == null || password.oldPassword == "") {
			password.message = "原始密码不能为空";
			return false;
		}
		if (password.newPassword == null || password.newPassword ==  "") {
			password.message = "新密码不能为空";
			return false;
		}
		if (password.oldPassword == password.newPassword) {
			password.message = "原始密码不能与新密码一致";
			return false;
		}
		if (password.newPassword != password.confirmPassword) {
			password.message = "新密码不一致";
			return false;
		}
		return true;
	}
	
	var changeUserPassword = function(password) {
		var payLoad = {};
		payLoad.id = $scope.userInfo.user.id;
		payLoad.oldPassword = password.oldPassword;
		payLoad.newPassword = password.newPassword;
		
		var data = {
			functionKey: 'changeUserPassword',
			urlName: 'ChangePassword',
			payLoad: JSON.stringify(payLoad),
			urlParameter: null
		}
		sendMsg(data);
	}
	
	var changeUserPasswordResponse = function(msg) {
		var responseCode = msg.responseCode;
    	if (responseCode != WebsocketClient.getResponseOk()) {
			alert(msg.responsePayLoad);
			return;
		}
    	var errMsg = msg.responsePayLoad;
    	if (errMsg == "") {
    		alert("密码修改成功");
    	}
    	else {
    		alert(errMsg);
    	}
	}
	
	var sendMsg = function(msg) {
		msg.routeKey = 'UserEmployeeTabCtrl';
		$scope.$emit("MainCtrl", msg);
	}
	
});