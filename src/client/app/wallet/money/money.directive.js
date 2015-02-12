angular
  .module('app.dashboard')
  .directive('money',money);

money.$inject = ['couponApi','userApi'];

function money(couponApi, userApi){
  return{
    restrict: 'EA',
    scope: 'true',
    templateUrl: 'app/wallet/money/money.form.html',
    link:function(scope, element, attribute){

      var shell = scope.shell;
      scope.redeemCode = function(){
        
        scope.error = false;
        scope.success = false;
        var wallet = scope.wallet;
        var userId =  attribute.userId;

        if(scope.couponForm.$valid){
          shell.showLoading();
          couponApi.redeemCode(scope.coupon.code, userId).then(function(result){
            var coupon = result.result;
            scope.success = "Codigo valido";
            console.log(coupon);
            wallet.setBalance(coupon.amount);
          },function(error){
            shell.setError(error);
          }).finally(shell.hideLoading);
        }
      }

      scope.addMoney = function(amount){
        var wallet = scope.wallet;
        var userId =  attribute.userId;
        shell.showLoading();
        amount = parseInt(amount);
        var user = {objectId:userId, wallet: amount};
        userApi.addMoney(user).then(function(result){
          wallet.setBalance(amount);
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
    }
  }
}