(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Product', Product);

  Product.$inject = ['$scope','$stateParams','productsApi','info'];

  function Product($scope, $stateParams, productsApi, info) {
    var shell = $scope.shell;
    var product = this;
    // var productId = $stateParams.productId;

    product.form = false;
    product.info = info;

    product.showForm = function(view){
      product.form = view;
    }

    product.updateProduct = function(info){
      product.info  = info;
    }

  }

})();
