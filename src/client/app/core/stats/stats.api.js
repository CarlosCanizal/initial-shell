(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('statsApi', statsApi);

  statsApi.$inject = ['$resource','$q', 'parseheaders', 'parse',];

  /* @ngInject */
  function statsApi($resource, $q, parseheaders, parse) {

    var  Stats  = parse.newParseResource(parseheaders.storeKeys, 'Stats');

    var stats = {
      getList: getList,
      save: save
    };

    return stats;

    function getList(assistent){
      return Stats.query({
        where:{assistent:assistent},
        order : 'createdAt'
      }).$promise;
    }

    function save(params){
      return Stats.save(params).$promise;
    }


  }
})();
