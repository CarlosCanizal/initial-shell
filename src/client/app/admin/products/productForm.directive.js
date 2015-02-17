angular
  .module('app.cart')
  .directive('productForm',productForm);

productForm.$inject = ['$state','productsApi','publisherApi'];

function productForm($state, productsApi, publisherApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/admin/products/product.form.html',
    scope: true,
    link:function(scope,element,attr){

      var shell =  scope.shell;
      var product = scope.product;
      scope.form = product.info;
      scope.publisher = {name:null};
      scope.type = {name:scope.form.type};
      scope.status = {name:scope.form.status};

      product.publishers = [];

      publisherApi.getPublishers().then(function(result){
        var publishers = result.results;
        product.publishers = publishers;
        if(scope.form.publisher){
          scope.publisher.name = scope.form.publisher;
        }
        else{
          scope.publisher = product.publishers[0];
          scope.form.publisher = scope.publisher.name;
        }
      },function(error){
        shell.setError(error);
      });

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