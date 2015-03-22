(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Store', Store);

  Store.$inject = ['$scope','$stateParams'];

  function Store($scope, $stateParams) {
    var shell =  $scope.shell;
    var store = this;
    if($stateParams.section){
      shell.initialSearch =  $stateParams.section;
    }
  }
})();
