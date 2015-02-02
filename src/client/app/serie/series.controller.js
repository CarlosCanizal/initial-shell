(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Series', Series);

  Series.$inject = ['$scope', 'subscriptionApi'];

  function Series($scope, subscriptionApi) {
    var shell = $scope.shell;
    var series = this;
   
    series.list = [];
    $scope.loading =  true;

    subscriptionApi.getSubscriptions().then(function(result){
      series.list = result.results;
    },function(error){
      console.error(error);
    }).finally(function(){
      $scope.loading =  false;
    });



  }

})();