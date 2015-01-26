(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('couponApi', couponApi);

  couponApi.$inject = ['$resource', '$q', 'parseheaders', 'parse'];

  /* @ngInject */
  function couponApi($resource, $q, parseheaders, parse) {

    var  Coupon = parse.newCloudCodeResource(parseheaders.storeKeys);

    var factory = {
      redeemCode: redeemCode
    };

    return factory;

    function redeemCode(code){
      return Coupon.get({code:code,function:'redeemCode'}).$promise;
    }


  }
})();
