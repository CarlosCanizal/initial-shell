(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('conekta', conekta);

  conekta.$inject = ['userApi','$q', 'parse','parseheaders'];

  /* @ngInject */
  function conekta(userApi, $q, parse, parseheaders) {
    // development
    // var conketaPublicKey = "key_LDjQwU7xkazYxSRSoW7XWfQ";
    // production
    var conketaPublicKey = "key_RqR27tszgbcFyAV3sBy53sA";
    var  conektaResource  = parse.newCloudCodeResource(parseheaders.storeKeys);

    return conekta = {
      saveCard : saveCard,
      deleteCard : deleteCard,
      updateMembership: updateMembership,
      subcribe: subscribe,
      unsubscribe: unsubscribe,
      subscriptionCard: subscriptionCard
    }

    function updateMembership(membership, payment, user){
      return subscribe(membership.id, payment.card.id, user).then(function(){
        return userApi.logMembership({user: user.objectId, status:'active', notes:payment});
      }).then(function(){
        return userApi.saveUserProfile({objectId: user.objectId, membership: membership.name , upgrade:'upgraded',subscriptionCard:payment});
      });
      
    }

    function subscribe(plan, card, user){
      var params = {user: user,plan: plan, card: card, "function":"subscribe"}
      return conektaResource.save(params).$promise;
    }

    function unsubscribe(card, plan, message, user){

      if(!user)
        user = userApi.currentUser();

      console.log(user.objectId);

      var params = {user:user, plan: plan, "function":"unsubscribe"}
      return conektaResource.save(params).$promise.then(function(){
        return userApi.logMembership({user: user.objectId, status:'cancelled',notes:{message:message}});
      }).then(function(){
        return userApi.saveUserProfile({objectId: user.objectId, membership: 'basic', upgrade:'cancelled'});
      });
    }

    function subscriptionCard(payment, user){
      var params = { user:user, card:payment.card.id, "function":"subscriptionCard"}
      return conektaResource.save(params).$promise.then(function(){
        return userApi.logMembership({user: user.objectId, status:'updateCard', notes:payment});
      }).then(function(){
        return userApi.saveUserProfile({objectId: user.objectId, subscriptionCard:payment});
      });
    }

    function deleteCard(conektaId, cardId){
      return userApi.deleteCard({conektaId:conektaId,cardId:cardId});
    }

    function saveCard(conektaId, card){
      var deferred = $q.defer();
      Conekta.setPublishableKey(conketaPublicKey);
      var errorResponseHandler,
          successResponseHandler,
          tokenParams;

      tokenParams = {card:card};

      successResponseHandler = function(token) {
        
        userApi.addCard({conektaId:conektaId, token:token.id}).then(function(result){
          deferred.resolve(result.result);
        },function(error){
          deferred.reject(error);
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      };

      errorResponseHandler = function(error) {
        deferred.reject(error)
      };
      Conekta.token.create(tokenParams, successResponseHandler, errorResponseHandler);
      return deferred.promise;

    }

  }
})();
