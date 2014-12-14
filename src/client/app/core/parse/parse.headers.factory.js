(function() {
  'use strict';

  angular
  .module('app.core')
  .factory('parseheaders', parseheaders);

  parseheaders.$inject = [];

  /* @ngInject */
  function parseheaders() {

    return {
      mxpostapi: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': 'K6fafnegdVE32PXOMrOELlS70ZHxLqcHiQTA8Tq6',
        'X-Parse-REST-API-Key': 'g15AcAKamIKsgxE4nqtA2KlSMc5Tk8rdkq0l1ZYl'
      },
      storeKeys: {
        'Content-Type': 'application/json',
        'X-Parse-Application-Id': '2KXbxfnsWw8UxGdbuzfUCkElRkwLsTvskbZAOZm0',
        'X-Parse-REST-API-Key': 'T5Cp4DDp1Rl5vAa4iRlotNrvfW2fxE0esikIgfBr'
      }
    };
  }
})();
