(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('serieApi', serieApi);

  serieApi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function serieApi($resource, parseheaders, parse) {

    var  Serie = parse.newCloudCodeResource(parseheaders.storeKeys);

    var factory = {
      getSeries: getSeries
    };

    return factory;

    function getSeries(searchValue) {
      return Serie.query({
        function: 'Serie',
        name:searchValue
      }).$promise
    }

  }
})();
