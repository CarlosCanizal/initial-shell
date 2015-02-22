(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Product', Product);

  Product.$inject = ['$scope','$state','$stateParams','productsApi','info'];

  function Product($scope, $state, $stateParams, productsApi, info) {
    var shell = $scope.shell;
    var product = this;
    // var productId = $stateParams.productId;

    product.form = false;
    product.info = info;
    product.availables = productsApi.getAvailables();
    product.statusList = productsApi.getStatusList();

    product.showForm = function(view){
      product.form = view;
    }

    product.updateProduct = function(info){
      product.info  = info;
    }

    $scope.deleteProduct = function(objectId, index){
      shell.showLoading()
      productsApi.deleteProduct(objectId).then(function(response){
        $state.go('admin.products');
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

  }

})();
