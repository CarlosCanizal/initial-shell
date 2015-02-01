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
    .state('checkout',{
      url:'/checkout',
      templateUrl:'app/cart/checkout/checkout.template.html'
    })
    .state('dashboard',{
      url:'/dashboard',
      templateUrl: 'app/dashboard/dashboard.template.html',
      data:{
        access: true,
        dashboard: true
      }
    })
    .state('dashboard.cards',{
      url:'/cards',
      templateUrl:'app/card/card.template.html',
      controller: 'Card',
      data:{
        menu: 'account',
        submenu: 'cards'
      }
    })
    .state('dashboard.account',{
      url:'/account',
      templateUrl:'app/account/account.template.html',
      // controller: 'Account',
      data:{
        menu: 'account',
        submenu: 'account'
      }
    })
    .state('dashboard.wallet',{
      url:'/wallet',
      templateUrl:'app/wallet/wallet.template.html',
      controller: 'Wallet',
      data:{
        menu: 'account',
        submenu: 'wallet'
      }
    })
    .state('dashboard.address',{
      url:'/address',
      templateUrl:'app/address/address.template.html',
      // controller: 'Address',
      data:{
        menu: 'account',
        submenu: 'address'
      }
    })
    .state('dashboard.profile',{
      url:'/profile',
      templateUrl:'app/profile/profile.template.html',
      // controller: 'Profile',
      data:{
        menu: 'account',
        submenu: 'profile'
      }
    })
    .state('dashboard.series',{
      url:'/series',
      templateUrl:'app/serie/series.template.html',
      controller: 'Series',
      data:{
        menu: 'series',
        submenu: 'series'
      }
    })
    .state('dashboard.serie',{
      url:'/series/:objectId',
      templateUrl:'app/serie/serie.template.html',
      controller: 'Serie',
      data:{
        menu: 'series',
        submenu: 'serie'
      }
    })
    .state('dashboard.order',{
      url:'/orders/:objectId',
      templateUrl:'app/order/order.template.html',
      controller: 'Order',
      data:{
        menu: 'orders',
        submenu: 'order'
      }
    })
    .state('dashboard.orders',{
      url:'/orders',
      templateUrl:'app/order/orders.template.html',
      controller: 'Orders',
      data:{
        menu: 'orders',
        submenu: 'orders'

      }
    });
  $urlRouterProvider.otherwise('/');
}