angular.module('ionicApp.services', [])

.factory('WebsocketClient', function() {

	//var SERVER_URL = "ws://localhost:8080/OAManage/websocket/websocketSpring";
	//var SERVER_URL = "wss://192.168.1.104:8443/OAManage/websocket/websocketSpring";
	var SERVER_URL = "ws://192.168.1.103:8080/OAManage/websocket/websocketSpring";
	var WEBSOCKET_ERROR = 400;
	var RESPONSE_OK = 200;
	var INVALIDATE_SESSIONID = -1;
	var STORAGE_KEY = "OAManage";
	
	var session = new Object();
	session.client = null;
	session.connected = false;
	session.connecting = false;
	session.id = INVALIDATE_SESSIONID;

	var loadSessionId = function(key) {
		session.id = window.localStorage[key + "sessionId"];
		if (session.id == null) {
			session.id = INVALIDATE_SESSIONID;
		}
		return session.id;
	}
	
	return {
		getSession: function(onOpen, onClose, onMessage) {
			if ('WebSocket' in window) {
				session.client = new WebSocket(SERVER_URL);
				if (session.client != null) {
					session.client.onopen = function(event) {
						onOpen();
					}
					session.client.onclose = function() {
						onClose();
					}
					session.client.onmessage = function() {
						onMessage(event);
					}
					session.connecting = true;
					loadSessionId(STORAGE_KEY);
				}
			}
			else {
				alert("The browser is not support websocket");
			}
			return session;
		},
		getServerUrl: function() {
			return SERVER_URL;
		},
		getWebSocketError: function() {
			return WEBSOCKET_ERROR;
		},
		getResponseOk: function() {
			return RESPONSE_OK;
		},
		sessionOnOpen: function() {
			session.connected = true;
			session.connecting = false;
		},
		sessionOnClose: function() {
			session.connected = false;
			session.client = null;
		},
		isReconnecting: function() {
			return session.connecting;
		},
		startReconnect: function() {
			session.connecting = true;
		},
		checkSocketAlive: function() {
			return session.connected;
		},
		sendMsg: function(jsonStr) {
			session.client.send(jsonStr);
		},
		getSessionId: function() {
			return session.id;
		},
		setSessionId: function(id) {
			session.id = id;
		},
		saveSessionId: function(key) {
			window.localStorage[key + "sessionId"] = session.id;
		},
		loadSessionId: function(kye) {
			return loadSessionId();
		},
		removeSessionId: function(key) {
			window.localStorage.removeItem(key + "sessionId");
		},
		clearSessionId: function() {
			session.id = INVALIDATE_SESSIONID;
		},
		getInvalidateSessionId: function() {
			return INVALIDATE_SESSIONID;
		},
		getStorageKey: function() {
			return STORAGE_KEY;
		}
	};
})

.factory('StoreInfo', function() {
	var STORE_ID = 1;
	
	var storeInfo = {
		id: STORE_ID,
		name: 'CISCO',
		address: '上海市徐汇区宜山路926号新思大楼',
		tel: '13222085556'
	};
	return {
		getStoreInfo: function() {
			return storeInfo;
		},
		saveStoreInfo: function(key) {
			window.localStorage[key + "storeInfo"] = JSON.stringify(storeInfo);
		},
		loadStoreInfo: function(key) {
			var storeInfoStr = window.localStorage[key + "storeInfo"];
			if (storeInfoStr != null) {
				storeInfo = JSON.parse(storeInfoStr);
			}
			return storeInfo;
		},
		removeStoreInfo: function(key) {
			window.localStorage.removeItem(key + "storeInfo");
		},
	};
})

.factory('Employee', function() {
	
	var employeeTemplate = {
		sex: '男',
	    storeId: -1
	};
	
	var EMPLOYEES_EXPIRE_TIME = 5000;
	
	return {
		getEmployeeTemplate: function() {
			var newEmployee = JSON.parse(JSON.stringify(employeeTemplate));
			return newEmployee;
		},
		getEmptyEmployee: function() {
			var emptyTemplate = {
				sex: '男',
				storeId: '',
				name: '',
				tel: ''
			};
			return emptyTemplate;
		},
		clearEmployee: function(employee) {
			employee.storeId = -1;
			employee.name = '';
			employee.sex = '';
			employee.tel = '';
			employee.ID = '';
		},
		getEmployeeExpireTime: function() {
			return EMPLOYEES_EXPIRE_TIME;
		}
	};
})

.factory('User', function() {
	var userTemplate = {
		authType: '普通用户',
		userType: 'employee'
	};
	
	return {
		getUserTemplate: function() {
			var newUser = JSON.parse(JSON.stringify(userTemplate));
			return newUser;
		},
		clearUser: function(user) {
			user.name = '';
			user.authType = '普通用户';
			user.password = '';
			user.comfirmPassword = '';
		}
	}
})

.factory('DateUtil', function() {
	return {
		getTimestampFromDateStr: function(dateStr) {
			return new Date(dateStr).getTime();
		},
		getDateStrFromTimestamp: function(timestamp) {
			var date = new Date(timestamp);
			var year = date.getFullYear();
			var month = date.getUTCMonth();
			var day = date.getDate();
			return year + "/" + month + "/" + day;
		}
	}
})

.factory('Notification', function() {
	
	var notifications = [];
	
	return {
		getNotifications: function() {
			return notifications;
		},
		getNotificationsSize: function() {
			return notifications.length;
		},
		getNotificationByIndex: function(index) {
			return notifications[i];
		},
		removeNotification: function(notification) {
			notifications.splice(notifications.indexOf(notification), 1);
		},
		addNotification: function(notification) {
			notifications.push(notification);
		},
		isEmployeeSignNotify: function(notification) {
			if (notification.type != "UserSignVerify") {
				return false;
			}
			if (notification.userObject == null) {
				return false;
			}
			if (notification.userObject.sex == null) {
				return false;
			}
			else {
				return true;
			}
		},
		isStoreSignNotify: function(notification) {
			if (notification.type != "UserSignVerify") {
				return false;
			}
			if (notification.userObject == null) {
				return false;
			}
			if (notification.userObject.sex == null) {
				return true;
			}
			else {
				return false;
			}
		}
	}
})

.factory('UserInfo', function() {

	var userInfo = {};
	
	return {
		getUserInfo: function() {
			return userInfo;
		},
		cleanUserInfo: function() {
			userInfo = {};
		},
		setUserInfoUser: function(user) {
			userInfo.user = user;
		},
		setUserInfoStore: function(store) {
			userInfo.store = store;
		},
		setUserInfoEmployee: function(employee) {
			userInfo.employee = employee;
		},
		isUserLogin: function() {
			if (userInfo == null || userInfo.user == null) {
				return false;
			}
			else {
				return true;
			}
		},
		saveUserInfo: function(key) {
			window.localStorage[key + "userInfo"] = JSON.stringify(userInfo);
		},
		loadUserInfo: function(key) {
			var userInfoStr = window.localStorage[key + "userInfo"];
			if (userInfoStr != null) {
				userInfo = JSON.parse(userInfoStr);
			}
			return userInfo;
		},
		removeUserInfo: function(key) {
			window.localStorage.removeItem(key + "userInfo");
		},
		isAdminUser: function() {
			if (userInfo.user == null) {
				return false;
			}
			if (userInfo.user.authType == 'Admin') {
				return true;
			}
			else {
				return false;
			}
		},
		isNormalUser: function() {
			if (userInfo.user == null) {
				return false;
			}
			if (userInfo.user.authType == 'Normal') {
				return true;
			}
			else {
				return false;
			}
		}
	}

});