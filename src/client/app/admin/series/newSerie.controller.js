(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('newSerie', newSerie);

  newSerie.$inject = ['$scope','$stateParams','serieApi'];

  function newSerie($scope, $stateParams, serieApi) {
    var shell = $scope.shell;
    var serie = this;

    serie.info = {};

  }

})();
