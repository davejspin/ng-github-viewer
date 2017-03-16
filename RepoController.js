
(function() {

  var app = angular.module("githubViewer");

  var RepoController = function($scope, 
      github,
      $routeParams) {

    var onRepoDetails = function(data) {
      $scope.repo = data;
      github.getContributors($scope.repo).then(onContributors, onError);
    };

    var onContributors = function(data) {
      $scope.contributors = data;
    };

    var onError = function(reason) {
      $scope.error = "Could not fetch the data";
    };

    $scope.username = $routeParams.username;
    $scope.reponame = $routeParams.reponame;
    github.getRepoDetails($scope.username, $scope.reponame).then(onRepoDetails, onError);
  };

  app.controller("RepoController", RepoController);

}());
