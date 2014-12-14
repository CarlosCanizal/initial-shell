(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','serieApi'];

  function Shell($scope, serieApi){
    // jshint validthis: true 
    var vm = this;

    serieApi.getSeries('Marvel Comics').then(function(states){
      console.log(states);
    },function(error){
      console.error(error.data.error);
    });


  }

})();
