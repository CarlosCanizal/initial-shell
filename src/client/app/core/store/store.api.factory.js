(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('storeApi', storeApi);

  storeApi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function storeApi($resource, parseheaders, parse) {

    var  Store = parse.newCloudCodeResource(parseheaders.storeKeys);
    var  Product = parse.newParseResource(parseheaders.storeKeys,'Product');

    var factory = {
      // getSeries: getSeries,
      // getProducts: getProducts,
      getItems: getItems,
      validateOrder: validateOrder,
      searchItems : searchItems
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

    function searchItems(searchValue){
      var tags = [];
      tags.push(searchValue);
      var values = searchValue.split(" ");

      angular.forEach(values,function(tag){
        if(tag != searchValue)
          tags.push(tag);
      });

      var where = {"tags":{"$all":tags}};
      return Product.query({where:where, limit:500}).$promise;
    }

    function getItems(params){
      return Store.query(params).$promise  
    }

    function validateOrder(items){ 
      var params ={items: items, function:'validateOrder'}
      return Store.query(params).$promise;
    }


  }
})();
