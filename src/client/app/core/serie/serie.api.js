(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('serieApi', serieApi);

  serieApi.$inject = ['$resource','$q', 'parseheaders', 'parse','Token'];

  /* @ngInject */
  function serieApi($resource, $q, parseheaders, parse, Token) {

    //var user =  Token.currentUser();
    //if(user)
      //parseheaders.storeKeys['X-Parse-Session-Token'] = user.sessionToken;

    var  Serie  = parse.newParseResource(parseheaders.storeKeys, 'Serie');

    var serie = {
      getSeries: getSeries,
      getSerie: getSerie,
      saveSerie: saveSerie,
      deleteSerie: deleteSerie,
      getStatusList: getStatusList
    };

    return serie;

    function getSeries(){
      return Serie.query({
        order : 'createdAt'
      }).$promise;
    }

    function getSerie(serieId){
      return Serie.get({
        objectId: serieId
      }).$promise;
    }

    function saveSerie(params){
      if(params.objectId)
        return Serie.update(params).$promise;
      else
        return Serie.save(params).$promise;
    }

    function deleteSerie(objectId){
      return Serie.delete({objectId: objectId}).$promise;
    }

    function getStatusList(){
      return [{name:'active', label:'Active'},{name:'inactive',label:'Inactive'}];
    }

  }
})();
