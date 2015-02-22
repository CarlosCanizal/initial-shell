(function() {
  'use strict';

  angular
  .module('app.admin')
  .factory('productsApi', productsApi);

  productsApi.$inject = ['$resource','$q', 'parseheaders', 'parse',];

  /* @ngInject */
  function productsApi($resource, $q, parseheaders, parse) {

    var  Product  = parse.newParseResource(parseheaders.storeKeys, 'Product');

    var product = {
      getProducts: getProducts,
      getProduct: getProduct,
      saveProduct: saveProduct,
      deleteProduct: deleteProduct,
      getAvailables: getAvailables,
      getStatusList: getStatusList
    };

    return product;

    function getProducts(){
      return Product.query({
        order : 'createdAt'
      }).$promise;
    }

    function getProduct(productId){
      return Product.query({
        objectId: productId
      }).$promise;
    }

    function saveProduct(params){
      if(params.objectId)
        return Product.update(params).$promise;
      else
        return Product.save(params).$promise;
    }

    function deleteProduct(objectId){
      return Product.delete({objectId: objectId}).$promise;
    }

    function getAvailables(){
      return [{name:'preorder', label:'Preorden'},{name:'available', label:'Disponible'}];
    }

    function getStatusList(){
      return [{name:'active', label:'Active'},{name:'outOfStock', label:'Out of Stock'}];
    }

  }
})();
