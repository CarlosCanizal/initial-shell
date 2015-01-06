(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .factory('orderApi', orderApi);

  orderApi.$inject = ['$resource','$q', 'parseheaders', 'parse','userApi'];

  /* @ngInject */
  function orderApi($resource, $q, parseheaders, parse, userApi) {

    var Order = parse.newParseResource(parseheaders.storeKeys,'Order');

    var order = {
      getOrders: getOrders
    };

    return order;

    function getOrders(){
      var user = userApi.currentUser();
      console.log(user.objectId);
      var where = {"user":{"__type":"Pointer","className":"_User","objectId":user.objectId}}
      return Order.query({
              where : where,
              order : 'createdAt'
             }).$promise;
      
    }

  }
})();
