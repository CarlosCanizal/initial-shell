(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('salesApi', salesApi);

  salesApi.$inject = ['$resource','$q', 'parseheaders', 'parse','Token'];

  /* @ngInject */
  function salesApi($resource, $q, parseheaders, parse,Token) {
    // var user =  Token.currentUser();
    // if(user)
      // parseheaders.storeKeys['X-Parse-Session-Token'] = user.sessionToken;

    var  Sale  = parse.newCloudCodeResource(parseheaders.storeKeys);

    var sale = {
      getSales: getSales
    };

    return sale;

    function getSales(params){
      // var user = userApi.currentUser();
      if(!params)
        var params = {};
      
      params['function'] = 'getSales';
      return Sale.save(params).$promise;
    }

  }
})();
