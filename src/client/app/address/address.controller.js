(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Address', Address);

  Address.$inject = ['$scope'];

  function Address($scope) {
    console.log('address controller');
  }


})();
