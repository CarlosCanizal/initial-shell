angular
  .module('app.cart')
  .directive('cartItem',cartItem);

cartItem.$inject = ['ShoppingCart'];

function cartItem(ShoppingCart){
  return{
    restrict: 'EA',
    templateUrl: 'app/cart/checkout/items/item.template.html',
    scope: true,
    link:function(scope, element, attr){
      scope.update = false;

      scope.plusOne = function(item){
        if(item.type == 'available'){
          if(item.quantity+1 <= item.stock){
            ++item.quantity;
            scope.update = true;
            scope.setUpdateCart(true);
          }
        }
        else{
          ++item.quantity;
          scope.update = true;
          scope.setUpdateCart(true);
        }
      }

      scope.minusOne = function(item){
        if(item.quantity-1 > 0){
          --item.quantity;
          scope.update = true;
          scope.setUpdateCart(true); 
        }
      }

    }
  }
}