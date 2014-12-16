(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('userApi', userApi);

  userApi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function userApi($resource, parseheaders, parse) {

    var  Login = parse.newLoginResource(parseheaders.storeKeys);
    var  User  = parse.newUserResource(parseheaders.storeKeys);
    var  Card  = parse.newCloudCodeResource(parseheaders.storeKeys);

    var factory = {
      login: login,
      currentUser: currentUser,
      addCard : addCard
    };

    return factory;

    function login(params) {
      return Login.login(params).$promise;
    }

    function currentUser() {
      return User.currentUser().$promise;
    }

    function addCard(params){
      params['function'] = 'addCard';
      return Card.save(params).$promise;
    }

  }
})();