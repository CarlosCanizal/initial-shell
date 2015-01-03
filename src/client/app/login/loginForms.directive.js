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
      scope.login = function(){
        userApi.login(scope.user).then(function(user){
          scope.currentUser(user);
        },function(error){
          console.log(error);
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.register = function(){
        userApi.register(scope.newUser).then(function(user){
          scope.currentUser(user);
        },function(error){
          console.log(error);
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }
      
    }
  }
}