(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('View', View);

  View.$inject = ['$scope','$stateParams','$state','userApi', 'user'];

  function View($scope,$stateParams, $state, userApi, user) {
    var shell = $scope.shell;
    var view = this;
    var userId = $stateParams.userId;
    view.user = user;
  }

})();