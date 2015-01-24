(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('userApi', userApi);

  userApi.$inject = ['$resource','$q', 'parseheaders', 'parse', 'storage', 'underscore'];

  /* @ngInject */
  function userApi($resource, $q, parseheaders, parse, storage, underscore) {

    var  Login = parse.newLoginResource(parseheaders.storeKeys);
    var  Register  = parse.newRegisterResource(parseheaders.storeKeys);
    var  Card  = parse.newCloudCodeResource(parseheaders.storeKeys);
    var  Address = parse.newParseResource(parseheaders.storeKeys,'Address');
    var  Membership = parse.newParseResource(parseheaders.storeKeys,'Membership');

    var factory = {
      login: login,
      currentUser: currentUser,
      getCurrentUser: getCurrentUser,
      setCurrentUser: setCurrentUser,
      addCard : addCard,
      logout: logout,
      register: register,
      getCards: getCards,
      deleteCard: deleteCard,
      saveAddress: saveAddress,
      getAddresses: getAddresses,
      deleteAddress: deleteAddress,
      chargeCard: chargeCard,
      saveProfile: saveProfile,
      logMembership: logMembership

    };

    return factory;

    function login(params) {
      var deferred = $q.defer();
      Login.login(params).$promise.then(function(user){
        storage.set('user',user);
        deferred.resolve(user);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise
    }

    function logMembership(params){
      params.user = {"__type":"Pointer",className:"_User","objectId":params.user}
      return Membership.save(params).$promise;
    }

    function register(params) {
      var deferred = $q.defer();
      Register.save(params).$promise.then(function(user){
        storage.set('user',user);
        deferred.resolve(user);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise
    }

    function logout(){
      return storage.remove('user');
    }

    function getCurrentUser(){
      var  User  = setSessionToken();
      return User.currentUser({objectId:'me'}).$promise;

    }

    function currentUser() {
      return storage.get('user');
    }

    function setCurrentUser(user){
      return storage.set('user', user);
    }

    function addCard(params){
      params['function'] = 'addCard';
      return Card.save(params).$promise;
    }

    function getCards(params){
      params['function'] = 'getCards';
      var deferred = $q.defer();
      Card.get(params).$promise.then(function(result){
        var cards = result.result;
        var result = underscore.map(cards,function(item){
          return {type:"card", card:item};
        });
        deferred.resolve(result);
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function deleteCard(params){
      var user = currentUser();
      params['function'] = 'deleteCard';
      params['user'] = user;
      return Card.delete(params).$promise
    }

    function saveAddress(params){
      var deferred = $q.defer();
      params.country = "Mexico";
      Address.save(params).$promise.then(function(object){
        return Address.get({objectId:object.objectId}).$promise
      }).then(function(address){
        deferred.resolve(address);
      },function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }

    function deleteAddress(objectId){
      return Address.delete({objectId: objectId}).$promise;
    }

    function getAddresses(userId){
      var where = {"user":{"__type":"Pointer","className":"_User","objectId":userId}}
      return Address.query({
        where : where,
        order : 'createdAt'
      }).$promise;
    }

    function chargeCard(order, user){ 
      var params = {
        order: order,
        user: user,
        function: 'chargeCard'
      }
      return Card.save(params).$promise;
    }

    function saveProfile(params){
      var  User  = setSessionToken();
      return User.update(params).$promise;
    }

    function setSessionToken(){
      var user = currentUser();
      var userHeaders = parseheaders.storeKeys;
      userHeaders['X-Parse-Session-Token'] = user.sessionToken;
      return parse.newUserResource(parseheaders.storeKeys);
    }

  }
})();