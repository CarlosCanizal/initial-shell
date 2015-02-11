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
    var  UserCloud  = parse.newCloudCodeResource(parseheaders.storeKeys);
    var  Address = parse.newParseResource(parseheaders.storeKeys,'Address');
    var  Membership = parse.newParseResource(parseheaders.storeKeys,'Membership');
    var  UserStats = parse.newParseResource(parseheaders.storeKeys,'UserStats');
    var  User = parse.newUserResource(parseheaders.storeKeys);

    var factory = {
      login: login,
      checkPassword: checkPassword,
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
      getAddress: getAddress,
      deleteAddress: deleteAddress,
      chargeCard: chargeCard,
      saveProfile: saveProfile,
      updatePassword: updatePassword,
      logMembership: logMembership,
      getAllUsers: getAllUsers,
      getUser: getUser,
      saveUserProfile: saveUserProfile
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

    function checkPassword(params){
      var deferred = $q.defer();
      Login.login(params).$promise.then(function(user){
        deferred.resolve(user);
      },function(error){
        deferred.reject(error);
      });
      return deferred.promise;
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

    function getUser(userId){
      return User.get({
        objectId : userId
      }).$promise;
    }

    function getAllUsers(params){
      var startDate, endDate, membership;
      var where = {};

      startDate = (params && params.startDate) ? new Date(params.startDate) : false;
      endDate = (params && params.endDate) ? new Date(params.endDate) : false;
      

      membership = (params && params.membership && params.membership != 'any') ? params.membership : false;
      if(startDate && endDate){
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
        endDate.setHours(24);
        endDate.setMinutes(0);
        endDate.setSeconds(0);
        where.createdAt = {"$gte":startDate,"$lte":endDate};
      }
      if(membership){
        where.user = {"$inQuery":{"where":{"membership":membership},"className":"_User"}};
      }

      return UserStats.query({
        where : where,
        include: 'user',
        order : 'createdAt'
      }).$promise;
    }

    function getAddress(addressId){
      return Address.get({objectId:addressId}).$promise;
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

    function saveUserProfile(params){
      return UserCloud.save({user:params,function:'saveProfile'}).$promise;
    }

    function updatePassword(user,oldPassword, newPassword){
      var  User  = setSessionToken();

      return this.checkPassword({username:user.username, password:oldPassword}).then(function(user){
        return User.update({objectId:user.objectId,password: newPassword}).$promise;        
      });
      
    }

    function setSessionToken(){
      var user = currentUser();
      var userHeaders = parseheaders.storeKeys;
      userHeaders['X-Parse-Session-Token'] = user.sessionToken;
      return parse.newUserResource(parseheaders.storeKeys);
    }

  }
})();