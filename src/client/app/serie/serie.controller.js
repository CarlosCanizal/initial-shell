(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Serie', Serie);

  Serie.$inject = ['$scope','$stateParams', 'subscriptionApi'];

  function Serie($scope, $stateParams, subscriptionApi) {
    var objectId = $stateParams.objectId;
    $scope.serie;
    $scope.loading = true;

    subscriptionApi.getSubscription(objectId).then(function(result){
      $scope.serie = result.serie;
    },function(error){
      console.log(error);
    }).finally(function(){
      $scope.loading = false;
    });

  }

})();
