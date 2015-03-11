(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('AssistentUsers', AssistentUsers);

  AssistentUsers.$inject = ['$scope','$stateParams', 'userApi','statsApi','conekta',];

  function AssistentUsers($scope, $stateParams, userApi, statsApi, conekta){
    var shell = $scope.shell;
    var users = this;
    users.list = [];
    users.nopes = [];

    shell.showLoading();

    userApi.getAssistentUsers(shell.currentUser.username).then(function(result){
      users.list = result.results;
      return statsApi.getList(shell.currentUser.username);
    }).then(function(result){
      users.nopes = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);




  }
})();
