(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('Token', Token);

  Token.$inject = ['$resource','storage'];

  /* @ngInject */
  function Token($resource, storage) {
    var token = {
      currentUser: currentUser
    };

    return token;

    function currentUser() {
      return storage.get('user');
    }
  }
})();