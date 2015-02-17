(function() {
  'use strict';

  angular
  .module('app.admin')
  .factory('serieApi', serieApi);

  serieApi.$inject = ['$resource','$q', 'parseheaders', 'parse',];

  /* @ngInject */
  function serieApi($resource, $q, parseheaders, parse) {

    var  Serie  = parse.newParseResource(parseheaders.storeKeys, 'Serie');

    var serie = {
      getSeries: getSeries,
      getSerie: getSerie,
      saveSerie: saveSerie,
      deleteSerie: deleteSerie
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

  }
})();
