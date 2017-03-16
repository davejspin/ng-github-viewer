(function() {

  var github = function($http) {

    var apiUrl = "https://api.github.com";

    var getUser = function(username) {

      var serviceUrl = apiUrl + "/users/" + username;
      return $http.get(serviceUrl).then(function(response) {
        return response.data;
      });

    };

    var getRepos = function(user) {
      return $http.get(user.repos_url).then(function(response) {
        return response.data;
      });
    };

    var getRepoDetails = function(username, reponame) {
      var repo;
      var serviceUrl = apiUrl + "/repos/" + username + "/" + reponame;
      return $http.get(serviceUrl)
        .then(function(response) {
          repo = response.data;
          return $http.get(serviceUrl + "/contributors");
        })
        .then(function(response) {
          repo.contributors = response.data;
          return repo;
        });
    };

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };

  };

  var module = angular.module("githubViewer");
  module.factory("github", github);

}());