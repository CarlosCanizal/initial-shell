angular
  .module('app.cart')
  .directive('loginForms',loginForms);

loginForms.$inject = ['userApi','storage'];

function loginForms(userApi, storage){
  return{
    restrict: 'EA',
    templateUrl: 'app/login/login.forms.html',
    scope: true,
    link:function(scope,element,attr){
      scope.response = {};
      
      scope.login = function(){
        scope.response.login = false;
        if(scope.loginForm.$valid){
          scope.showLoading();
          userApi.login(scope.user).then(function(user){
            scope.setUser(user);
          },function(error){
            scope.response.login = error.data.error;
            console.log(error);
            console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
          }).finally(scope.hideLoading);
        }else{
          scope.loginForm.username.$setDirty();
          scope.loginForm.password.$setDirty();
        }
      }

      scope.register = function(){
        scope.response.register = false;
        if(scope.registerForm.$valid){
          scope.showLoading();
          userApi.register(scope.newUser).then(function(user){
            scope.setUser(user);
          },function(error){
            scope.response.register = error.data.error;
            console.log(error);
            console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
          }).finally(scope.hideLoading);
        }else{
          scope.registerForm.name.$setDirty();
          scope.registerForm.lastname.$setDirty();
          scope.registerForm.username.$setDirty();
          scope.registerForm.password.$setDirty();
        }
      }
      
    }
  }
}