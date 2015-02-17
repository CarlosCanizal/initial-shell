(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Publisher', Publisher);

  Publisher.$inject = ['$scope', '$state','$stateParams','publisherApi','info'];

  function Publisher($scope, $state, $stateParams, publisherApi, info) {
    var shell = $scope.shell;
    var publisher = this;
    // var publisherId = $stateParams.publisherId;

    publisher.form = false;
    publisher.info = info;

    publisher.showForm = function(view){
      publisher.form = view;
    }

    publisher.updatePublisher = function(info){
      publisher.info  = info;
    }

    $scope.deletePublisher = function(objectId, index){
      shell.showLoading()
      publisherApi.deletePublisher(objectId).then(function(response){
        $state.go('admin.publishers');
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

  }

})();
