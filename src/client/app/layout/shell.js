(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','serieApi'];

  function Shell($scope, serieApi){
    // jshint validthis: true 
    var vm = this;
    vm.searchValue= null;
    vm.results = [];

    vm.search = function(){
      serieApi.getSeries(vm.searchValue).then(function(series){
        console.log(series.result);
        vm.results = series.result;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }
  }

})();
