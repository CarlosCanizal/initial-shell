(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','$state','userApi','storeApi','ShoppingCart'];

  function Shell($scope, $state, userApi, storeApi, ShoppingCart){
    // jshint validthis: true 
    var shell = this;

    shell.searchValue = null;
    shell.itemsList = [];
    shell.errorResponse = null;
    shell.errorBar = false;
    shell.error = null;
    shell.message = null;
    shell.sideMenu = false;
    shell.loaded = false;


    shell.title = 'Resultados';

    shell.currentUser  = userApi.currentUser();
    shell.loading = false;
    shell.isDashboard = false;
    shell.confirmation = false;

    shell.shoppingCart = ShoppingCart.getTotal();

    shell.updateShoppingCart =  function(cart){
      shell.shoppingCart = cart;
      return shell.shoppingCart;
    };

    $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      if(!shell.loaded)
        shell.loaded = true;
      
      shell.isDashboard = toState.data && toState.data.dashboard ? true : false;
      shell.isAdmin = toState.data && toState.data.admin ? true : false;
      shell.menu = toState.data && toState.data.menu ? toState.data.menu : null ;
      shell.submenu = toState.data && toState.data.submenu ? toState.data.submenu : null ;
    });

    shell.showLoading = function(){
      shell.initError();
      shell.loading = true;
    };

    shell.hideLoading = function(){
      shell.loading = false;
    };

    shell.showConfirmation = function(){
      shell.confirmation = true;
    };

    shell.hideConfirmation = function(){
      shell.confirmation = false;
    };

    shell.returnConfirmation = function(value){
      return value;
    };

    shell.setCurrentUser = function(user){
      console.log('setCurrentUser');
      userApi.setCurrentUser(user);
      shell.currentUser = user;
    };

    shell.updateCurrentUser = function(){
      userApi.getCurrentUser().then(function(user){
        shell.currentUser = user;
        userApi.setCurrentUser(user);

      },function(error){
        shell.setError(error);
      });
    };

    shell.logout = function(){
      userApi.logout();
      shell.currentUser = null;
      $state.go('home');
    };

    shell.searchByName = function(){
      var params = {
        name: shell.searchValue
      };
      storeApi.getSeries(params).then(function(series){
        console.log(series.result);
        shell.itemsList = series.result;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    };

    shell.addToCart = function(item, qty){
        var quantity;
        quantity = qty ? parseInt(qty) : 1;
        shell.shoppingCart = ShoppingCart.addItem({quantity:quantity,
                                             objectId:item.objectId,
                                             price:item.price,
                                             name:item.name, 
                                             type: item.type,
                                             cover:item.cover,
                                             available: item.available,
                                             stock: item.stock
                                            });
    };

    shell.setError = function(error){
      console.log(error);
      shell.errorResponse = error;
      shell.errorBar = true;
      if(error.message_to_purchaser){
        shell.errorBar = false;
        shell.error = error.message_to_purchaser;
      }
      // else if(error.data){
      //  shell.errorBar = false;
      if(error.data){
       shell.errorBar = false;
       shell.error = error.data.error; 
      }
      // }
    };

    shell.setMessage = function(message){
      shell.message = message;
    };

    shell.initError  = function(){
      shell.errorResponse = null;
      shell.errorBar = false;
      shell.error = null;
      shell.message = null;
    };

    shell.showSideMenu = function(showIt){
      shell.sideMenu = showIt;
    };
    
  }

})();
