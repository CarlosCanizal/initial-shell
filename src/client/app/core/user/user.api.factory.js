(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('userApi', userApi);

  userApi.$inject = ['$resource','$q', 'parseheaders', 'parse', 'storage'];

  /* @ngInject */
  function userApi($resource, $q, parseheaders, parse, storage) {

    var  Login = parse.newLoginResource(parseheaders.storeKeys);
    var  User  = parse.newUserResource(parseheaders.storeKeys);
    var  Card  = parse.newCloudCodeResource(parseheaders.storeKeys);

    var factory = {
      login: login,
      currentUser: currentUser,
      addCard : addCard,
      logout: logout,
      getCards: getCards,
      deleteCard: deleteCard

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

    function logout(){
      return storage.remove('user');
    }

    function currentUser() {
      return storage.get('user');
    }

    function addCard(params){
      params['function'] = 'addCard';
      return Card.save(params).$promise;
    }

    function getCards(params){
      params['function'] = 'getCards';
      return Card.get(params).$promise
    }

    function deleteCard(params){
      params['function'] = 'deleteCard';
      return Card.delete(params).$promise
    }

  }
})();