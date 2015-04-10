(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('couponApi', couponApi);

  couponApi.$inject = ['$resource', '$q', 'parseheaders', 'parse', 'Token'];

  /* @ngInject */
  function couponApi($resource, $q, parseheaders, parse, Token) {

    // var user =  Token.currentUser();
    // if(user)
    //   parseheaders.storeKeys['X-Parse-Session-Token'] = user.sessionToken;

    var  Coupon = parse.newCloudCodeResource(parseheaders.storeKeys);

    var factory = {
      redeemCode: redeemCode
    };

    return factory;

    function redeemCode(code, user){
      return Coupon.get({code:code, user:user,function:'redeemCode'}).$promise;
    }


  }
})();
