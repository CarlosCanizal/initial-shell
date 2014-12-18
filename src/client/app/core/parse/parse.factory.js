(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('parse', parse);

  parse.$inject = ['$resource'];

  /* @ngInject */
  function parse($resource) {

    var factory = {
      newParseResource: newParseResource,
      newCloudCodeResource: newCloudCodeResource,
      newLoginResource: newLoginResource,
      newUserResource: newUserResource
    };

    return factory;

    function newLoginResource(headers) {
      return $resource(
        'https://api.parse.com/1/login',
        {
        },
        { 
          'login':    {method:'GET', headers: headers}
        }
      );
    }

    function newUserResource(headers) {
      return $resource(
        'https://api.parse.com/1/users/me',
        {
        },
        { 
          'currentUser':    {method:'GET', headers: headers}
        }
      );
    }

    function newParseResource(headers) {
      return $resource(
        'https://api.parse.com/1/classes/:class/:objectId',
        {
          objectId: '@objectId' 
        },
        { 
          'get':    {method:'GET', headers: headers},
          'save':   {method:'POST', headers: headers},
          'edit':   {method:'PUT', headers: headers},
          'query':  {method:'GET', headers: headers},
          'remove': {method:'DELETE', headers: headers},
          'delete': {method:'DELETE', headers: headers} 
        }
      );
    }

    function newCloudCodeResource(headers){
      return $resource(
        'https://api.parse.com/1/functions/:function',
        {
          function: '@function'
        },
        {
          'query': {method: 'POST', headers:headers},
          'save' : {method: 'POST', headers:headers},
          'get'  : {method: 'POST', headers:headers},
          'delete'  : {method: 'POST', headers:headers},
        }
      );
    }
  }
})();