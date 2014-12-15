(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','serieApi'];

  function Shell($scope, serieApi){
    // jshint validthis: true 
    var vm = this;
    vm.searchValue = null;
    vm.itemsList = [];
    vm.title = 'Resultados';

    vm.searchByName = function(){
      var params = {
        name: vm.searchValue
      }
      serieApi.getSeries(params).then(function(series){
        console.log(series.result);
        vm.itemsList = series.result;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.suscribe = function(){
      alert('suscribe');
    }
  }

})();
