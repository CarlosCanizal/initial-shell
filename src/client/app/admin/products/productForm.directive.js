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
      if(product.info && product.info.tags)
        scope.tags = product.info.tags.join(",");
      scope.publisher = {name:null};
      scope.available = {name:scope.form.available};
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

      scope.defaultTags = function(){
        var tags = [];
        if(product.info.diamondId)
          tags.push(product.info.diamondId.toLowerCase());
        if(product.info.name)
          tags.push(product.info.name.toLowerCase());
        if(product.info.mainDesc){
          var mainDesc = product.info.mainDesc.toLowerCase();
          tags = splitInTags(tags,mainDesc," ")
        }
        if(scope.publisher && scope.publisher.name){
          var publisher = scope.publisher.name.toLowerCase();
          tags = splitInTags(tags,publisher," ")
        }

        scope.tags = tags.join(',');

      }

      function splitInTags(array,tag,separator){
        array.push(tag);
        var split = tag.split(separator);
        angular.forEach(split,function(tag){
          if(shouldAdd(tag))
            array.push(tag);
        });
        return array;
      }

      function shouldAdd(value){
        var excludeTags = shell.labels.excludeTags;
        var index = excludeTags.indexOf(value) > -1 ? false :true;
        return index;
      }

      scope.saveProduct = function(){
        shell.showLoading();
        if(product.info.stock)
          product.info.stock = parseInt(product.info.stock);
        if(product.info.price)
          product.info.price = parseFloat(product.info.price);
        if(product.info.diamondId)
          product.info.diamondId  = product.info.diamondId.toUpperCase();
        var tags = scope.tags.split(',');
        for(i = 0; i < tags.length; i++){
          tags[i] = tags[i].trim();
        }
        product.info.tags = tags;


        productsApi.saveProduct(product.info).then(function(result){          
          if(product.info.objectId)
            product.showForm(false);
          else{
            $state.go('admin.product',{productId:result.objectId})
          }
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
      
    }
  }
}