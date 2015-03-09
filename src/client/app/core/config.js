angular
.module('app')
.config(config);

config.$inject = ['$locationProvider', '$urlRouterProvider','$stateProvider'];

function config($locationProvider,$urlRouterProvider, $stateProvider) {

  // $locationProvider.html5Mode(true);

  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'app/layout/shell.html',
      data:{
        menu: 'home',
        submenu: 'store'
      }
    })
    .state('item', {
      url:'/item/:objectId',
      templateUrl: 'app/item/item.template.html',
      controller: 'Item',
      controllerAs: 'item',
      resolve: {
        info: function(productsApi, $stateParams){
          var objectId = $stateParams.objectId;
          return productsApi.getProduct($stateParams.objectId);
        }
      },
      data:{
        menu: 'home',
        submenu: 'store'
      }
    })
    .state('login',{
      url:'/login',
      controller: 'Login',
      controllerAs: 'login',
      templateUrl:'app/login/login.template.html',
      data:{
        menu: 'login',
        submenu: 'login'
      }
    })
    .state('forgot',{
      url:'/forgot-password',
      controller: 'Forgot',
      controllerAs: 'forgot',
      templateUrl:'app/forgot/forgot.template.html',
      data:{
        menu: 'login',
        submenu: 'login'
      }
    })
    .state('privacy',{
      url:'/aviso-de-privacidad',
      templateUrl:'app/privacy/privacy.template.html',
      data:{
        menu: 'privacy',
        submenu: 'privacy'
      }
    })
    .state('subscribe',{
      url:'/suscripciones',
      templateUrl:'app/subscribe/subscribe.template.html',
      data:{
        menu: 'suscribe',
        submenu: 'suscribe'
      }
    })
    .state('about',{
      url:'/como-funciona',
      templateUrl:'app/about/about.template.html',
      data:{
        menu: 'about',
        submenu: 'about'
      }
    })
    .state('checkout',{
      url:'/checkout',
      templateUrl:'app/cart/checkout/checkout.template.html',
      data:{
        menu: 'home',
        submenu: 'store'
      }
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
        submenu: 'address'
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
        menu: 'orders',
        submenu: 'sales'
      }
    })
    .state('admin.assistent',{
      url:'/assistent',
      templateUrl: 'app/admin/assistent/assistent.template.html',
      controller: 'Assistent',
      controllerAs: 'assistent',
       data:{
        menu: 'orders',
        submenu: 'assistent'
      }
    })
    .state('admin.assistentUser',{
      url:'/assistent/:userId',
      templateUrl: 'app/admin/assistent/user.template.html',
      controller: 'AssistentUser',
      controllerAs: 'assistentUser',
      resolve:{
        user : function(userApi,$stateParams){
          return userApi.getUser($stateParams.userId);
        }
      },
      data:{
        menu: 'orders',
        submenu: 'assistent'
      }
    })
    .state('admin.subscriptions',{
      url:'/subscriptions',
      templateUrl: 'app/admin/subscriptions/subscriptions.template.html',
      controller: 'Subscriptions',
      controllerAs: 'subscriptions'
    })
    .state('admin.orders',{
      url:'/orders',
      templateUrl: 'app/admin/orders/orders.template.html',
      controller: 'AdminOrders',
      controllerAs: 'orders',
       data:{
        menu: 'orders',
        submenu: 'orders'
      }


    })
    .state('admin.order',{
      url:'/orders/:objectId',
      templateUrl:'app/order/order.template.html',
      controller: 'Order',
      controllerAs: 'order',
       data:{
        menu: 'orders',
        submenu: 'order'
      }
    })
    .state('admin.preorders',{
      url:'/preorders',
      templateUrl: 'app/admin/preorders/preorders.template.html',
      controller: 'Preorders',
      controllerAs: 'preorders'
    })
    .state('admin.users',{
      url:'/users',
      templateUrl: 'app/admin/users/users.template.html',
      controller: 'Users',
      controllerAs: 'users',
      data:{
        menu: 'users',
        submenu: 'users'
      }
    })
    .state('admin.user',{
      url:'/users/:userId',
      template: '<ui-view></ui-view>',
      controller: 'View',
      controllerAs: 'view',
      resolve:{
        user: function(userApi,$stateParams){
          return userApi.getUser($stateParams.userId);
        }
      }
    })
    .state('admin.user.profile',{
      url:'/profile',
      templateUrl: 'app/profile/profile.template.html',
      controller: 'Profile',
      controllerAs: 'profile',
       data:{
        menu: 'users',
        submenu: 'profile'
      }
    })
    .state('admin.user.orders',{
      url:'/orders',
      templateUrl: 'app/admin/orders/orders.template.html',
      controller: 'AdminOrders',
      controllerAs: 'orders',
      data:{
        menu: 'users',
        submenu: 'orders'
      }
    })
    .state('admin.user.payment',{
      url:'/payment',
      templateUrl: 'app/payment/payment.template.html',
      controller: 'AdminPayment',
      controllerAs: 'payment',
       data:{
        menu: 'users',
        submenu: 'payment'
      }
    })
    .state('admin.user.address',{
      url:'/address',
      templateUrl: 'app/address/address.template.html',
      controller: 'Address',
      controllerAs: 'address',
       data:{
        menu: 'users',
        submenu: 'address'
      }
    })
    .state('admin.user.wallet',{
      url:'/wallet',
      templateUrl: 'app/admin/users/wallet/wallet.template.html',
      controller: 'AdminWallet',
      controllerAs: 'wallet',
       data:{
        menu: 'users',
        submenu: 'wallet'
      }
    })
    .state('admin.user.series',{
      url:'/series',
      templateUrl: 'app/admin/users/series/series.template.html',
      controller: 'AdminSeries',
      controllerAs: 'series',
       data:{
        menu: 'users',
        submenu: 'series'
      }
    })
    .state('admin.user.serie',{
      url:'/series/:objectId',
      templateUrl: 'app/admin/users/series/series.template.html',
      controller: 'Serie',
      controllerAs: 'series',
       data:{
        menu: 'users',
        submenu: 'series'
      }
    })
    .state('admin.user.account',{
      url:'/account',
      templateUrl: 'app/admin/users/account/account.template.html',
      controller: 'Account',
      controllerAs: 'account',
       data:{
        menu: 'users',
        submenu: 'account'
      }
    })
    .state('admin.products',{
      url:'/products',
      templateUrl: 'app/admin/products/products.template.html',
      controller: 'Products',
      controllerAs: 'products',
       data:{
        menu: 'products',
        submenu: 'products'
      }
    })
    .state('admin.newProduct',{
      url:'/products/new',
      templateUrl: 'app/admin/products/new.template.html',
      controller: 'newProduct',
      controllerAs: 'product',
      data:{
        menu: 'products',
        submenu: 'product'
      }
    })
    .state('admin.product',{
      url:'/products/:productId',
      templateUrl: 'app/admin/products/product.template.html',
      controller: 'Product',
      controllerAs: 'product',
      resolve:{
        info: function(productsApi,$stateParams){
          return productsApi.getProduct($stateParams.productId);
        }
      },
      data:{
        menu: 'products',
        submenu: 'product'
      }
    })
    .state('admin.publishers',{
      url:'/publishers',
      templateUrl: 'app/admin/publishers/publishers.template.html',
      controller: 'Publishers',
      controllerAs: 'publishers',
       data:{
        menu: 'publishers',
        submenu: 'publishers'
      }
    })
    .state('admin.newPublisher',{
      url:'/publishers/new',
      templateUrl: 'app/admin/publishers/new.template.html',
      controller: 'newPublisher',
      controllerAs: 'publisher',
      data:{
        menu: 'publishers',
        submenu: 'publisher'
      }
    })
    .state('admin.publisher',{
      url:'/publishers/:publisherId',
      templateUrl: 'app/admin/publishers/publisher.template.html',
      controller: 'Publisher',
      controllerAs: 'publisher',
      resolve:{
        info: function(publisherApi,$stateParams){
          return publisherApi.getPublisher($stateParams.publisherId);
        }
      },
      data:{
        menu: 'publishers',
        submenu: 'publishers'
      }
    })
    .state('admin.series',{
      url:'/series',
      templateUrl: 'app/admin/series/series.template.html',
      controller: 'Series',
      controllerAs: 'series',
       data:{
        menu: 'series',
        submenu: 'series'
      }
    })
    .state('admin.newSerie',{
      url:'/series/new',
      templateUrl: 'app/admin/series/new.template.html',
      controller: 'newSerie',
      controllerAs: 'serie',
      data:{
        menu: 'series',
        submenu: 'series'
      }
    })
    .state('admin.serie',{
      url:'/series/:serieId',
      templateUrl: 'app/admin/series/serie.template.html',
      controller: 'Serie',
      controllerAs: 'serie',
      resolve:{
        info: function(serieApi,$stateParams){
          return serieApi.getSerie($stateParams.serieId);
        }
      },
      data:{
        menu: 'series',
        submenu: 'series'
      }
    });
  $urlRouterProvider.otherwise('/');
}