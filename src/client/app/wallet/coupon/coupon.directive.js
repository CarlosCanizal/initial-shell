angular
  .module('app.dashboard')
  .directive('coupon',coupon);

coupon.$inject = [];

function coupon(Message){
  return{
    restrict: 'EA',
    scope: true,
    templateUrl: 'app/wallet/coupon/coupon.form.html',
    link:function(scope, element, attribute){
      

    }
  }
}