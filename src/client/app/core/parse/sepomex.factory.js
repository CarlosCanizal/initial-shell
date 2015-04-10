(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('sepomexAPI', sepomexAPI);

  sepomexAPI.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function sepomexAPI($resource, parseheaders, parse) {

    var sepomexAPI = parse.newSepomexResource(parseheaders.mxpostapi);

    var factory = {
      getDistricts: getDistricts,
      getMunicipalities: getMunicipalities,
      getStates: getStates,
      getDistrict: getDistrict,
      getZip: getZip
    };

    return factory;

    function getDistricts(state, municipality) {
      return sepomexAPI.query({
        class: 'Districts',
        where: {
          state: state,
          municipality: municipality
        },
        limit: '1000',
        order: 'name'
      }).$promise;
    }

    function getMunicipalities(state) {
      return sepomexAPI.query({
        class: 'Municipalities',
        where: {
          state: state 
        },
        limit: '1000',
        order: 'name'
      }).$promise;
    }

    function getStates() {
      return sepomexAPI.query({
        class: 'States',
        order: 'name'
      }).$promise;
    }

    function getDistrict(zip) {
      return sepomexAPI.query({
        class: 'Districts',
        where: {
          zip: zip 
        }
      }).$promise;
    }

    function getZip(name, municipality,state) {
      return sepomexAPI.query({
        class: 'Districts',
        where: {
          name: name,
          municipality: municipality,
          state: state
        }
      }).$promise;
    }
  }
})();
