(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Publisher', Publisher);

  Publisher.$inject = ['$scope','$stateParams','publisherApi','info'];

  function Publisher($scope, $stateParams, publisherApi, info) {
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

  }

})();
