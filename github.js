(function() {

  var github = function($http) {

    var getUser = function(username) {

      var apiUrl = "https://api.github.com/users/" + username;
      return $http.get(apiUrl).then(function(response) {
        return response.data;
      });

    };

    var getRepos = function(user) {
      return $http.get(user.repos_url).then(function(response) {
        return response.data;
      });
    };

    return {
      getUser: getUser,
      getRepos: getRepos
    };

  };

  var module = angular.module("githubViewer");
  module.factory("github", github);
  
}());