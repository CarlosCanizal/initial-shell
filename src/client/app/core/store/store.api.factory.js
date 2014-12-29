(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('storeApi', storeApi);

  storeApi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function storeApi($resource, parseheaders, parse) {

    var  Store = parse.newCloudCodeResource(parseheaders.storeKeys);

    var factory = {
      // getSeries: getSeries,
      // getProducts: getProducts,
      getItems: getItems,
      validateOrder: validateOrder
    };

    return factory;

    // function getSeries(params) {
    //   params['function'] = 'Serie';
    //   return Store.query(params).$promise
    // }

    // function getProducts(params){
    //   params['function'] = 'Product';
    //   console.log(params);
    //   return Store.query(params).$promise 
    // }

    function getItems(params){
      console.log(params);
      return Store.query(params).$promise  
    }

    function validateOrder(items){ 
      var params ={items: items, function:'validateOrder'}
      return Store.query(params).$promise;
    }


  }
})();
