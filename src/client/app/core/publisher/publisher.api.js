(function() {
  'use strict';

  angular
  .module('app.admin')
  .factory('publisherApi', publisherApi);

  publisherApi.$inject = ['$resource','$q', 'parseheaders', 'parse',];

  /* @ngInject */
  function publisherApi($resource, $q, parseheaders, parse) {

    var  Publisher  = parse.newParseResource(parseheaders.storeKeys, 'Publisher');

    var publisher = {
      getPublishers: getPublishers,
      getPublisher: getPublisher,
      savePublisher: savePublisher
    };

    return publisher;

    function getPublishers(){
      return Publisher.query({
        order : 'createdAt'
      }).$promise;
    }

    function getPublisher(publisherId){
      return Publisher.get({
        objectId: publisherId
      }).$promise;
    }

    function savePublisher(params){
      if(params.objectId)
        return Publisher.update(params).$promise;
      else
        return Publisher.save(params).$promise;
        
    }

  }
})();
