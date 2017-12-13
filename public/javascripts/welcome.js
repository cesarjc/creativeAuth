'use strict';

angular.module('app').component('welcome', {
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
  templateUrl: 'welcome.html'
});