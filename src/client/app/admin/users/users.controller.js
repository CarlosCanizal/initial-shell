(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Users', Users);

  Users.$inject = ['$scope','salesApi'];

  function Users($scope, salesApi) {
    var shell = $scope.shell;
    var users =  this;

  }

})();
