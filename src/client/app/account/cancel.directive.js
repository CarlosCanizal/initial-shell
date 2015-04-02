angular
  .module('app.cart')
  .directive('cancelMembership',cancelMembership);

cancelMembership.$inject = ['conekta','userApi'];

function cancelMembership(conekta, userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/account/cancel.form.html',
    scope: true,
    link:function(scope,element,attr){
      var shell =  scope.shell;
      var account =  scope.account;
      var view = scope.view;

      scope.cancelMembership =  function(user){
        if(scope.cancelForm.$valid){
          shell.showLoading();
          var planId = conekta.getPlan();
          conekta.unsubscribe(account.subscription.payment.card,planId,scope.unsubscribe.comment, user).then(function(user){
            if(!view){
              shell.updateCurrentUser().then(function(user){
                account.updateUser(userApi.currentUser());
              });
            }else{
              account.updateUser(user.result);
            }
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