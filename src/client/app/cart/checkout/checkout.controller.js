(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope','$state','ShoppingCart'];

  function Checkout($scope, $state,ShoppingCart) {
    var cart = ShoppingCart.getCart()
    console.log(cart);
    $scope.cart = cart.series.concat(cart.items);
  }

})();
