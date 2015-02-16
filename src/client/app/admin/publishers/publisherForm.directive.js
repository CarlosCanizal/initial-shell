angular
  .module('app.cart')
  .directive('publisherForm',publisherForm);

publisherForm.$inject = ['$state','publisherApi'];

function publisherForm($state, publisherApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/admin/publishers/publisher.form.html',
    scope: true,
    link:function(scope,element,attr){

      var shell =  scope.shell;
      var publisher = scope.publisher;
      scope.form = publisher.info;

      scope.saveProduct = function(){
        shell.showLoading();
        publisher.info.stock = parseInt(publisher.info.stock);
        publisher.info.price = parseFloat(publisher.info.price);

        publisherApi.savePublisher(publisher.info).then(function(result){          
          if(publisher.info.objectId)
            publisher.showForm(false);
          else{
            $state.go('admin.publisher',{publisherId:result.objectId})
          }
          console.log(result);
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
      
    }
  }
}