angular
  .module('app.cart')
  .directive('userProfileForm',userProfileForm);

userProfileForm.$inject = ['userApi'];

function userProfileForm(userApi){
  return{
    restrict: 'EA',
    templateUrl: 'app/profile/profile.form.html',
    scope: true,
    link:function(scope,element,attr){
      var shell = scope.shell;
      var profile = scope.profile;

      scope.saveProfile = function(){
        if(scope.profileForm.$valid){
          shell.showLoading();
          userApi.saveUserProfile(profile.user).then(function(user){
            shell.updateCurrentUser();
          },function(error){
            shell.setError(error);
          }).finally(shell.hideLoading);
        }
      }
    }
  }
}