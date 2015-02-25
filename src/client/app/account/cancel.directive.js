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
      var view = scope.view;

      scope.cancelMembership =  function(user){
        console.log(user);
        if(scope.cancelForm.$valid){
          shell.showLoading();
          conekta.unsubscribe(account.subscription.payment.card,'plan_CczxCcuzBBUew3Vm',scope.unsubscribe.comment, user).then(function(user){
            account.updateUser(user.result);
            if(!view)
              shell.updateCurrentUser();
          },function(error){
            shell.setError(error);
          }).finally(function(){
            shell.hideLoading();
            account.hideCancelForm();
          });
        }else{
          account.cancelForm.comment.$setDirty();
        }
      };

    }
  };
}