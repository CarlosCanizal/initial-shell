(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Serie', Serie);

  Serie.$inject = ['$scope','$stateParams', 'subscriptionApi'];

  function Serie($scope, $stateParams, subscriptionApi) {
    var shell =  $scope.shell;
    var serie = this;

    var objectId = $stateParams.objectId;
    serie.subscription;
    $scope.loading = true;

    subscriptionApi.getSubscription(objectId).then(function(subscription){
      serie.subscription = subscription;
      serie.info = subscription.serie;
    },function(error){
      console.log(error);
    }).finally(function(){
      $scope.loading = false;
    });

    serie.changeStatus= function(status){
      subscriptionApi.changeStatus(objectId, status).then(function(result){
        console.log(result);
        serie.subscription.status = result.status;
      },function(error){
        console.log(error);
      });
    }

  }

})();
