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
    shell.title = 'Resultados';

    shell.currentUser  = userApi.currentUser();
    shell.loading = false;
    shell.isDashboard = false;
    shell.confirmation = false;

    //refactor
    shell.shoppingCart = ShoppingCart.getTotal();

    //quitar
    shell.updateShoppingCart =  function(cart){
      shell.shoppingCart = cart;
      return shell.shoppingCart;
    }

    $scope.getShoppingCart =  function(){
      return shell.shoppingCart;
    }


    //refactor

    $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      shell.isDashboard = toState.data && toState.data.dashboard ? true : false;
      shell.menu = toState.data && toState.data.menu ? toState.data.menu : null ;
      shell.submenu = toState.data && toState.data.submenu ? toState.data.submenu : null ;
    });

    shell.showLoading = function(){
      shell.loading = true;
    }

    shell.hideLoading = function(){
      shell.loading = false;
    }

    shell.showConfirmation = function(){
      shell.confirmation = true;
    }

    shell.hideConfirmation = function(){
      shell.confirmation = false;
    }

    shell.returnConfirmation = function(value){
      return value;
    }

    shell.setCurrentUser = function(user){
      console.log('setCurrentUser');
      userApi.setCurrentUser(user);
      shell.currentUser = user;
    }

    shell.updateCurrentUser = function(){
      userApi.getCurrentUser().then(function(user){
        shell.currentUser = user;
        userApi.setCurrentUser(user);

      },function(error){
        console.error(error);
      });
    }

    shell.logout = function(){
      userApi.logout();
      shell.currentUser = null;
      $state.go('home');
    }

    shell.searchByName = function(){
      var params = {
        name: shell.searchValue
      }
      storeApi.getSeries(params).then(function(series){
        console.log(series.result);
        shell.itemsList = series.result;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    shell.addToCart = function(item){
        shell.shoppingCart = ShoppingCart.addItem({quantity:1,
                                             objectId:item.objectId,
                                             price:item.price,
                                             name:item.name, 
                                             className:item.className,
                                             cover:item.cover,
                                             type: item.type,
                                             stock: item.stock
                                            });
    }

    shell.setError = function(error){
      // console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      console.log(error);
      shell.error = error;
    }
    
  }

})();
