angular.module('ionicApp.controllers')

.controller('EmployeeSignTabCtrl', function($scope, $rootScope, $state, $ionicModal, User, Employee, DateUtil, WebsocketClient, URL, ionicDatePicker) {
    
    $scope.$watch('$viewContentLoaded', function(event) {
        
    })
    
    $scope.$on("EmployeeSignTabCtrl", function(event, msg) {
        var functionKey = msg.functionKey;
        if (functionKey == 'openTab') {
            openTabResponse();
        }
        else if(functionKey == 'userSign') {
            userSignResponse(msg);
        }
        else if(functionKey == 'getProvinceList') {
            getProvinceListResponse(msg);
        }
        else if(functionKey == 'getCityList') {
            getCityListResponse(msg);
        }
        else if(functionKey == 'getAreaList') {
            getAreaListResponse(msg);
        }
        else if(functionKey == 'getStoreList') {
            getStoreListResponse(msg);
        }
    });
    
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        var url = toState.url;
        if (URL.getCtrByUrl(url) == 'EmployeeSignTabCtrl') {
            openTabResponse();
        }
    });
    
    $scope.$on("GeneralEvent", function(event, msg) {
        var functionKey = msg.functionKey;
        if (functionKey == 'onSessionConnected') {
            onSessionConnectedResponse(msg);
        }
    });
    
    $scope.confirm = function() {
        if(!vaildateUser($scope.user)) {
            return;
        }
        if(!vaildateEmployee($scope.employee)) {
            return;
        }
        if($scope.storeId == -1) {
            return;
        }
        var payLoad = {};
        payLoad.user = $scope.user;
        payLoad.employee = $scope.employee;
        payLoad.storeId = $scope.storeId;
        userSign(payLoad);
    }
    
    $scope.clear = function() {
        updateTab(false);
    }
    
    var onSessionConnectedResponse = function(msg) {
        openTabResponse();
    }
    
    var updateTab = function(tag) {
        $scope.user = User.getUserTemplate('employee');
        $scope.employee = Employee.getEmployeeTemplate();
        $scope.storeId = -1;
        $scope.provinces = [];
        $scope.citys = [];
        $scope.areas = [];
        $scope.stores = [];
        $scope.location = {};
        if (tag == true)
        {
            getProvinceList();
        }
    }
    
    var openTabResponse = function() {
        updateTab(true);
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
        if(employee.birthday == null || employee.birthday == '') {
            alert("请输入出生日期");
            return false;
        }
        employee.age = DateUtil.getAgeFromBirthdayTimestamp(employee.birthday);
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
    
    var sendMsg = function(msg) {
        msg.routeKey = 'EmployeeSignTabCtrl';
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
        updateTab(false);
        $state.go(URL.getLoginStateName());
    }
    
    /* -------------- chose store info ----------------- */
    
    $scope.selectProvince = function() {
        if ($scope.location.province == null) {
            return;
        }
        getCityList($scope.location.province.id);
    }
    
    $scope.selectCity = function() {
        if ($scope.location.city == null) {
            return;
        }
        getAreaList($scope.location.city.id);
    }
    
    $scope.selectArea = function() {
        if ($scope.location.area == null) {
            return;
        }
        getStoreList($scope.location.area.id);
    }
    
    $scope.selectStore = function() {
        if ($scope.location.store == null) {
            return;
        }
        $scope.storeId = $scope.location.store.id;
    }
    
    var getProvinceList = function() {
        var data = {
            functionKey: 'getProvinceList',
            urlName: 'GetStoreProvince',
            payLoad: null,
            urlParameter: null
        }
        sendMsg(data);
    }
    
    var getProvinceListResponse = function(msg) {
        var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert("fail to get provinceList");
            return;
        }
        $scope.provinces = [];
        var provinceList = msg.responsePayLoad;
        for (var provinceId in provinceList) {
            var province = {};
            province.id = provinceId;
            province.name = provinceList[provinceId];
            $scope.provinces.push(province);
        }
        alert(JSON.stringify($scope.provinces));
        $scope.location.province = {};
        $scope.location.city = {};
        $scope.location.area = {};
        $scope.location.store = {};
        $scope.citys = [];
        $scope.areas = [];
        $scope.stores = [];
        $rootScope.$digest();
    }
    
    var getCityList = function(provinceId) {
        var data = {
            functionKey: 'getCityList',
            urlName: 'GetStoreCityByProvinceId',
            payLoad: null,
            urlParameter: provinceId
        }
        sendMsg(data);
    }
    
    var getCityListResponse = function(msg) {
        var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert("fail to get cityList");
            return;
        }
        $scope.citys = [];
        var cityList = msg.responsePayLoad;
        for (var cityId in cityList) {
            var city = [];
            city.id = cityId;
            city.name = cityList[cityId];
            $scope.citys.push(city);
        }
        $scope.location.city = {};
        $scope.location.area = {};
        $scope.location.store = {};
        $scope.areas = [];
        $scope.stores = [];
        //$rootScope.$digest();
        $scope.$digest();
    }
    
    var getAreaList = function(cityId) {
        var data = {
            functionKey: 'getAreaList',
            urlName: 'GetStoreAreaByCityId',
            payLoad: null,
            urlParameter: cityId
        }
        sendMsg(data);
    }
    
    var getAreaListResponse = function(msg) {
        var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert("fail to get areaList");
            return;
        }
        $scope.areas = [];
        var areaList = msg.responsePayLoad;
        for (var areaId in areaList) {
            var area = [];
            area.id = areaId;
            area.name = areaList[areaId];
            $scope.areas.push(area);
        }
        $scope.location.area = {};
        $scope.location.store = {};
        $scope.stores = [];
        //$rootScope.$digest();
        $scope.$digest();
    }
    
    var getStoreList = function(areaId) {
        var data = {
            functionKey: 'getStoreList',
            urlName: 'GetStoreByAreaId',
            payLoad: null,
            urlParameter: areaId
        }
        sendMsg(data);
    }
    
    var getStoreListResponse = function(msg) {
        var responseCode = msg.responseCode;
        if (responseCode != WebsocketClient.getResponseOk()) {
            alert("fail to get store");
            return;
        }
        $scope.stores = [];
        var storeList = msg.responsePayLoad;
        for (var storeId in storeList) {
            var store = [];
            store.id = storeId;
            store.name = storeList[storeId];
            $scope.stores.push(store);
        }
        $scope.location.store = {};
        $rootScope.$digest();
    }

    $scope.showStoreChoose = function() {
        $scope.storeChooseModal.show();
    }

    $scope.cancelStoreChoose = function() {
        $scope.storeChooseModal.hide();
    }

    $scope.confirmStoreChoose = function() {
        $scope.employee.storeStr = '';
        if ($scope.location.province.name != null) {
            $scope.employee.storeStr += $scope.location.province.name + '  ';
        }
        if ($scope.location.city.name != null) {
            $scope.employee.storeStr += $scope.location.city.name + '  ';
        }
        if ($scope.location.area.name != null) {
            $scope.employee.storeStr += $scope.location.area.name + '  ';
        }
        if ($scope.location.store.name != null) {
            $scope.employee.storeStr += $scope.location.store.name;
        }
        $scope.location.province = {};
        $scope.location.city = {};
        $scope.location.area = {};
        $scope.storeId = $scope.location.store.id;
        $scope.location.store = {};
        $scope.storeChooseModal.hide();
    }

    $ionicModal.fromTemplateUrl('templates/storeChoose.html', function(modal) {
        $scope.storeChooseModal = modal;
    }, {
        scope: $scope,
        viewType: 'bottom-sheet',
        animation: 'slide-in-up'
    });
    
    /* -------------- ----------------- */
    
    /* -------------- birthday ----------------- */
    
    $scope.openDatePicker = function (val) {
        var datePicker = {
            callback: function (val) { 
                $scope.employee.birthday = val;
                $scope.employee.birthdayStr = DateUtil.getDateStrFromTimestamp(val);
            },
            disabledDates: [
                new Date(2016, 2, 16),
                new Date(2015, 3, 16),
                new Date(2015, 4, 16),
                new Date(2015, 5, 16),
                new Date('Wednesday, August 12, 2015'),
                new Date("08-16-2016"),
                new Date(1439676000000)
            ],
            from: new Date(2012, 1, 1),
            to: new Date(2018, 10, 30),
            inputDate: new Date(),
            mondayFirst: true,
            disableWeekdays: [],
            closeOnSelect: false,
            templateType: 'model'
        };
        ionicDatePicker.openDatePicker(datePicker);
    };
        
    /* -------------- ----------------- */
    
    /* -------------- choose store ----------------- */

    /* -------------- ----------------- */


});
