(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('AdminSeries', AdminSeries);

  AdminSeries.$inject = ['$scope', 'subscriptionApi'];

  function AdminSeries($scope, subscriptionApi) {
    var shell = $scope.shell;
    var series = this;
    var view =  $scope.view;
    series.user = view.user;

    console.log(series.user);

    series.list = [];
    $scope.loading =  true;

    subscriptionApi.getSubscriptions(series.user).then(function(result){
      series.list = result.results;
    },function(error){
      console.error(error);
    }).finally(function(){
      $scope.loading =  false;
    });



  }

})();