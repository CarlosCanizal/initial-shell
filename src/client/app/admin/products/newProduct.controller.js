(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('newProduct', newProduct);

  newProduct.$inject = ['$scope','$stateParams','productsApi'];

  function newProduct($scope, $stateParams, productsApi) {
    var shell = $scope.shell;
    var product = this;
    product.types = productsApi.getTypes();
    product.info = {type:product.types[0].name};


  }

})();
