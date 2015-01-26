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
        scope.error = false;
        scope.success = false;
        if(scope.couponForm.$valid){
          scope.showLoading();
          couponApi.redeemCode(scope.coupon.code).then(function(code){
            console.log('redeemCode',code);
            scope.success = "Codigo valido";
          },function(error){
            console.error(error);
            scope.error = error.data.error;
          }).finally(scope.hideLoading);
        }
      }

    }
  }
}