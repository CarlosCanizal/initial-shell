(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Products', Products);

  Products.$inject = ['$scope','productsApi'];

  function Products($scope, productsApi) {
    var shell = $scope.shell;
    var products = this;

    products.list = [];

    shell.showLoading();

    productsApi.getProducts().then(function(result){
      products.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    

  }

})();
