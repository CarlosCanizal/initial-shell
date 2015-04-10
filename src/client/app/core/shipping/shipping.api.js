(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('shippingApi', shippingApi);

  shippingApi.$inject = ['$resource','$q', 'parseheaders', 'parse','Token'];

  /* @ngInject */
  function shippingApi($resource, $q, parseheaders, parse, Token) {

    // var user =  Token.currentUser();
    // if(user)
    //   parseheaders.storeKeys['X-Parse-Session-Token'] = user.sessionToken;


    var  Shipping  = parse.newParseResource(parseheaders.storeKeys, 'Shipping');

    var shipping = {
      getList: getList
    };

    return shipping;

    function getList(){
      return Shipping.query({
        order : 'price'
      }).$promise;
    }

  }
})();
