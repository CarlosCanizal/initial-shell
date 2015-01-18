(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .factory('subscriptionApi', subscriptionApi);

  subscriptionApi.$inject = ['$resource','$q', 'parseheaders', 'parse','userApi'];

  /* @ngInject */
  function subscriptionApi($resource, $q, parseheaders, parse, userApi) {

    var Subscription = parse.newParseResource(parseheaders.storeKeys,'Subscription');

    var subscription = {
      getSubscriptions: getSubscriptions,
      getSubscription: getSubscription
    };

    return subscription;

    function getSubscriptions(){
      var user = userApi.currentUser();
      console.log(user.objectId);
      var where = {"user":{"__type":"Pointer","className":"_User","objectId":user.objectId}}
      return Subscription.query({
              where : where,
              include: 'serie',
              order : 'createdAt'
             }).$promise;
      
    }

    function getSubscription(objectId){
      return Subscription.get({objectId:objectId}).$promise;
    }

  }
})();
