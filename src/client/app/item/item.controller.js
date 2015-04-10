(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Item', Item);

  Item.$inject = ['$scope','info','$sce'];

  function Item($scope, info, $sce) {
    var shell = $scope.shell;
    var item = this;
    item.info = info;
    item.quantity = 1;

    item.info.description = $sce.trustAsHtml(item.info.description);
    if(item.info.release)
      item.info.release = moment(item.info.release).locale('es').format('LL');

    item.plusOne = function(){
      if(item.info.available == 'available'){
        if(item.quantity+1 <= item.info.stock){
          item.quantity +=1;
        }
      }
      else{
        item.quantity +=1;
      }
    };

    item.minusOne = function(){
      if(item.quantity > 1)
        item.quantity -=1;
    };
  }

})();
