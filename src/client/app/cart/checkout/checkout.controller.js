(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope', '$state','ShoppingCart', 'userApi'];

  function Checkout($scope, $state,ShoppingCart, userApi) {

    $scope.$watch('vm.currentUser',function(){
      $scope.currentUser = $scope.getCurrentUser();
      if($scope.currentUser){
        console.log('vm.currentUser', $scope.currentUser.membership);
        $scope.shoppingCart.membership = $scope.currentUser.membership;
        ShoppingCart.setCart($scope.shoppingCart);
      }
    });
    
    $scope.currentUser = $scope.getCurrentUser();
    $scope.shoppingCart = {};
    $scope.addresses = [];
    $scope.paymentMethods = [];
    $scope.itemsUnavailable = [];
    $scope.vm.cartItems= ShoppingCart.getTotal();
    $scope.completed = false;
    $scope.updateCart = false;
    $scope.loginFormsView = false;
    $scope.walletView = false;

    $scope.shoppingCart = ShoppingCart.getCart();

    if(!$scope.currentUser){
      if($scope.shoppingCart.wallet){
        $scope.shoppingCart.wallet = 0;
        $scope.shoppingCart.useWallet = false;
        $scope.shoppingCart.userWallet = 0;
        ShoppingCart.setCart($scope.shoppingCart);
      }
    }
    
    resetViews();

    $scope.updateWallet = function(cart){
      //Entender como funcion y por que no copia el objeto en el select , function useWallet en wallet.directive
      if($scope.shoppingCart.shippingAddress)
        cart.shippingAddress = $scope.shoppingCart.shippingAddress;

      if($scope.shoppingCart.paymentMethod)
        cart.paymentMethod = $scope.shoppingCart.paymentMethod;

      $scope.shoppingCart = cart;
    }

    // $scope.getShoppingCart = function(){
    //   return $scope.shoppingCart;
    // }

    $scope.setStatus = function(status){
      $scope.completed = status;
    }

    $scope.goToCart =  function(){
      resetViews();
    }

    $scope.toAddress = function(){
      $scope.showAddress = true;
      $scope.walletView = false;
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

    $scope.showLoginForms = function(view){
      $scope.loginFormsView = view;
    }

    $scope.setUser= function(user){
      $scope.setCurrentUser(user);
      $scope.currentUser= user;
      // $scope.showAddress = true;
    }

    $scope.removeFromCart = function(index){
      $scope.vm.cartItems = ShoppingCart.removeItem(index);
      $scope.shoppingCart.items  = $scope.vm.cartItems.items;
      console.log($scope.shoppingCart.items);
      ShoppingCart.setCart($scope.shoppingCart);
    }

    $scope.showWalletView =  function(){
      $scope.walletView = true;
    }

    $scope.hideWalletView =  function(){
      $scope.walletView = false;
    }

    function emptyCart(){
      $scope.shoppingCart = ShoppingCart.emptyCart();
      resetViews();
    }

    function resetViews(){
      $scope.showAddress = false;
      $scope.showPayment = false;
      $scope.showPlaceOrder = false;
      $scope.showConfirmation = false;
    }

    // function setShoppingCart(){
    //   $scope.shoppingCart = ShoppingCart.initialize($scope.shoppingCart.items);
    // }

    function cleanItemsUnavaibale(){
      $scope.itemsUnavailable = [];
    }  

  }

})();
