(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('couponApi', couponApi);

  couponApi.$inject = ['$resource', 'parseheaders', 'parse'];

  /* @ngInject */
  function couponApi($resource, parseheaders, parse) {

    var  Coupon = parse.newParseResource(parseheaders.storeKeys);

    var factory = {
      redeemCode: redeemCode
    };

    return factory;

    function redeemCode(code){
      alert(code);
    }


  }
})();
