angular
  .module('app.cart')
  .directive('productForm',productForm);

productForm.$inject = ['$state','productsApi'];

function productForm($state, productsApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/admin/products/product.form.html',
    scope: true,
    link:function(scope,element,attr){

      var shell =  scope.shell;
      var product = scope.product;
      scope.form = product.info;

      scope.saveProduct = function(){
        shell.showLoading();
        product.info.stock = parseInt(product.info.stock);
        product.info.price = parseFloat(product.info.price);

        productsApi.saveProduct(product.info).then(function(result){          
          if(product.info.objectId)
            product.showForm(false);
          else{
            $state.go('admin.product',{productId:result.objectId})
          }


          console.log(result);
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
      
    }
  }
}