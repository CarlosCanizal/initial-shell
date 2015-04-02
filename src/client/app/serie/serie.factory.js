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
      getSubscription: getSubscription,
      changeStatus: changeStatus
    };

    return subscription;


    function getSubscriptions(user){
      if(!user)
        user = userApi.currentUser();
      
      var where = {"user":{"__type":"Pointer","className":"_User","objectId":user.objectId},"status":{"$ne":"canceled"}};
      return Subscription.query({
              where : where,
              include: 'serie',
              order : 'createdAt'
             }).$promise;
    }

    function getSubscription(objectId){
      return Subscription.get({
              objectId:objectId,
              include: 'serie'
             }).$promise;
    }

    function changeStatus(objectId, status){
      return Subscription.update({objectId:objectId,status:status}).$promise;
    }

  }
})();
