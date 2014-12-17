(function() {
  'use strict';

  angular
  .module('app.storage')
  .factory('storage', storage);

  storage.$inject = ['localStorageService'];

  /* @ngInject */
  function storage(localStorageService) {

    return{
      set: set,
      get: get
    }

    function set(key, value){
      return localStorageService.set(key, value);
    }

    function get(key){
      return localStorageService.get(key);
    }

  }
})();
