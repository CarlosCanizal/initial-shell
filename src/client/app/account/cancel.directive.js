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
      var shell =  scope.shell;
      var account =  scope.account;

      scope.cancelMembership =  function(){
        if(scope.cancelForm.$valid){
          shell.showLoading();
          conekta.unsubscribe(account.subscription.payment.card,'plan_CczxCcuzBBUew3Vm',scope.unsubscribe.comment).then(function(user){
            shell.updateCurrentUser();
          },function(error){
            console.log(error);
          }).finally(function(){
            shell.hideLoading();
            account.hideCancelForm();
          });
        }else{
          account.cancelForm.comment.$setDirty();
        }
      }

    }
  }
}