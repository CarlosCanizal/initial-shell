// (function() {
//   'use strict';

angular
  .module('app.layout')
  .directive('shelf',shelf);

shelf.$inject = ['storeApi'];

function shelf(storeApi){
  return{
    restrict: 'EA',
    scope:{
      publisher : '@',
      store : '@'
    },
    templateUrl: 'app/layout/shelf.template.html',
    controller:function($scope){
      $scope.vm = {};
      $scope.vm.addToCart =  $scope.$parent.addToCart;
    },
    link:function(scope,element,attr){
      var publisher = attr.publisher;
      var store = attr.store;
      scope.vm.title = publisher;
      scope.loading = true;

      storeApi.getItems({publisher:publisher, status:'active', function: store}).then(function(series){
        console.log(series.result);
        scope.vm.itemsList = series.result;
        scope.loading = false;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });

      


    }
  }
}

// });