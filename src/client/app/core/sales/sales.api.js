(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .factory('salesApi', salesApi);

  salesApi.$inject = ['$resource','$q', 'parseheaders', 'parse',];

  /* @ngInject */
  function salesApi($resource, $q, parseheaders, parse) {

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
