angular
  .module('app.cart')
  .directive('responsePayment',responsePayment);

responsePayment.$inject = ['userApi'];

function responsePayment(userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/responsePayment/responsePayment.template.html',
    scope: true,
    link:function(scope,element,attr){
      
    }
  }
}