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
        'X-Parse-Application-Id': 'HCGa3edfKjokvwNQRuDgtZsjL5BYyJ6r9jm8aBmT',
        'X-Parse-REST-API-Key': 'wSO0vXjzy6jOKwRfYBEoVPlKYzu6oZKrJuV9rE2H'
      },
      conektaKeys:{
        'public': 'key_LDjQwU7xkazYxSRSoW7XWfQ',
        'planId': 'plan_ENQB7bHnKSuE7o76'
      }
    };
  }
})();
