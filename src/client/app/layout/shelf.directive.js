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
      $scope.shell = $scope.$parent.shell
    },
    link:function(scope,element,attr){
      // var shell = scope.shell;

      var publisher = attr.publisher;
      var store = attr.store;
      shell.title = publisher;
      scope.loading = true;
      scope.itemsList = [];

      storeApi.getItems({publisher:publisher, status:'active', function: store}).then(function(series){
        console.log('series result', series.result);
        scope.itemsList = series.result;
        scope.loading = false;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });

      


    }
  }
}

// });