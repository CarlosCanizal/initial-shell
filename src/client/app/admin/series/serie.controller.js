(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Serie', Serie);

  Serie.$inject = ['$scope','$stateParams','serieApi','info'];

  function Serie($scope, $stateParams, serieApi, info) {
    var shell = $scope.shell;
    var serie = this;
    // var productId = $stateParams.productId;

    serie.form = false;
    serie.info = info;

    serie.showForm = function(view){
      serie.form = view;
    }

    serie.updateSerie= function(info){
      serie.info  = info;
    }

  }

})();
