(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('statsApi', statsApi);

  statsApi.$inject = ['$resource','$q', 'parseheaders', 'parse','Token'];

  /* @ngInject */
  function statsApi($resource, $q, parseheaders, parse, Token) {
    //var user =  Token.currentUser();
    //if(user)
      //parseheaders.storeKeys['X-Parse-Session-Token'] = user.sessionToken;

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
