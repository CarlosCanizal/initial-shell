(function() {
  'use strict';

  angular
  .module('app.cart')
  .factory('ShoppingCart', cart);

  cart.$inject = ['$resource','$q', 'parseheaders', 'parse', 'storage', 'underscore', 'storeApi'];

  /* @ngInject */
  function cart($resource, $q, parseheaders, parse, storage, underscore, storeApi) {

    var cart = {
      getCart: getCart,
      addItem: addItem,
      getTotal: getTotal,
      checkItem: checkItem,
      removeItem: removeItem,
      emptyCart: emptyCart,
      setCart: setCart,
      validateOrder: validateOrder,
      updateItems: updateItems
    };

    return cart;

    function getCart(){

      var cart = storage.get('cart');
      if(!cart){
        cart = {items:[], itemsTotal: 0, cartTotal :0, total:0,useWallet:false, wallet:0, userWallet:0, descuento:0, shippingAddress: false, paymentMethod:false}
        // storage.set('cart',cart)
        this.setCart(cart);
      }
      return cart;
    }

    function validateOrder(){
      var deferred = $q.defer();
      var cart = this.getCart();
      if(cart.items && cart.items.length > 0){
        storeApi.validateOrder(cart.items).then(function(order){
          deferred.resolve(order.result);
        },function(error){
          console.error(error);
        });
      }
      else{
        deferred.resolve({itemsAvailable:[], itemsUnavailable:[]});
      }

      return deferred.promise;
    }

    function setCart(cart){
      var cartTotal = cart.cartTotal;
      var total = cartTotal;
      var prevCart = storage.get('cart');


      if(cart.useWallet && (cart.userWallet && cart.userWallet > 0)){
        total = (cartTotal-cart.userWallet) > 0 ? cartTotal-cart.userWallet : 0;
        cart.wallet = (cart.userWallet - cartTotal > 0 )? cartTotal : cart.userWallet ;
      }else{
        total = cartTotal;
        cart.wallet = 0;
      }
      cart.total = total;

      storage.set('cart',cart)
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
      cart.cartTotal =  cartTotal.toFixed(2); // jccz checar funcion de redondeo
      storage.set('cart',cart)
      return cart;
    }

    function checkItem(items, item){
      var item_index = false;
      angular.forEach(items, function(element, index){
        if(element.objectId == item.objectId  && !item_index){
          console.log('same');
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
        if(cart.items[index].type=="available"){
          if(cart.items[index].quantity+1  <= cart.items[index].stock){
            cart.items[index].quantity +=1;
          }
        }else{
          cart.items[index].quantity +=1;
        }
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

    function emptyCart(){
      storage.remove('cart');
      return this.getCart();
    }


  }
})();
