//var adminurl = "http://localhost:1337/";
var adminurl = "http://104.197.23.70/";
//var adminurl = "http://192.168.2.22:1337/";
var adminlogin = {
    "username": "admin@admin.com",
    "password": "admin123"
};
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function ($http) {
    var navigation = [{
        name: "Dashboard",
        classis: "active",
        link: "#/home",
        subnav: []
    }];

    return {
        makeactive: function (menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },
        getnav: function () {
            return navigation;
        },
        adminLogin: function (data, callback) {
            $http({
                url: adminurl + "user/adminlogin",
                method: "POST",
                data: {
                    "email": data.email,
                    "password": data.password
                }
            }).success(callback);
        },
        countUser: function (callback) {
            $http.get(adminurl + "user/countusers").success(callback);
        },
        setUser: function (data) {
            $.jStorage.set("user", data);
        },
        getUser: function () {
            $.jStorage.get("user");
        },
	    //Add New Service
    }
});