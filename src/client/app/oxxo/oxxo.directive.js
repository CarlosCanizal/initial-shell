// (function() {
//   'use strict';

angular
  .module('app.layout')
  .directive('oxxoCode',oxxoCode);

oxxoCode.$inject = ['storeApi'];

function oxxoCode(storeApi){
  return{
    restrict: 'EA',
    scope:{
      barcode : '@',
      barcodeUrl : '@',
      expiration: '@',
      status:'@'
    },
    templateUrl: 'app/oxxo/oxxo.template.html',
    controller:function($scope){
      $scope.shell = $scope.$parent.shell;
    },
    link:function(scope,element,attr){
      var expiration = parseInt(attr.expiration);
      var today = moment().subtract(shell.offset,'hours').add(1,'days').startOf('day').unix();
      if(today > expiration){
        scope.expirationDate = false;
        return;
      }
      var expirationDate = new Date(expiration * 1000);
      scope.expirationDate = moment(expirationDate).locale('es').format('LL');
    }
  };
}

// });