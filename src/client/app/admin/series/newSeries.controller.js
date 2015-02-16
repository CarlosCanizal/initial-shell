(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('NewSerie', NewSerie);

  NewSerie.$inject = ['$scope','$stateParams','serieApi'];

  function NewSerie($scope, $stateParams, serieApi) {
    var shell = $scope.shell;
    var serie = this;

    serie.info = {};

  }

})();
