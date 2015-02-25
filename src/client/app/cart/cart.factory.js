(function() {
  'use strict';

  angular
  .module('app.cart')
  .factory('ShoppingCart', ShoppingCart);

  ShoppingCart.$inject = ['$resource','$q', 'parseheaders', 'parse', 'storage', 'underscore', 'storeApi'];

  /* @ngInject */
  function ShoppingCart($resource, $q, parseheaders, parse, storage, underscore, storeApi) {

    var shoppingCart = {
      getCart: getCart,
      addItem: addItem,
      getTotal: getTotal,
      calculateTotal: calculateTotal,
      checkItem: checkItem,
      removeItem: removeItem,
      emptyCart: emptyCart,
      setCart: setCart,
      validateOrder: validateOrder,
      updateItems: updateItems,
      initialize: initialize
    };

    return shoppingCart;

    function getCart(){

      var cart = storage.get('cart');
      if(!cart){
        cart = this.initialize();
      }
      return cart;
    }

    function initialize(){
      var cart = {items:[], itemsTotal: 0, cartTotal :0, total:false, useWallet:false, wallet:0, userWallet:0, discount:0,shippingMethod:false, shippingAddress: false, paymentMethod:false};
      return this.setCart(cart);
    }

    // function initializeTotals(){
    //   var cart = this.getCart();
    //   cart.items = [];
    //   cart.itemsTotal =  0;
    //   cart.cartTotal = 0;
    //   cart.total = false;
    //   cart.shippingMethod = false;
    //   cart.shippingAddress = false;
    //   cart.paymentMethod= false;
    //   return this.setCart(cart);
    // }

    function validateOrder(){
      var deferred = $q.defer();
      var cart = this.getCart();
      if(cart.items && cart.items.length > 0){
        storeApi.validateOrder(cart.items).then(function(order){
          deferred.resolve(order.result);
        },function(error){
          shell.setError(error);
        });
      }
      else{
        deferred.resolve({itemsAvailable:[], itemsUnavailable:[]});
      }

      return deferred.promise;
    }

    function setCart(cart){
      storage.set('cart',cart);
      return this.getTotal();
    }

    function getTotal(){
      var cart = this.getCart();
      var cartTotal = 0;
      var itemsTotal = underscore.reduce(cart.items,function(memo,item){
        cartTotal += item.quantity * item.price;
        return memo + item.quantity;
      },0,0);
      cart.itemsTotal = itemsTotal;
      cart.cartTotal =  cartTotal;
      cart = this.calculateTotal(cart);
      storage.set('cart',cart);
      return cart;
    }
    
    function calculateTotal(cart){
      var cartTotal = cart.cartTotal;
      var total = cartTotal;

      if(cart.membership == 'pro'){
        var discount = 15 /100;
        cart.discount = (cartTotal * discount);
        cartTotal -= cart.discount;
      }

      if(cart.shippingMethod && cart.shippingAddress){
        cartTotal += cart.shippingMethod.price;
      }

      if(cart.useWallet && (cart.userWallet && cart.userWallet > 0)){
        total = (cartTotal-cart.userWallet) > 0 ? cartTotal-cart.userWallet : 0;
        cart.wallet = (cart.userWallet - cartTotal > 0 )? cartTotal : cart.userWallet ;
      }else{
        total = cartTotal;
        cart.wallet = 0;
      }
      cart.total = total;
      return cart;
    }

    function checkItem(items, item){
      var item_index = false;
      angular.forEach(items, function(element, index){
        if(element.objectId == item.objectId  && !item_index){
          item_index = index;
        }
      });
      return item_index;

    }

    function updateItems(items){
      var cart = this.getCart();
      cart.items = items;
      storage.set('cart',cart);
      return this.getTotal();
    }

    function addItem(item) {
      
      var cart = this.getCart();
      var index = this.checkItem(cart.items, item);
      if(index === false){
        cart.items.push(item);
      }else{
        if(cart.items[index].available=="available"){
          if(cart.items[index].quantity+item.quantity  <= cart.items[index].stock){
            cart.items[index].quantity +=item.quantity;
          }
        }else{
          cart.items[index].quantity += item.quantity;
        }
      }
      storage.set('cart',cart);
      return this.getTotal();
    }

    function removeItem(index){
      var cart = this.getCart();
      cart.items.splice(index,1);
      return this.setCart(cart);
    }

    function emptyCart(){
      return this.initialize();
    }


  }
})();
