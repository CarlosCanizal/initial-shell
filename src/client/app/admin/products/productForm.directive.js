angular
  .module('app.cart')
  .directive('productForm',productForm);

productForm.$inject = ['productsApi'];

function productForm(productsApi){
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
        productsApi.saveProduct(product.info).then(function(result){
          // product.updateProduct(result);
          console.log(result);
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
      
    }
  }
}