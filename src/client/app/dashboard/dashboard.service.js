(function() {
  'use strict';

  angular
  .module('app.dashboard')
  .factory('Dashboard', Dashboard);

  Dashboard.$inject = ['localStorageService'];

  /* @ngInject */
  function Dashboard() {

    var isDashboard = false;
    return {
      get: get,
      set: set
    };

    function set(value){
      isDashboard = value;
    }

    function get(value){
      return isDashboard;
    }

  }
})();
