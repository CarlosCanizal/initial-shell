angular
  .module('app.cart')
  .directive('profileForm',profileForm);

profileForm.$inject = ['userApi'];

function profileForm(userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/profile/profile.form.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var profile = scope.profile;
      var view = scope.view;

      scope.saveProfile = function(){
        if(scope.profileForm.$valid){
          shell.showLoading();
          userApi.saveUserProfile(profile.user).then(function(user){
            // if(view)
              shell.updateCurrentUser();
          },function(error){
            shell.setError(error);
          }).finally(shell.hideLoading);
        }
      };
    }
  };
}