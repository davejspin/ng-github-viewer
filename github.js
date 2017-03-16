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

      var serviceUrl = apiUrl + "/repos/" + username + "/" + reponame;
      return $http.get(serviceUrl).then(function(response) {
        return response.data;
      });
      
    };

    var getContributors = function(repo) {
      return $http.get(repo.contributors_url).then(function(response) {
        return response.data;
      });
    };

    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails,
      getContributors: getContributors
    };

  };

  var module = angular.module("githubViewer");
  module.factory("github", github);
  
}());