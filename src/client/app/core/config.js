angular
.module('app')
.config(config)

config.$inject = ['$locationProvider', '$urlRouterProvider','$stateProvider'];

function config($locationProvider,$urlRouterProvider, $stateProvider) {

  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'app/layout/shell.html'
    })
    .state('login',{
      url:'/login',
      controller: 'Login',
      templateUrl:'app/login/login.template.html'
    })
    .state('suscribe',{
      url:'/suscripciones',
      templateUrl:'app/suscribe/suscribe.template.html'
    })
    .state('about',{
      url:'/como-funciona',
      templateUrl:'app/about/about.template.html'
    })
    .state('cards',{
      url:'/cards',
      templateUrl:'app/card/card.template.html',
      controller: 'Card'
    });
  $urlRouterProvider.otherwise('/');
}