(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Product', Product);

  Product.$inject = ['$scope','$stateParams','productsApi'];

  function Product($scope, $stateParams, productsApi) {
    var shell = $scope.shell;
    var product = this;
    var productId = $stateParams.productId;

    product.form = false;

    shell.showLoading();
    productsApi.getProduct(productId).then(function(result){
      product.info = result;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    product.showForm = function(view){
      product.form = view;
    }

    product.saveProduct = function(){
      shell.showLoading();
      productsApi.saveProduct(product.info).then(function(result){
        console.log(result);
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }
  }

})();
