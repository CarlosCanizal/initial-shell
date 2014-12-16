angular
.module('app')
.config(config)

config.$inject = ['$urlRouterProvider','$stateProvider'];

function config($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');
}