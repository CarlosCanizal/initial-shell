(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope', '$state','ShoppingCart', 'userApi'];

  function Checkout($scope, $state,ShoppingCart, userApi) {
    
    $scope.currentUser = $scope.getCurrentUser();
    $scope.vm.cartItems = ShoppingCart.getCart();

    $scope.shoppingCart = {};

    setShoppingCart();

    $scope.addresses = [];
    $scope.paymentMethods = [];
    resetViews();

    $scope.plusOne = function(item){
      ++item.quantity;
    }

    $scope.minusOne = function(item){
      if(item.quantity-1 > 0)
        --item.quantity;
    }

    $scope.updateQuantity = function(item, index){
      $scope.vm.cartItems = ShoppingCart.setCart($scope.shoppingCart);
      $scope.shoppingCart.items = $scope.vm.cartItems.items;

    }

    $scope.goToCart =  function(){
      resetViews();
    }

    $scope.toAddress = function(){
      $scope.showAddress = true;
      $scope.showPayment = false;
      $scope.showPlaceOrder = false;
      userApi.getAddresses($scope.currentUser.objectId).then(function(addresses){
        $scope.addresses =  addresses.results;
        $scope.shoppingCart.shippingAddress = $scope.addresses[0];
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.toPaymentMethod = function(){
      ShoppingCart.setCart($scope.shoppingCart);
      $scope.showPayment = true;
      $scope.showPlaceOrder = false;
      userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
        $scope.cards = cards;
        $scope.paymentMethods =  $scope.cards;
        $scope.shoppingCart.paymentMethod = $scope.cards[0];
      },function(error){
        console.error(error);
        // console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.toConfirmOrder = function(){
      ShoppingCart.setCart($scope.shoppingCart);
      $scope.showPlaceOrder = true;
    }

    $scope.placeOrder = function(){
      var user = $scope.currentUser;
      var cart = ShoppingCart.getCart();
      $scope.showConfirmation = true;
      

      userApi.chargeCard(cart, user).then(function(result){
        console.log(result.result);
        $scope.confirmation = true;
      },function(error){
        var error = angular.fromJson(error.data.error);
        $scope.confirmation = false;
        console.log(error);
        $scope.errorMessage =  error.message_to_purchaser;
      });
    }

    $scope.emptyCart = function(){
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
  }

})();
