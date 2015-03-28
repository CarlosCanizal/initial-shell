angular
  .module('app.cart')
  .directive('membership',membership);

membership.$inject = ['userApi'];

function membership(userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/membership/membership.template.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var checkout = scope.checkout;
    } 
  }
}