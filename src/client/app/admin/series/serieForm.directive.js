angular
  .module('app.cart')
  .directive('serieForm',serieForm);

serieForm.$inject = ['$state','serieApi','publisherApi'];

function serieForm($state, serieApi, publisherApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/admin/series/serie.form.html',
    scope: true,
    link:function(scope,element,attr){

      var shell =  scope.shell;
      var serie = scope.serie;
      scope.form = serie.info;

      scope.publisher = {name:null};
      scope.status = {name:scope.form.status};
      serie.publishers = [];

      publisherApi.getPublishers().then(function(result){
        var publishers = result.results;
        serie.publishers = publishers;
        if(scope.form.publisher){
          scope.publisher.name = scope.form.publisher;
        }
        else{
          scope.publisher = serie.publishers[0];
          scope.form.publisher = scope.publisher.name;
        }
      },function(error){
        shell.setError(error);
      });

      scope.saveSerie = function(){
        shell.showLoading();
        serie.info.stock = parseInt(serie.info.stock);
        serie.info.price = parseFloat(serie.info.price);

        serieApi.saveSerie(serie.info).then(function(result){          
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