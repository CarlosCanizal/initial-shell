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
      store : '@',
      stock: '@'
    },
    templateUrl: 'app/layout/shelf.template.html',
    controller:function($scope){
      $scope.shell = $scope.$parent.shell;
    },
    link:function(scope,element,attr){
      var shell = scope.shell;
      var store = attr.store;
      var stock = attr.stock;

      scope.$watch('publisher', function(newValue, oldValue) {
        var publisher = newValue;
        scope.title = publisher;
        if(store == "Search"){
          scope.title = (publisher=="recomendados" || publisher == "ya disponibles") ? publisher : "resultados: "+publisher;
          // scope.itemsList = shell.itemsList;
          shell.showLoading();
          storeApi.searchItems(publisher.toLowerCase()).then(function(result){
            var items = result.results;
            scope.itemsList = items;
            shell.itemsList = items;
          },function(error){
            shell.setError(error);
          }).finally(shell.hideLoading);

        }else{
          scope.loading = true;
          scope.itemsList = [];
          // var params = {status:'active', minStock: 1 , function: store}
          var params = {status:'active' , function: store}
          if(publisher)
            params.publisher = publisher;
          if(stock){
            params.available = 'available';
            params.minStock = 1;
          }
          storeApi.getItems(params).then(function(series){
            scope.itemsList = series.result;
          },function(error){
            shell.setError(error);
          }).finally(function(){
            scope.loading = false;
          });
        }
      });
    }
  };
}

// });