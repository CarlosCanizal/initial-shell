angular
  .module('app.dashboard')
  .directive('coupon',coupon);

coupon.$inject = ['couponApi'];

function coupon(couponApi){
  return{
    restrict: 'EA',
    scope: true,
    templateUrl: 'app/wallet/coupon/coupon.form.html',
    link:function(scope, element, attribute){
      
      scope.redeemCode = function(){
        couponApi.redeemCode(scope.coupon.code).then(function(code){
          console.log('redeemCode',code);
        },function(error){
          console.error(error);
        }).finally(function(){

        });
      }

    }
  }
}