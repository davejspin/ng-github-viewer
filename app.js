(function() {

  var app = angular.module("githubViewer", ["ngRoute"]);

  app.config(function($routeProvider) {
    $routeProvider
      .when("/main", {
        templateUrl: "main.html",
        controller: "MainController"
      })
      .when("/user/:username", {
        templateUrl: "userdetails.html",
        controller: "UserController"
      })
      .otherwise({
        redirectTo: "/main"
      });

  });

}());
