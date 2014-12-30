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
    // $scope.setLoading(true);
    // $scope.loading =  false;

    setShoppingCart();
    resetViews();    

    // ShoppingCart.validateOrder().then(function(order){
    //   $scope.vm.cartItems = ShoppingCart.updateItems(order.itemsAvailable);
    //   $scope.itemsUnavailable = order.itemsUnavailable;
    //   $scope.setLoading(false);
    // },function(error){
    //   console.error(error);
    // });

    $scope.plusOne = function(item){
      console.log(item.stock);
      if(item.type == 'available'){
        if(item.quantity+1 <= item.stock)
          ++item.quantity;
      }
      else
        ++item.quantity;
    }

    $scope.minusOne = function(item){
      if(item.quantity-1 > 0)
        --item.quantity;
    }

    $scope.updateQuantity = function(item, index){
      if(item.quantity > item.stock){
        item.quantity = item.stock;
      }
      else{
        $scope.vm.cartItems = ShoppingCart.setCart($scope.vm.cartItems);
        $scope.shoppingCart.items = $scope.vm.cartItems.items;
      }
    }



    $scope.goToCart =  function(){
      resetViews();
    }

    $scope.toAddress = function(){
      $scope.showAddress = true;
      $scope.showPayment = false;
      $scope.showPlaceOrder = false;
      $scope.loading =  true;
      cleanItemsUnavaibale();
      userApi.getAddresses($scope.currentUser.objectId).then(function(addresses){
        $scope.addresses =  addresses.results;
        $scope.shoppingCart.shippingAddress = $scope.addresses[0];
        $scope.loading = false;
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
        emptyCart();
        $scope.confirmation = true;

      },function(error){
        var error = angular.fromJson(error.data.error);
        $scope.confirmation = false;
        console.log(error);
        $scope.errorMessage =  error.message_to_purchaser;
      });
    }

    $scope.emptyCart = function(){
      emptyCart();
    }

    $scope.cleanItemsUnavaibale = function(){
      cleanItemsUnavaibale();
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
