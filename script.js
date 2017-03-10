// Code goes here

(function() {

  var app = angular.module("githubViewer", []);

  var MainController = function($scope, 
      github, 
      $interval, 
      $log, 
      $anchorScroll, 
      $location) {

    var onUserComplete = function(data) {
      $scope.user = data;
      github.getRepos($scope.user).then(onRepos, onError);
    };

    var onRepos = function(data) {
      $scope.repos = data;
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };
    
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
      $log.info("Searching for " + username);
      github.getUser(username).then(onUserComplete, onError);
      if (countdownInterval) {
        $interval.cancel(countdownInterval);
        $scope.countdown = null;
      }
    };

    // https://api.github.com/users/verekia

    $scope.imageSrc = "https://www.apple.com/ac/structured-data/images/knowledge_graph_logo.png";
    $scope.message = "GitHub Viewer";
    $scope.username = "jwasham";
    $scope.repoSortOrder = "-stargazers_count";
    $scope.countdown = 8;
    startCountdown();
  };

  app.controller("MainController", MainController);

}());