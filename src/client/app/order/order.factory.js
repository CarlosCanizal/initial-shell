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
      getOrders: getOrders,
      getOrder: getOrder,
      getAllOrders: getAllOrders
    };

    return order;

    function getOrders(){
      var user = userApi.currentUser();
      var where = {"user":{"__type":"Pointer","className":"_User","objectId":user.objectId}}
      return Order.query({
              where : where,
              order : 'createdAt'
             }).$promise;
      
    }

    function getAllOrders(params){
      var user = userApi.currentUser();
      var startDate, endDate;
      var where = {};

      if(params && params.userId){
        startDate = false;
        endDate = false;
        where.user = {"__type":"Pointer","className":"_User","objectId":params.userId};
      }else{
        startDate =  new Date();
        endDate =  new Date();
      }

      startDate = (params && params.startDate) ? new Date(params.startDate) : startDate;
      endDate = (params && params.endDate) ? new Date(params.endDate) : endDate;
      
      if(startDate && endDate){
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        endDate.setHours(24);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
        where.createdAt ={"$gte":startDate,"$lte":endDate};
      }

      return Order.query({
              where : where,
              order : 'createdAt'
             }).$promise;
    }

    function getOrder(objectId){
      return Order.get({objectId:objectId}).$promise;
    }

  }
})();
