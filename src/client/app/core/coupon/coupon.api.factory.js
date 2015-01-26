(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('couponApi', couponApi);

  couponApi.$inject = ['$resource', '$q', 'parseheaders', 'parse'];

  /* @ngInject */
  function couponApi($resource, $q, parseheaders, parse) {

    var  Coupon = parse.newParseResource(parseheaders.storeKeys,'Coupon');

    var factory = {
      redeemCode: redeemCode
    };

    return factory;

    function redeemCode(code){
      var deferred = $q.defer();
      var where = {"code":code}
      Coupon.get({
        where : where
      }).$promise.then(function(result){
        var coupon = result.results;
        if(coupon.length > 0){
          deferred.resolve(coupon[0]);
        }else{
          deferred.reject({message:'Codigo no valido'});
        }
      },function(error){
        deferred.reject(error);
      });

      return deferred.promise;
    }


  }
})();
