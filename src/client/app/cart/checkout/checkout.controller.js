(function() {
  'use strict';

  angular
  .module('app.cart')
  .controller('Checkout', Checkout);

  Checkout.$inject = ['$scope','$state','ShoppingCart', 'userApi'];

  function Checkout($scope, $state,ShoppingCart, userApi) {
    
    $scope.currentUser = $scope.getCurrentUser();
    $scope.vm.cartItems = ShoppingCart.getCart();
    $scope.addresses = [];
    $scope.paymentMethods = [];
    $scope.address = {};
    $scope.showAddress = false;
    $scope.showPayment = false;
    $scope.showPlaceOrder = false;



    $scope.plusOne = function(item){
      ++item.quantity;
    }

    $scope.minusOne = function(item){
      if(item.quantity-1 > 0)
        --item.quantity;
    }

    $scope.updateQuantity = function(item, index){
      console.log(item);
      $scope.vm.cartItems = ShoppingCart.updateQuantity(item, index);
    }

    $scope.toAddress = function(){
      $scope.showAddress = true;
      userApi.getAddresses($scope.currentUser.objectId).then(function(addresses){
        $scope.addresses =  addresses.results;
        $scope.address = $scope.addresses[0];
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.toPaymentMethod = function(){
      ShoppingCart.shippingAddress($scope.address);
      $scope.showPayment = true;
      $scope.cards = userApi.getCards({conektaId:$scope.currentUser.conektaId}).then(function(cards){
        $scope.cards = cards.result
        $scope.paymentMethods =  $scope.cards;
        $scope.paymentMethod = $scope.cards[0];
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.toConfirmOrder = function(){
      ShoppingCart.shippingAddress($scope.paymentMethod);
      $scope.showPlaceOrder = true;
    }


  }



})();
