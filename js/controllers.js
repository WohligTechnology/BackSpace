var uploadres = [];
var selectedData = [];
var abc = {};
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog', 'angularFileUpload', 'ui.select', 'ngSanitize']);
window.uploadUrl = 'http://104.197.23.70/user/uploadfile';
//window.uploadUrl = 'http://192.168.2.22:1337/user/uploadfile';
//window.uploadUrl = 'http://localhost:1337/user/uploadfile';
phonecatControllers.controller('home', function ($scope, TemplateService, NavigationService, $routeParams, $location) {
    $scope.template = TemplateService;
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    TemplateService.submenu = "";
    TemplateService.content = "views/dashboard.html";
    TemplateService.list = 1;
    $scope.navigation = NavigationService.getnav();
    NavigationService.countUser(function (data, status) {
        $scope.user = data;
    });
});
phonecatControllers.controller('login', function ($scope, TemplateService, NavigationService, $routeParams, $location) {
    $scope.template = TemplateService;
    TemplateService.content = "views/login.html";
    TemplateService.list = 3;

    $scope.navigation = NavigationService.getnav();
    $.jStorage.flush();
    $scope.isValidLogin = 1;
    $scope.login = {};
    $scope.verifylogin = function () {
        console.log($scope.login);
        if ($scope.login.email && $scope.login.password) {
            NavigationService.adminLogin($scope.login, function (data, status) {
                if (data.value == "false") {
                    $scope.isValidLogin = 0;
                } else {
                    $scope.isValidLogin = 1;
                    $.jStorage.set("adminuser", data);
                    $location.url("/home");
                }
            })
        } else {
            console.log("blank login");
            $scope.isValidLogin = 0;
        }

    }
});
phonecatControllers.controller('headerctrl', function ($scope, TemplateService, $location) {
    $scope.template = TemplateService;
    if (!$.jStorage.get("adminuser")) {
        $location.url("/login");
	    
    }
});