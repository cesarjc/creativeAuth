'use strict';

angular.module('app').factory('userService', function ($http) {
  return {
    getUserData: function () {
      return $http.get('/users/user/profile');
    }
  };
});