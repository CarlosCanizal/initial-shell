(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope', '$state','ShoppingCart', 'userApi'];

  function Checkout($scope, $state,ShoppingCart, userApi) {

    var vm = $scope.vm;
    var checkoutVm = this;

    // checkoutVm.shoppingCart = $scope.vm.shoppingCart;
    $scope.$watch('vm.currentUser',function(){
      // $scope.currentUser = $scope.getCurrentUser();
      if(vm.currentUser){
        console.log('vm.currentUser', vm.currentUser.membership);
        vm.shoppingCart.membership = vm.currentUser.membership;
        ShoppingCart.setCart(vm.shoppingCart);
      }
    });

    
    // $scope.currentUser = $scope.getCurrentUser();
    $scope.addresses = [];
    $scope.paymentMethods = [];
    $scope.itemsUnavailable = [];
    $scope.completed = false;
    checkoutVm.updateCart = false;
    $scope.loginFormsView = false;
    $scope.walletView = false;

    vm.shoppingCart = ShoppingCart.getCart();

    console.log(vm.shoppingCart);

    return;
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

    vm.setUpdateCart = function(update){
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
      $scope.shoppingCart = ShoppingCart.removeItem(index);
      $scope.updateShoppingCart($scope.shoppingCart);
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
