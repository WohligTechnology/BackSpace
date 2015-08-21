// JavaScript Document
var firstapp = angular.module('firstapp', [
  'ngRoute',
  'phonecatControllers',
  'templateservicemod',
    'navigationservice'
]);

firstapp.config(
    function ($routeProvider, uiSelectConfig) {

        //        uiSelectConfig.theme = 'bootstrap';
        //        uiSelectConfig.resetSearchInput = true;
        //        uiSelectConfig.appendToBody = true;


        $routeProvider.
        when('/login', {
            templateUrl: 'views/template.html',
            controller: 'login'
        }).
        when('/home', {
            templateUrl: 'views/template.html',
            controller: 'home'
        }).
	   //Add New Path
	   
        otherwise({
            redirectTo: '/login'
        });
    });
firstapp.filter('uploadpath', function () {
    return function (input) {
        return adminurl + "user/resize?file=" + input;
    };
});
firstapp.directive('capitalizeFirst', function ($parse) {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var capitalize = function (inputValue) {
                if (inputValue === undefined) {
                    inputValue = '';
                }
                var capitalized = inputValue.charAt(0).toUpperCase() +
                    inputValue.substring(1);
                if (capitalized !== inputValue) {
                    modelCtrl.$setViewValue(capitalized);
                    modelCtrl.$render();
                }
                return capitalized;
            }
            modelCtrl.$parsers.push(capitalize);
            capitalize($parse(attrs.ngModel)(scope)); // capitalize initial value
        }
    };
});
firstapp.filter('touppercase', function () {
    return function (input) {
        var firstletter = input.substr(0, 1);
        var remaining = input.substr(1);
        return firstletter.toUpperCase() + remaining;
    };
});