angular.module('ionicApp.controllers')

.controller('SignTabCtrl', function($scope, $state, User, Employee, DateUtil, WebsocketClient) {
    
    $scope.$watch('$viewContentLoaded', function(event) {
		
	})
	
    $scope.$on("SignTabCtrl", function(event, msg) {
		var functionKey = msg.functionKey;
		if (functionKey == 'openTab') {
			openTabResponse();
		}
		else if(functionKey == 'userSign') {
			userSignResponse(msg);
		}
	});
    
    $scope.confirm = function() {
        if(!vaildateUser($scope.user)) {
        	return;
        }
        if(!vaildateEmployee($scope.employee)) {
        	return;
        }
        if(!vaildateStoreLocate($scope.storeLocate)) {
        	return;
        }
        var payLoad = {};
        payLoad.user = $scope.user;
        payLoad.employee = $scope.employee;
        payLoad.storeId = 1;
        userSign(payLoad);
    }
    
    $scope.clear = function() {
    	updateTab();
	}
    
    var updateTab = function() {
    	$scope.user = User.getUserTemplate();
        $scope.employee = Employee.getEmployeeTemplate();
        $scope.storeLocate = {
        	provience: '上海',
        	city: '上海',
        	name: '徐汇店'
        };
    }
    
    var openTabResponse = function() {
    	updateTab();
    }
    
    var vaildateUser = function(user) {
    	if(user.username == null || user.username == '') {
    		alert("用户名不能为空");
    		return false;
    	}
    	if(user.password == null || user.password == '')
        {
    	    alert("用户密码不能为空");	
    	    return false;
    	}
    	if (user.password != user.confirmPassword)
    	{
    		alert("两次输入密码不一致");
    		return false;
    	}
    	return true;
    }
    
    var vaildateEmployee = function(employee) {
    	if(employee.name == null || employee.name == '') {
    		alert("请输入用户名");
    		return false;
    	}
        if(employee.birthday == null) {
            alert("请输入出生日期");
            return false;
        }
    	if(employee.age == null || employee.age == '') {
    		alert("请输入年龄");
    		return false;
    	}
    	if(employee.sex == null || employee.sex == '')
        {
    	    alert("请输入性别");	
    	    return false;
    	}
    	if (employee.tel == null || employee.tel == '')
    	{
    		alert("请输入联系方式");
    		return false;
    	}
    	if (employee.ID == null || employee.ID == '')
    	{
    		alert("请输入身份证号");
    		return false;
    	}
    	return true;
    }
    
    var vaildateStoreLocate = function(storeLocate) {
    	if(storeLocate.provience == null || storeLocate.provience == '') {
    		alert("请选择门店位于的省份");
    		return false;
    	}
    	if(storeLocate.city == null || storeLocate.city == '')
        {
    	    alert("请选择门店位于的城市");	
    	    return false;
    	}
    	if (storeLocate.name == null || storeLocate.name == '')
    	{
    		alert("请选择门店名称");
    		return false;
    	}
    	return true;
    }
    
    var sendMsg = function(msg) {
		msg.routeKey = 'SignTabCtrl';
		$scope.$emit("MainCtrl", msg);
	}
    
    var userSign = function(payLoad) {
    	var data = {
			functionKey: 'userSign',
			urlName: 'UserSign',
			payLoad: JSON.stringify(payLoad),
			urlParameter: null
		}
		sendMsg(data);
    }
    
    var userSignResponse = function(msg) {
    	var responseCode = msg.responseCode;
    	if (responseCode != WebsocketClient.getResponseOk()) {
			alert(msg.responsePayLoad);
			return;
		}
    	alert("您的申请已经成功提交，请等待审核");
    	updateTab();
    	$state.go('login');
    }
    
    // $('#sign_birthday_input').datepicker({
    //     'format': 'yyyy/m/d',
    //     'autoclose': true
    // });
    
    updateTab();
    
});
