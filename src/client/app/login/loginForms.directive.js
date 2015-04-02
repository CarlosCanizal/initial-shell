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
      var shell = scope.shell;
      scope.response = {code:400};
      
      scope.login = function(){
        scope.response.login = false;
        if(scope.loginForm.$valid){
          shell.showLoading();
          userApi.login(scope.user).then(function(user){
            scope.setUser(user);
          },function(error){            
            scope.response.login = error.data.error;
            scope.response.code = error.data.code;
            shell.setError(error);
          }).finally(shell.hideLoading);
        }else{
          scope.loginForm.username.$setDirty();
          scope.loginForm.password.$setDirty();
        }
      };

      scope.register = function(){
        scope.response.register = false;
        if(scope.registerForm.$valid){
          shell.showLoading();
          userApi.register(scope.newUser).then(function(user){
            scope.setUser(user);
          },function(error){
            console.log(error);
            if(error.data.error){
              scope.response.register = error.data.error;
              scope.response.code = error.data.code;
            }else{
              shell.setError(error);
            }
          }).finally(shell.hideLoading);
        }else{
          scope.registerForm.name.$setDirty();
          scope.registerForm.lastname.$setDirty();
          scope.registerForm.username.$setDirty();
          scope.registerForm.password.$setDirty();
        }
      };
      
    }
  };
}