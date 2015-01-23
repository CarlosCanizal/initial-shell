angular
  .module('app.cart')
  .directive('cancelMembership',cancelMembership);

cancelMembership.$inject = ['conekta'];

function cancelMembership(conekta){
  return{
    restrict: 'EA',
    templateUrl: 'app/account/cancel.form.html',
    scope: true,
    link:function(scope,element,attr){

      scope.cancelMembership =  function(){
        console.log(scope);
        if(scope.cancelForm.$valid){
          scope.showLoading();
          console.log(scope.unsubscribe.comment);
          conekta.unsubscribe(scope.subscription.payment.card,'plan_CczxCcuzBBUew3Vm',scope.unsubscribe.comment).then(function(user){
            console.log(user);
            scope.updateCurrentUser();
          },function(error){
            console.log(error);
          }).finally(function(){
            scope.hideLoading();
            scope.hideCancelForm();
          });
        }else{
          scope.cancelForm.comment.$setDirty();
        }
      }

    }
  }
}