(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope', '$state','ShoppingCart', 'userApi'];

  function Checkout($scope, $state,ShoppingCart, userApi) {
    
    $scope.currentUser = $scope.getCurrentUser();
    $scope.shoppingCart = {};
    $scope.addresses = [];
    $scope.paymentMethods = [];
    $scope.itemsUnavailable = [];
    $scope.vm.cartItems= ShoppingCart.getTotal();
    $scope.completed = false;
    $scope.updateCart = false;

    setShoppingCart();
    resetViews();    

    $scope.setStatus = function(status){
      $scope.completed = status;
    }


    $scope.goToCart =  function(){
      resetViews();
    }

    $scope.toAddress = function(){
      $scope.showAddress = true;
      $scope.showPayment = false;
      $scope.showPlaceOrder = false;
    }

    $scope.toPaymentMethod = function(){
      ShoppingCart.setCart($scope.shoppingCart);
      $scope.showPayment = true;
      $scope.showPlaceOrder = false;
    }

    $scope.toConfirmOrder = function(){
      ShoppingCart.setCart($scope.shoppingCart);
      $scope.showPlaceOrder = true;
    }

    $scope.emptyCart = function(){
      emptyCart();
    }

    $scope.cleanItemsUnavaibale = function(){
      cleanItemsUnavaibale();
    }

    $scope.setUpdateCart= function(update){
      $scope.updateCart = update;
    }

    function emptyCart(){
      setShoppingCart();
      resetViews();
      $scope.vm.cartItems = ShoppingCart.emptyCart();
    }

    function resetViews(){
      $scope.showAddress = false;
      $scope.showPayment = false;
      $scope.showPlaceOrder = false;
      $scope.showConfirmation = false;
    }

    function setShoppingCart(){
      $scope.shoppingCart.items = $scope.vm.cartItems.items;
      $scope.shoppingCart.shippingAddress = {};
      $scope.shoppingCart.paymentMethod = {};
    }

    function cleanItemsUnavaibale(){
      $scope.itemsUnavailable = [];
    }


  }

})();
