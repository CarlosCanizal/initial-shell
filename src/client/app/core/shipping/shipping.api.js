(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('shippingApi', shippingApi);

  shippingApi.$inject = ['$resource','$q', 'parseheaders', 'parse',];

  /* @ngInject */
  function shippingApi($resource, $q, parseheaders, parse) {

    var  Shipping  = parse.newParseResource(parseheaders.storeKeys, 'Shipping');

    var shipping = {
      getList: getList
    };

    return shipping;

    function getList(){
      return Shipping.query({
        order : 'price'
      }).$promise;
    }

  }
})();
