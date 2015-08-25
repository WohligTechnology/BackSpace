var uploadres = [];
var selectedData = [];
var abc = {};
var phonecatControllers = angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ngDialog', 'angularFileUpload', 'ui.select', 'ngSanitize']);
window.uploadUrl = 'http://104.197.23.70/user/uploadfile';
//window.uploadUrl = 'http://192.168.2.22:1337/user/uploadfile';
//window.uploadUrl = 'http://localhost:1337/user/uploadfile';
phonecatControllers.controller('home', function($scope, TemplateService, NavigationService, $routeParams, $location) {
  $scope.template = TemplateService;
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  TemplateService.submenu = "";
  TemplateService.content = "views/dashboard.html";
  TemplateService.list = 1;
  $scope.navigation = NavigationService.getnav();
  //  NavigationService.countUser(function(data, status) {
  //    $scope.user = data;
  //  });
});
phonecatControllers.controller('login', function($scope, TemplateService, NavigationService, $routeParams, $location) {
  $scope.template = TemplateService;
  TemplateService.content = "views/login.html";
  TemplateService.list = 3;

  $scope.navigation = NavigationService.getnav();
  $.jStorage.flush();
  $scope.isValidLogin = 1;
  $scope.login = {};
  $scope.verifylogin = function() {
    console.log($scope.login);
    if ($scope.login.email && $scope.login.password) {
      NavigationService.adminLogin($scope.login, function(data, status) {
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
phonecatControllers.controller('headerctrl', function($scope, TemplateService, $location, $routeParams, NavigationService) {
  $scope.template = TemplateService;
  //  if (!$.jStorage.get("adminuser")) {
  //    $location.url("/login");
  //
  //  }
});

phonecatControllers.controller('createorder', function($scope, TemplateService, NavigationService, ngDialog, $routeParams, $location) {
  $scope.template = TemplateService;
  $scope.menutitle = NavigationService.makeactive("Orders");
  TemplateService.title = $scope.menutitle;
  TemplateService.list = 2;
  TemplateService.content = "views/createorder.html";
  $scope.navigation = NavigationService.getnav();
  console.log($routeParams.id);

  $scope.order = {};

  $scope.submitForm = function() {
    console.log($scope.order);
    NavigationService.saveOrder($scope.order, function(data, status) {
      console.log(data);
      $location.url("/order");
    });
  };


  $scope.order.tag = [];
  $scope.ismatch = function(data, select) {
    abc.select = select;
    _.each(data, function(n, key) {
      if (typeof n == 'string') {
        var item = {
          _id: _.now(),
          name: _.capitalize(n),
          category: $scope.artwork.type
        };
        NavigationService.saveTag(item, function(data, status) {
          if (data.value == true) {
            item._id = data.id;
          }
        });
        select.selected = _.without(select.selected, n);
        select.selected.push(item);
        $scope.order.tag = select.selected;
      }
    });
    console.log($scope.artwork.tag);
  }


  $scope.refreshOrder = function(search) {
    $scope.tag = [];
    if (search) {
      NavigationService.findArtMedium(search, $scope.order.tag, function(data, status) {
        $scope.tag = data;
      });
    }
  };

  $scope.GalleryStructure = [{
    "name": "name",
    "type": "text",
    "validation": [
      "required",
      "minlength",
      "min=5"
    ]
  }, {
    "name": "image",
    "type": "image"
  }, {
    "name": "name",
    "type": "text",
    "validation": [
      "required",
      "minlength",
      "min=5"
    ]
  }];

  $scope.persons = [{
    "id": 1,
    "name": "first option"
  }, {
    "id": 2,
    "name": "first option"
  }, {
    "id": 3,
    "name": "first option"
  }, {
    "id": 4,
    "name": "first option"
  }, {
    "id": 5,
    "name": "first option"
  }];

  NavigationService.getUser(function(data, status) {
    $scope.persons = data;
  });

});




 //Add New Controller