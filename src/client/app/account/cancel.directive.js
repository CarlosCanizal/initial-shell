angular
  .module('app.cart')
  .directive('cancelMembership',cancelMembership);

cancelMembership.$inject = [];

function cancelMembership(){
  return{
    restrict: 'EA',
    templateUrl: 'app/account/cancel.form.html',
    scope: true,
    link:function(scope,element,attr){

      scope.cancelMembership =  function(){
        console.log(scope);
        if(scope.cancelForm.$valid){
          scope.showLoading();
          conekta.unsubscribe('plan_CczxCcuzBBUew3Vm').then(function(user){
            console.log(user);
            scope.updateCurrentUser();
          },function(error){
            console.log(error);
          }).finally(scope.hideLoading);
        }else{
          scope.cancelForm.comment.$setDirty();
        }
      }

    }
  }
}