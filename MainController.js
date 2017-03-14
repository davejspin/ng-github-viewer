// Use the GitHub API. This has the following 3 features:
// 1. Available from JavaScript in a browser
// 2. Returns JSON
// 3. No authentication or client key required

// https://api.github.com/users/verekia

(function() {

  var app = angular.module("githubViewer");

  var MainController = function($scope, 
      $interval, 
      $location) {

    var decrementCountdown = function(){
      $scope.countdown -= 1;
      if($scope.countdown < 1){
        $scope.search($scope.username);
      }
    };
    
    var countdownInterval = null;
    var startCountdown = function(){
      countdownInterval = $interval(decrementCountdown, 1000, $scope.countdown);
    };

    $scope.search = function(username) {
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
      // Take us to the /user/:username route
      $location.path("/user/" + username);
    };

    $scope.imageSrc = "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png";
    $scope.username = "jwasham";
    $scope.countdown = 8;
    startCountdown();
  };

  app.controller("MainController", MainController);

}());