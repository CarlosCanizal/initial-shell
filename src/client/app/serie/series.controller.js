(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Series', Series);

  Series.$inject = ['$scope', 'subscriptionApi'];

  function Series($scope, subscriptionApi) {

    $scope.series = [];
    $scope.loading =  true;

    subscriptionApi.getSubscriptions().then(function(result){
      $scope.series = result.results;
      $scope.loading =  false;
    },function(error){
      console.error(error);
    });



  }

})();