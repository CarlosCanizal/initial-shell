(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Publishers', Publishers);

  Publishers.$inject = ['$scope','publisherApi'];

  function Publishers($scope, publisherApi) {
    var shell = $scope.shell;
    var publishers = this;

    publishers.list = [];

    shell.showLoading();

    publisherApi.getPublishers().then(function(result){
      console.log(result);
      publishers.list = result.results;
    },function(error){
      shell.setError(error);
    }).finally(shell.hideLoading);

    

  }

})();
