'use strict';

angular.module('app').component('profile', {
  controller: function ($scope, userService) {
    userService.getUserData()
      .success(function (data) {
        $scope.user = data;
        $scope.error = '';
      })
      .error(function (data) {
        $scope.user = {};
        $scope.error = data;
      });
  },
  templateUrl: 'profile.html'
});