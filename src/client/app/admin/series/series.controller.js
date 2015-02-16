(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Series', Series);

  Series.$inject = ['$scope','serieApi'];

  function Series($scope, serieApi) {
    var shell = $scope.shell;
    var series = this;

    series.list = [];

    shell.showLoading();

    serieApi.getSeries().then(function(result){
      series.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    

  }

})();
