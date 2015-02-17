(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Serie', Serie);

  Serie.$inject = ['$scope', '$state','$stateParams','serieApi','info'];

  function Serie($scope, $state, $stateParams, serieApi, info) {
    var shell = $scope.shell;
    var serie = this;
    
    serie.statusList = serieApi.getStatusList();
    serie.form = false;
    serie.info = info;

    serie.showForm = function(view){
      serie.form = view;
    }

    serie.updateSerie= function(info){
      serie.info  = info;
    }

    $scope.deleteSerie = function(objectId){
      shell.showLoading();
      serieApi.deleteSerie(objectId).then(function(response){
        $state.go('admin.series');
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

  }

})();
