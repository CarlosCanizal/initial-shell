angular
  .module('app.cart')
  .directive('serieForm',serieForm);

serieForm.$inject = ['$state','serieApi'];

function serieForm($state, serieApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/admin/series/serie.form.html',
    scope: true,
    link:function(scope,element,attr){

      var shell =  scope.shell;
      var serie = scope.serie;
      scope.form = serie.info;

      scope.saveProduct = function(){
        shell.showLoading();
        serie.info.stock = parseInt(serie.info.stock);
        serie.info.price = parseFloat(serie.info.price);

        serieApi.saveProduct(serie.info).then(function(result){          
          if(serie.info.objectId)
            serie.showForm(false);
          else{
            $state.go('admin.serie',{serieId:result.objectId})
          }


          console.log(result);
        },function(error){
          shell.setError(error);
        }).finally(shell.hideLoading);
      }
      
    }
  }
}