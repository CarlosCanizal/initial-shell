(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .controller('Account', Account);

  Account.$inject = ['$scope','$state','userApi','conekta'];

  function Account($scope, $state,userApi, conekta) {

    $scope.currentUser = userApi.currentUser();
    
    $scope.updateMembership = function(membership){
      conekta.updateMembership(membership).then(function(user){
        $scope.updateCurrentUser();
        $scope.currentUser = user;
      },function(error){
        console.log(error);
      });
    }
    
  }

})();
