angular
  .module('app.dashboard')
  .directive('adminCoupon',adminCoupon);

adminCoupon.$inject = ['couponApi','userApi'];

function adminCoupon(couponApi, userApi){
  return{
    restrict: 'EA',
    scope: 'true',
    templateUrl: 'app/wallet/coupon/coupon.form.html',
    link:function(scope, element, attribute){
      scope.redeemCode = function(){
        var shell = scope.shell;
        var wallet = scope.wallet;
        var userId =  attribute.userId;
        scope.error = false;
        scope.success = false;

        if(scope.couponForm.$valid){
          shell.showLoading();
          couponApi.redeemCode(scope.coupon.code, userId).then(function(result){
            var coupon = result.result;
            scope.success = "Codigo valido";
            wallet.setBalance(coupon.amount);
          },function(error){
            shell.setError(error);
          }).finally(shell.hideLoading);
        }
      }
    }
  }
}