(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('UserProfile', UserProfile);

  UserProfile.$inject = ['$scope','userApi', 'orderApi'];

  function UserProfile($scope, userApi, orderApi) {
    var shell = $scope.shell;
    var view = $scope.view;
    var profile =  this;
    profile.user = view.user;

  }

})();
