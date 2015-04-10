(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('systemApi', systemApi);

  systemApi.$inject = ['$resource','$q', 'parseheaders', 'parse','Token'];

  /* @ngInject */
  function systemApi($resource,$q, parseheaders, parse, Token) {
    var  System = parse.newParseResource(parseheaders.storeKeys,'System');

    var system = {
      membership: membership
    };

    return system;

    function membership(){
      var deferred = $q.defer();
      System.query().$promise.then(function(result){
        if(result.results && result.results[0]){
          deferred.resolve(result.results[0].membership);
        }else{
          deferred.resolve(false);
        }
      },function(error){
        deferred.reject(error);
      });
      return deferred.promise;
    }

  }
})();