(function() {
  'use strict';

  angular
  .module('app.admin')
  .controller('Assistent', Assistent);

  Assistent.$inject = ['$scope','$state','$stateParams', 'statsApi'];

  function Assistent($scope,$state, $stateParams, statsApi){

    var shell = $scope.shell;
    var assistent =  this;
    assistent.speech = false;
    assistent.answer = false;
    assistent.nope = false;

    assistent.speechDone = function(){
      assistent.speech = true;
      assistent.answer = true;
    }

    assistent.giveReason = function(){
      assistent.answer= false
      assistent.nope = true;
    }

    assistent.cancel = function(){
      assistent.speech = false;
      assistent.answer = false;
      assistent.nope = false;
    }

    assistent.saveReason = function(){
      shell.showLoading();
      var params = {assistent: shell.currentUser.username, reason: assistent.reason};
      statsApi.save(params).then(function(stat){
        assistent.cancel();
      },function(error){
        shell.setError(error);
      }).finally(shell.hideLoading);
    }

  }

})();
