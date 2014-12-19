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
      checkItem: checkItem
    };

    return cart;

    function getCart(){

      var cart = storage.get('cart');
      if(!cart){
        cart = {items:[], series:[]}
        storage.set('cart',cart)
      }
      return cart;
    }

    function getTotal(){
      var cart = this.getCart();
      var items = underscore.reduce(cart.items,function(memo,item){
        return memo + item.quantity;
      },0,0);
      var series =  underscore.reduce(cart.series,function(memo,item){
        return memo + item.quantity;
      },0,0);
      var total = series + items;
      return {series:series, items: items, total: total};
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
      console.log('addToCart function in factory');
      var cart = this.getCart();
      var index;
      if(item.className == 'Serie'){
        index = this.checkItem(cart.series, item);
        if(index === false){
          cart.series.push(item);
        }
      }else{
        index = this.checkItem(cart.items, item);
        if(index === false){
          cart.items.push(item);
        }else{
          cart.items[index].quantity +=1;
        }
      }

      storage.set('cart',cart);
      return this.getTotal();
    }




  }
})();
