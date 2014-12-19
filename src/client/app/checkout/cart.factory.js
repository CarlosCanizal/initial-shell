(function() {
  'use strict';

  angular
  .module('app.cart')
  .factory('cart', cart);

  cart.$inject = ['$resource', 'parseheaders', 'parse', 'storage'];

  /* @ngInject */
  function cart($resource, parseheaders, parse, storage) {

    var cart = {
      addToCart: addToCart,
      checkCart: checkCart,
      getTotal: getTotal
    };

    return cart;

    function checkCart(){
      var cart = storage.get('cart');
      if(!cart){
        cart = storage.set('cart',{items:[], series:[]})
      }
      return cart;
    }

    function getTotal(){
      var cart = storage.get('cart');
      var items = cart.items.length;
      var series =  cart.series.length;
      var total = series + items;
      return {series:series, items: items, total: total};
    }

    function addToCart(item) {
      console.log(item);
      console.log('addToCart function in factory');
      cart = this.checkCart();
      if(item.className == 'Serie')
        cart.series.push(item);
      else
        cart.items.push(item);
      storage.set('cart',cart);

      var total = cart.items

      return this.getTotal();
    }




  }
})();
