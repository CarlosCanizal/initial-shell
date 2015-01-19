(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Serie', Serie);

  Serie.$inject = ['$scope','$stateParams', 'subscriptionApi'];

  function Serie($scope, $stateParams, subscriptionApi) {
    var objectId = $stateParams.objectId;
    $scope.serie;
    $scope.subscription;
    $scope.loading = true;

    subscriptionApi.getSubscription(objectId).then(function(subscription){
      $scope.subscription = subscription;
      $scope.serie = subscription.serie;
    },function(error){
      console.log(error);
    }).finally(function(){
      $scope.loading = false;
    });

    $scope.changeStatus= function(status){
      subscriptionApi.changeStatus(objectId, status).then(function(result){
        console.log(result);
        $scope.subscription.status = result.status;
      },function(error){
        console.log(error);
      });
    }

  }

})();
