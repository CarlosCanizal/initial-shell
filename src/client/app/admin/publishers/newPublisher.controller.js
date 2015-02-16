(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('newPublisher', newPublisher);

  newPublisher.$inject = ['$scope','$stateParams','publisherApi'];

  function newPublisher($scope, $stateParams, publisherApi) {
    var shell = $scope.shell;
    var publisher = this;

    publisher.info = {};

  }

})();
