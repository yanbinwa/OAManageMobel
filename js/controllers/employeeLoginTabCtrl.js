angular.module('ionicApp.controllers')

.controller('EmployeeLoginTabCtrl', function($scope, $rootScope, $state, DateUtil, WebsocketClient, UserInfo, URL) {
    
    $scope.$on("EmployeeLoginTabCtrl", function(event, msg) {
        var functionKey = msg.functionKey;
        if (functionKey == 'openTab') {
            openTabResponse();
        }
        else if(functionKey == 'userLogin') {
            userLoginResponse(msg);
        }
        else if(functionKey == 'getEmployeeInfo') {
            getEmployeeInfoResponse(msg);
        }
    });
    
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        var url = toState.url;
        if (URL.getCtrByUrl(url) == 'EmployeeLoginTabCtrl') {
            openTabResponse();
        }
    })
    
    $scope.login = function() {
        alert("name is " + $scope.user.username + ", password is: " + $scope.user.password + ", role is: " + $scope.user.auth);
        var payLoad = {};
        payLoad.username = $scope.user.username;
        payLoad.password = $scope.user.password;
        payLoad.userType = "employee";
        payLoad.authType = $scope.user.auth;
        userLogin(payLoad);
        
    }
    $scope.sign = function() {
        $state.go(URL.getSignStateName());
    }
    
    var sendMsg = function(msg) {
        msg.routeKey = 'EmployeeLoginTabCtrl';
        $scope.$emit("MainCtrl", msg);
    }
    
    var userLogin = function(payLoad) {
        var data = {
            functionKey: 'userLogin',
            urlName: 'UserLogin',
            payLoad: JSON.stringify(payLoad),
            urlParameter: null
        }
        sendMsg(data);
    }
    
    var userLoginResponse = function(msg) {
        var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert(msg.responsePayLoad);
            return;
        }
        var user = msg.responsePayLoad;
        UserInfo.setUserInfoUser(user);
        var userId = user.userId;
        if (user.userType == "Employee") {
            getEmployeeInfo(userId);
        }
        else {
            getStoreInfo(userId);
        }
    }
    
    var getEmployeeInfo = function(id) {
        var data = {
            functionKey: 'getEmployeeInfo',
            urlName: 'GetEmployeeById',
            payLoad: null,
            urlParameter: id
        }
        sendMsg(data);
    }
    
    var getEmployeeInfoResponse = function(msg) {
        var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert(msg.responsePayLoad);
            return;
        }
        var employee = msg.responsePayLoad;
        UserInfo.setUserInfoEmployee(employee);
        UserInfo.saveUserInfo(WebsocketClient.getStorageKey());
        alert("登陆成功");
        $state.go('app.main.home');
    }
    
    var openTabResponse = function() {
        $scope.user = {};
        $scope.user.auth = "普通用户";
    }
    
});