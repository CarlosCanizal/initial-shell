(function() {
  'use strict';

  angular
  .module('app.storage')
  .service('Message', Message);

  Message.$inject = [];

  function Message() {
    this.currentValue = false;
    this.showModal = false;

    this.setValue = function(newValue){
      this.currentValue = newValue;
    }

    this.setModal = function(newValue){
      this.showModal = newValue;
    }
  }
})();
