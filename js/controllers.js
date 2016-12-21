angular.module('ionicApp.controllers', ['ionic', 'ionic-datepicker', 'ngCordova']);

// .controller('MainCtrl', function($scope, $state, $rootScope, $ionicSideMenuDelegate, $timeout, $ionicModal, WebsocketClient, StoreInfo, Notification, UserInfo) {

//     $scope.$watch('$viewContentLoaded', function(event) {

// 	})
	
// 	$scope.infoNum = Notification.getNotificationsSize();
// 	$scope.session = WebsocketClient.getSession(onOpen, onClose, onMessage);
// 	$scope.notifications = Notification.getNotifications();
	
// 	$scope.$on("MainCtrl", function(event, msg) {
// 		if(WebsocketClient.checkSocketAlive()) {
// 			sendMsgToServer(msg);
// 		} 
// 		else {
// 			reConnectSession(1)
// 			if(WebsocketClient.checkSocketAlive()) {
// 				sendMsgToServer(msg);
// 			}
// 			else {
// 				var responseMsg = {
// 					routeKey : msg.routeKey,
// 					functionKey : msg.functionKey,
// 					responseCode : WebsocketClient.getWebSocketError(),
// 					responsePayLoad : null
// 				};
// 				handleManage(responseMsg);
// 			}
// 		}
// 	})
	
// 	$scope.$on("MainCtrlNotify", function(event, notify) {
// 		var routeKey = notify.routeKey;
// 		if (routeKey == "MainCtrlNotify") {
// 			if (notify.functionKey == "reConnectSession") {
// 				reConnectSessionResponse();
// 			}
// 		}
// 		else {
			
// 		}
// 	})
	
// 	$scope.openChildrenTab = function(index) {
// 		var responseMsg = {
// 			routeKey : null,
// 			functionKey : 'openTab'
// 		};
				
// 		if (index == 1) {
// 			responseMsg.routeKey = 'CheckinTabCtrl';
// 		} 
// 		$scope.$broadcast(responseMsg.routeKey, responseMsg);
// 	}
	
//   	var sendMsg = function(msg) {
//   		msg.routeKey = 'MainCtrl';
//   		$scope.$emit("MainCtrl", msg);
//   	}
  	
//   	var sendNotify = function(notify) {
//   		notify.routeKey = 'MainCtrlNotify';
//   		$scope.$emit("MainCtrlNotify", notify);
//   	}
	
// 	/* --------- WebSocket client function ---------- */
	
//   	var handleManage = function(event) {
// 		var msg = JSON.parse(event.data);
// 		var routeKey = msg.routeKey;
// 		if (routeKey != 'MainCtrl') {
// 			$scope.$broadcast(routeKey, msg);
// 		}
// 		else {
// 			var functionKey = msg.functionKey;
// 			if(functionKey == 'getNotifyMessage') {
// 				getNotifyMessageResponse(msg);
// 			}
// 			else if(functionKey == 'getSessionId') {
// 				getSessionIdResponse(msg);
// 			}
// 		}
// 	}
	
//     function onOpen() {
// 		alert('websocket connected');
// 		WebsocketClient.sessionOnOpen();
// 		onSessionConnected();
// 	}
	
// 	function onMessage(event) {
// 		handleManage(event);
// 	}
	
// 	function onClose() {
// 		WebsocketClient.sessionOnClose();
// 	}
	
// 	var onSessionConnected = function() {
// 		getSessionId();
// 	}
	
//   	var sendMsgToServer = function(msg) {
//   		var jsonStr = JSON.stringify(msg);
//   		WebsocketClient.sendMsg(jsonStr);
//   	}
	
// 	/* ---------------------------------------------- */
	
	
// 	/* --------- Get Session Id ---------- */
	
// 	var getSessionId = function() {
// 		var sessionId = WebsocketClient.getSessionId();
// 		var data = {
// 			functionKey: 'getSessionId',
// 			urlName: 'GetSessionId',
// 			payLoad: sessionId,
// 			urlParameter: null
// 		}
// 		sendMsg(data);
// 	}
	
// 	var getSessionIdResponse = function(msg) {
// 		var responseCode = msg.responseCode;
// 		var stateAuth = false;
//   		if (responseCode != WebsocketClient.getResponseOk()) {
//   			return;
//   		}
//   		var sessionId = msg.responsePayLoad;
//   		if (sessionId == WebsocketClient.getSessionId()) {
//   			StoreInfo.loadStoreInfo(WebsocketClient.getStorageKey());
//   			UserInfo.loadUserInfo(WebsocketClient.getStorageKey());
//   			stateAuth = true;
//   		}
//   		else {
//   			WebsocketClient.setSessionId(sessionId);
//   			WebsocketClient.saveSessionId(WebsocketClient.getStorageKey());
//   		}
  		
//   		//send sessionOpenMsg to other states
//   		var responseMsg = {
// 			routeKey : 'GeneralEvent',
// 			functionKey : 'onSessionConnected',
// 			stateAuth: stateAuth
// 		};
//   		$scope.$broadcast(responseMsg.routeKey, responseMsg);
// 	}
	
// 	/* ---------------------------------------------- */

	
// 	/* --------- ReConnect Session ---------- */
	
// 	var reConnectSession = function(timeout) {
// 		if (WebsocketClient.isReconnecting())
// 		{
// 			return;
// 		}
// 		WebsocketClient.startReconnect();
// 		$timeout(function() {
// 			var data = {
// 				functionKey: 'reConnectSession',
// 				stateName: null
// 			}
// 			sendNotify(data);
// 		}, timeout);
// 	}
	
// 	var reConnectSessionResponse = function(notify) {
// 		$scope.session = WebsocketClient.getSession(onOpen, onClose, onMessage);
// 	}
	
// 	/* ---------------------------------------------- */
	
	
  	
//   	/* --------- Other ---------- */
  	
//   	$scope.toggleLeft = function() {
// 	 	 $ionicSideMenuDelegate.toggleLeft();
//   	}
//   	$scope.shouldHide = function() {
// 		  return true;
//   	}
//   	$scope.shouldShowInfoNum = function() {
//   		if($scope.infoNum == 0) {
//   			return false;
//   		}
//   		return true;
//   	}
 	
//   	$scope.isAdminUser = function() {
//   		return UserInfo.isAdminUser();
//   	}
  	
//   	$scope.isNormalUser = function() {
//   		return UserInfo.isNormalUser();
//   	}
  	
//   	/* ---------------------------------------------- */
// })

// .controller('HomeTabCtrl', function($scope, $state, UserInfo) {
// 	$scope.$watch('$viewContentLoaded', function(event) {

// 	})
	
// 	$scope.$on("GeneralEvent", function(event, msg) {
// 		var functionKey = msg.functionKey;
// 		if (functionKey == 'onSessionConnected') {
// 			onSessionConnectedResponse(msg);
// 		}
// 	});
	
// 	var onSessionConnectedResponse = function(msg) {
// 		var stateAuth = msg.stateAuth;
// 		if (!stateAuth) {
// 			$state.go('login');
// 		}
// 	}
	
// })

// .controller('CheckinTabCtrl', function($scope, WebsocketClient, $cordovaBarcodeScanner) {
// 	$scope.$watch('$viewContentLoaded', function(event) {
		
// 	})

// 	$scope.$on("CheckinTabCtrl", function(event, msg) {
// 		var functionKey = msg.functionKey;
// 		if(functionKey == 'openTab') {
// 			//openTabResponse(msg);
// 			//$scope.scanBarcode();
// 		}
// 		else if(functionKey == '') {
			
// 		}
// 	});

// 	$scope.barcode = "";
//     $scope.scanBarcode = function() {
//         $cordovaBarcodeScanner.scan().then(function(imageData) {
//             $scope.barcode = imageData.text;
//         }, function(error) {
//             alert('Can not scan the ORCode');
//         });
//     };
	
// 	var sendMsg = function(msg) {
// 		msg.routeKey = 'CheckinTabCtrl';
// 		$scope.$emit("MainCtrl", msg);
// 	}

// })

// .controller('LoginTabCtrl', function($scope, $state, DateUtil, WebsocketClient, UserInfo) {
    
// 	$scope.$on("LoginTabCtrl", function(event, msg) {
// 		var functionKey = msg.functionKey;
// 		if (functionKey == 'openTab') {
// 			openTabResponse();
// 		}
// 		else if(functionKey == 'userLogin') {
// 			userLoginResponse(msg);
// 		}
// 		else if(functionKey == 'getEmployeeInfo') {
// 			getEmployeeInfoResponse(msg);
// 		}
// 		else if(functionKey == 'getStoreInfo') {
// 			getStoreInfoResponse(msg);
// 		}
// 	});
	
// 	$scope.user = {};
//     $scope.user.auth = "普通用户";
    
//     $scope.login = function() {
//         alert("name is " + $scope.user.username + ", password is: " + $scope.user.password + ", role is: " + $scope.user.auth);
//         var payLoad = {};
//         payLoad.username = $scope.user.username;
//         payLoad.password = $scope.user.password;
//         payLoad.userType = "employee";
//         payLoad.authType = $scope.user.auth;
//         userLogin(payLoad);
        
//     }
//     $scope.sign = function() {
//         $state.go('sign');
//     }
    
//     var sendMsg = function(msg) {
// 		msg.routeKey = 'LoginTabCtrl';
// 		$scope.$emit("MainCtrl", msg);
// 	}
    
//     var userLogin = function(payLoad) {
//     	var data = {
// 			functionKey: 'userLogin',
// 			urlName: 'UserLogin',
// 			payLoad: JSON.stringify(payLoad),
// 			urlParameter: null
// 		}
// 		sendMsg(data);
//     }
    
//     var userLoginResponse = function(msg) {
//     	var responseCode = msg.responseCode;
//     	if (responseCode != WebsocketClient.getResponseOk()) {
// 			alert(msg.responsePayLoad);
// 			return;
// 		}
//     	var user = msg.responsePayLoad;
//     	UserInfo.setUserInfoUser(user);
//     	var userId = user.userId;
//     	if (user.userType == "Employee") {
//     		getEmployeeInfo(userId);
//     	}
//     	else {
//     		getStoreInfo(userId);
//     	}
//     }
    
//     var getEmployeeInfo = function(id) {
//     	var data = {
// 			functionKey: 'getEmployeeInfo',
// 			urlName: 'GetEmployeeById',
// 			payLoad: null,
// 			urlParameter: id
// 		}
//     	sendMsg(data);
//     }
    
//     var getEmployeeInfoResponse = function(msg) {
//     	var responseCode = msg.responseCode;
//     	if (responseCode != WebsocketClient.getResponseOk()) {
// 			alert(msg.responsePayLoad);
// 			return;
// 		}
//     	var employee = msg.responsePayLoad;
//     	UserInfo.setUserInfoEmployee(employee);
//     	UserInfo.saveUserInfo(WebsocketClient.getStorageKey());
//     	alert("登陆成功");
//     	$state.go('app.main.home');
//     }
    
//     var getStoreInfo = function(id) {
//     	var data = {
// 			functionKey: 'getStoreInfo',
// 			urlName: 'GetStoreById',
// 			payLoad: null,
// 			urlParameter: id
// 		}
//     	sendMsg(data);
//     }
    
//     var getStoreInfoResponse = function(msg) {
//     	var responseCode = msg.responseCode;
//     	if (responseCode != WebsocketClient.getResponseOk()) {
// 			alert(msg.responsePayLoad);
// 			return;
// 		}
//     	var store = msg.responsePayLoad;
//     	UserInfo.setUserInfoStore(store);
//     	alert("登陆成功");
//     	$state.go('app.main.home');
//     }
    
//     var openTabResponse = function() {
//     	$scope.user = {};
//         $scope.user.auth = "普通用户";
//     }
    
// })

// .controller('SignTabCtrl', function($scope, $state, User, Employee, DateUtil, WebsocketClient) {
    
//     $scope.$watch('$viewContentLoaded', function(event) {
		
// 	})
	
//     $scope.$on("SignTabCtrl", function(event, msg) {
// 		var functionKey = msg.functionKey;
// 		if (functionKey == 'openTab') {
// 			openTabResponse();
// 		}
// 		else if(functionKey == 'userSign') {
// 			userSignResponse(msg);
// 		}
// 	});
    
//     $scope.confirm = function() {
//         if(!vaildateUser($scope.user)) {
//         	return;
//         }
//         if(!vaildateEmployee($scope.employee)) {
//         	return;
//         }
//         if(!vaildateStoreLocate($scope.storeLocate)) {
//         	return;
//         }
//         var payLoad = {};
//         payLoad.user = $scope.user;
//         payLoad.employee = $scope.employee;
//         payLoad.storeId = 1;
//         userSign(payLoad);
//     }
    
//     $scope.clear = function() {
//     	updateTab();
// 	}
    
//     var updateTab = function() {
//     	$scope.user = User.getUserTemplate();
//         $scope.employee = Employee.getEmployeeTemplate();
//         $scope.storeLocate = {
//         	provience: '上海',
//         	city: '上海',
//         	name: '徐汇店'
//         };
//     }
    
//     var openTabResponse = function() {
//     	updateTab();
//     }
    
//     var vaildateUser = function(user) {
//     	if(user.username == null || user.username == '') {
//     		alert("用户名不能为空");
//     		return false;
//     	}
//     	if(user.password == null || user.password == '')
//         {
//     	    alert("用户密码不能为空");	
//     	    return false;
//     	}
//     	if (user.password != user.confirmPassword)
//     	{
//     		alert("两次输入密码不一致");
//     		return false;
//     	}
//     	return true;
//     }
    
//     var vaildateEmployee = function(employee) {
//     	if(employee.name == null || employee.name == '') {
//     		alert("请输入用户名");
//     		return false;
//     	}
//     	if(employee.birthday == null) {
//             alert("请输入出生日期");
//             return false;
//         }
//     	if(employee.age == null || employee.age == '') {
//     		alert("请输入年龄");
//     		return false;
//     	}
//     	if(employee.sex == null || employee.sex == '')
//         {
//     	    alert("请输入性别");	
//     	    return false;
//     	}
//     	if (employee.tel == null || employee.tel == '')
//     	{
//     		alert("请输入联系方式");
//     		return false;
//     	}
//     	if (employee.ID == null || employee.ID == '')
//     	{
//     		alert("请输入身份证号");
//     		return false;
//     	}
//     	return true;
//     }
    
//     var vaildateStoreLocate = function(storeLocate) {
//     	if(storeLocate.provience == null || storeLocate.provience == '') {
//     		alert("请选择门店位于的省份");
//     		return false;
//     	}
//     	if(storeLocate.city == null || storeLocate.city == '')
//         {
//     	    alert("请选择门店位于的城市");	
//     	    return false;
//     	}
//     	if (storeLocate.name == null || storeLocate.name == '')
//     	{
//     		alert("请选择门店名称");
//     		return false;
//     	}
//     	return true;
//     }
    
//     var sendMsg = function(msg) {
// 		msg.routeKey = 'SignTabCtrl';
// 		$scope.$emit("MainCtrl", msg);
// 	}
    
//     var userSign = function(payLoad) {
//     	var data = {
// 			functionKey: 'userSign',
// 			urlName: 'UserSign',
// 			payLoad: JSON.stringify(payLoad),
// 			urlParameter: null
// 		}
// 		sendMsg(data);
//     }
    
//     var userSignResponse = function(msg) {
//     	var responseCode = msg.responseCode;
//     	if (responseCode != WebsocketClient.getResponseOk()) {
// 			alert(msg.responsePayLoad);
// 			return;
// 		}
//     	alert("您的申请已经成功提交，请等待审核");
//     	updateTab();
//     	$state.go('login');
//     }
    
//     updateTab();
    
// })

// angular.module('ionicApp.controllers')

// .controller('UserEmployeeTabCtrl', function($scope, $state, $ionicPopup, WebsocketClient, UserInfo, DateUtil) {
	
// 	$scope.$watch('$viewContentLoaded', function(event) {

// 	})
	
// 	$scope.$on("GeneralEvent", function(event, msg) {
// 		var functionKey = msg.functionKey;
// 		if (functionKey == 'onSessionConnected') {
// 			onSessionConnectedResponse(msg);
// 		}
// 	});
	
// 	var onSessionConnectedResponse = function(msg) {
// 		var stateAuth = msg.stateAuth;
// 		if (!stateAuth) {
// 			$state.go('login');
// 		}
// 		else {
// 			$scope.userInfo = UserInfo.getUserInfo();
// 		}
// 	}
	
// 	$scope.$on("UserEmployeeTabCtrl", function(event, msg) {
// 		var functionKey = msg.functionKey;
// 		if (functionKey == 'openTab') {
// 			openTabResponse();
// 		}
// 		else if(functionKey == 'changeUserPassword') {
// 			changeUserPasswordResponse(msg);
// 		}
// 		else if(functionKey == 'logout') {
// 			logoutResponse(msg);
// 		}
// 	});
	
// 	$scope.userInfo = UserInfo.getUserInfo();
	
// 	$scope.showAuthType = function(authType) {
// 		if (authType == "Normal") {
// 			return "普通用户";
// 		}
// 		else if(authType == "Admin") {
// 			return "管理员用户";
// 		}
// 		return null;
// 	}
	
// 	$scope.showEmployeeBirthday = function(birthday) {
// 		return DateUtil.getDateStrFromTimestamp(birthday);
// 	}
	
// 	$scope.changePassword = function() {
		
// 		$scope.password = {};
		
// 		var changePasswordPopup = $ionicPopup.show({
// 			templateUrl: 'templates/changePasswordPoput.html',
// 			title: '更新用户密码',
// 			scope: $scope,
// 			buttons: [
// 			    {text: '取消'},
// 			    {
// 			    	text: '确认',
// 			    	type: 'button-positive',
// 			    	onTap: function(e) {
// 			    		if(!validatePassword($scope.password)) {
// 			    			e.preventDefault();
// 			    		}
// 			    		else {
// 			    			changeUserPassword($scope.password);
// 			    			return;
// 			    		}
// 			    	}
// 			    }
// 			]
// 		});
// 	}
	
// 	$scope.logout = function() {
// 		var sessionId = WebsocketClient.getSessionId();
// 		WebsocketClient.removeSessionId(WebsocketClient.getStorageKey());
// 		WebsocketClient.clearSessionId();
		
// 		UserInfo.removeUserInfo(WebsocketClient.getStorageKey());
// 		UserInfo.cleanUserInfo();
		
// 		var payLoad = {};
// 		payLoad.sessionId = sessionId;
		
// 		var data = {
// 			functionKey: 'logout',
// 			urlName: 'UserLogout',
// 			payLoad: JSON.stringify(payLoad),
// 			urlParameter: null
// 		}
// 		sendMsg(data);
// 	}
	
// 	var logoutResponse = function(msg) {
// 		var responseCode = msg.responseCode;
//     	if (responseCode != WebsocketClient.getResponseOk()) {
// 			alert(msg.responsePayLoad);
// 			return;
// 		}
//     	else {
//     		alert("退出成功");
//     	}
//     	$state.go('login');
// 	}
	
// 	var openTabResponse = function() {
		
// 	}
	
// 	var validatePassword = function(password) {
// 		if (password.oldPassword == null || password.oldPassword == "") {
// 			password.message = "原始密码不能为空";
// 			return false;
// 		}
// 		if (password.newPassword == null || password.newPassword ==  "") {
// 			password.message = "新密码不能为空";
// 			return false;
// 		}
// 		if (password.oldPassword == password.newPassword) {
// 			password.message = "原始密码不能与新密码一致";
// 			return false;
// 		}
// 		if (password.newPassword != password.confirmPassword) {
// 			password.message = "新密码不一致";
// 			return false;
// 		}
// 		return true;
// 	}
	
// 	var changeUserPassword = function(password) {
// 		var payLoad = {};
// 		payLoad.id = $scope.userInfo.user.id;
// 		payLoad.oldPassword = password.oldPassword;
// 		payLoad.newPassword = password.newPassword;
		
// 		var data = {
// 			functionKey: 'changeUserPassword',
// 			urlName: 'ChangePassword',
// 			payLoad: JSON.stringify(payLoad),
// 			urlParameter: null
// 		}
// 		sendMsg(data);
// 	}
	
// 	var changeUserPasswordResponse = function(msg) {
// 		var responseCode = msg.responseCode;
//     	if (responseCode != WebsocketClient.getResponseOk()) {
// 			alert(msg.responsePayLoad);
// 			return;
// 		}
//     	var errMsg = msg.responsePayLoad;
//     	if (errMsg == "") {
//     		alert("密码修改成功");
//     	}
//     	else {
//     		alert(errMsg);
//     	}
// 	}
	
// 	var sendMsg = function(msg) {
// 		msg.routeKey = 'UserEmployeeTabCtrl';
// 		$scope.$emit("MainCtrl", msg);
// 	}
	
// });