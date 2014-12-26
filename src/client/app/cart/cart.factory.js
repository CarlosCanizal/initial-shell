(function() {
  'use strict';

  angular
  .module('app.cart')
  .factory('ShoppingCart', cart);

  cart.$inject = ['$resource','$q', 'parseheaders', 'parse', 'storage', 'underscore'];

  /* @ngInject */
  function cart($resource, $q, parseheaders, parse, storage, underscore) {

    var cart = {
      getCart: getCart,
      addItem: addItem,
      getTotal: getTotal,
      checkItem: checkItem,
      removeItem: removeItem,
      updateQuantity: updateQuantity,
      shippingAddress: shippingAddress
    };

    return cart;

    function getCart(){

      var cart = storage.get('cart');
      if(!cart){
        cart = {items:[], itemsTotal: 0, cartTotal :0, shippingAddress:{}, paymentMethod:{}}
        storage.set('cart',cart)
      }
      return cart;
    }

    function getTotal(){
      var cart = this.getCart();
      var cartTotal = 0;
      var itemsTotal = underscore.reduce(cart.items,function(memo,item){
        cartTotal += item.quantity * item.price;
        return memo + item.quantity;
      },0,0);
      cart = {items: cart.items, itemsTotal: itemsTotal, cartTotal: cartTotal};
      storage.set('cart',cart)
      return cart;
    }

    function checkItem(items, item){
      var item_index = false;
      angular.forEach(items, function(element, index){
        console.log(item.objectId);
        console.log(element.objectId);
        if(element.objectId == item.objectId  && !item_index){
          console.log('same');
          item_index = index;
        }
      });
      return item_index;

    }

    function addItem(item) {
      
      var cart = this.getCart();
      var index = this.checkItem(cart.items, item);
      if(index === false){
        cart.items.push(item);
      }else{
        cart.items[index].quantity +=1;
      }
      storage.set('cart',cart);
      return this.getTotal();
    }

    function removeItem(index){
      var cart = this.getCart();
      cart.items.splice(index,1);
      storage.set('cart',cart);
      return this.getTotal();
    }

    function updateQuantity(item, index){
      var cart = this.getCart();
      cart.items[index].quantity = item.quantity;
      storage.set('cart',cart);
      return this.getTotal();       
    }

    function shippingAddress(address){
      var cart = this.getCart();
      cart.shippingAddress = address;
      storage.set('cart',cart);
      return cart;
    }

    function paymentMethod(paymentMethod){
      var cart = this.getCart();
      cart.paymentMethod = paymentMethod;
      storage.set('cart',cart);
      return cart;
    }




  }
})();
