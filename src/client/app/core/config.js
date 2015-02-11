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
      controllerAs: 'login',
      templateUrl:'app/login/login.template.html'
    })
    .state('subscribe',{
      url:'/suscripciones',
      templateUrl:'app/subscribe/subscribe.template.html'
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
    .state('dashboard.payment',{
      url:'/payment',
      templateUrl:'app/payment/payment.template.html',
      controller: 'Payment',
      controllerAs: 'payment',
      data:{
        menu: 'account',
        submenu: 'cards'
      }
    })
    .state('dashboard.account',{
      url:'/account',
      templateUrl:'app/account/account.template.html',
      controller: 'Account',
      controllerAs: 'account',
      data:{
        menu: 'account',
        submenu: 'account'
      }
    })
    .state('dashboard.wallet',{
      url:'/wallet',
      templateUrl:'app/wallet/wallet.template.html',
      controller: 'Wallet',
      controllerAs: 'wallet',
      data:{
        menu: 'account',
        submenu: 'wallet'
      }
    })
    .state('dashboard.address',{
      url:'/address',
      templateUrl:'app/address/address.template.html',
      controller: 'Address',
      controllerAs: 'address',
      data:{
        menu: 'account',
        submenu: 'addresses'
      }
    })
    .state('dashboard.profile',{
      url:'/profile',
      templateUrl:'app/profile/profile.template.html',
      controller: 'Profile',
      controllerAs: 'profile',
      data:{
        menu: 'account',
        submenu: 'profile'
      }
    })
    .state('dashboard.series',{
      url:'/series',
      templateUrl:'app/serie/series.template.html',
      controller: 'Series',
      controllerAs: 'series',
      data:{
        menu: 'series',
        submenu: 'series'
      }
    })
    .state('dashboard.serie',{
      url:'/series/:objectId',
      templateUrl:'app/serie/serie.template.html',
      controller: 'Serie',
      controllerAs: 'serie',
      data:{
        menu: 'series',
        submenu: 'serie'
      }
    })
    .state('dashboard.order',{
      url:'/orders/:objectId',
      templateUrl:'app/order/order.template.html',
      controller: 'Order',
      controllerAs: 'order',
      data:{
        menu: 'orders',
        submenu: 'order'
      }
    })
    .state('dashboard.orders',{
      url:'/orders',
      templateUrl:'app/order/orders.template.html',
      controller: 'Orders',
      // controllerAs: 'order',
      data:{
        menu: 'orders',
        submenu: 'orders'

      }
    })
    .state('admin',{
      url:'/admin',
      templateUrl: 'app/admin/admin.template.html',
      data:{
        access: true,
        admin: true
      }
    })
    .state('admin.sales',{
      url:'/sales',
      templateUrl: 'app/admin/sales/sales.template.html',
      controller: 'Sales',
      controllerAs: 'sales',
      data:{
        access: true,
        admin: true
      }
    })
    .state('admin.subscriptions',{
      url:'/subscriptions',
      templateUrl: 'app/admin/subscriptions/subscriptions.template.html',
      controller: 'Subscriptions',
      controllerAs: 'subscriptions',
      data:{
        access: true,
        admin: true
      }
    })
    .state('admin.orders',{
      url:'/orders',
      templateUrl: 'app/admin/orders/orders.template.html',
      controller: 'Orders',
      controllerAs: 'orders',
      data:{
        access: true,
        admin: true
      }
    })
    .state('admin.order',{
      url:'/orders/:objectId',
      templateUrl:'app/order/order.template.html',
      controller: 'Order',
      controllerAs: 'order',
      data:{
        access: true,
        admin: true,
      }
    })
    .state('admin.preorders',{
      url:'/preorders',
      templateUrl: 'app/admin/preorders/preorders.template.html',
      controller: 'Preorders',
      controllerAs: 'preorders',
      data:{
        access: true,
        admin: true
      }
    })
    .state('admin.users',{
      url:'/users',
      templateUrl: 'app/admin/users/users.template.html',
      controller: 'Users',
      controllerAs: 'users',
      data:{
        access: true,
        admin: true
      }
    })
    .state('admin.userProfile',{
      url:'/users/:objectId/profile',
      templateUrl: 'app/profile/profile.template.html',
      controller: 'UserProfile',
      controllerAs: 'profile',
      data:{
        access: true,
        admin: true
      }
    });
  $urlRouterProvider.otherwise('/');
}