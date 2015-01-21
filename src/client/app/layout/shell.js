(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','$state','userApi','storeApi','ShoppingCart'];

  function Shell($scope, $state, userApi, storeApi, ShoppingCart){
    // jshint validthis: true 
    var vm = this;
    vm.searchValue = null;
    vm.itemsList = [];
    vm.title = 'Resultados';
    vm.cartItems = ShoppingCart.getTotal();
    vm.currentUser  = userApi.currentUser();
    vm.loading = false;
    vm.isDashboard = false;
    vm.confirm = false;

    $scope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
      vm.isDashboard = toState.data && toState.data.dashboard ? true : false;
      vm.menu = toState.data && toState.data.menu ? toState.data.menu : null ;
      vm.submenu = toState.data && toState.data.submenu ? toState.data.submenu : null ;
    });

    $scope.showLoading = function(){
      vm.loading = true;
    }

    $scope.hideLoading = function(){
      vm.loading = false;
    }

    $scope.setCurrentUser = function(user){
      console.log('setCurrentUser');
      userApi.setCurrentUser(user);
      vm.currentUser = user;
    }

    $scope.updateCurrentUser = function(){
      userApi.getCurrentUser().then(function(user){
        vm.currentUser = user;
        userApi.setCurrentUser(user);

      },function(error){
        console.error(error);
      });
    }

    $scope.getCurrentUser = function(){
      return vm.currentUser;
    }

    $scope.logout = function(){
      userApi.logout();
      vm.currentUser = null;
      $state.go('home');
    }

    vm.searchByName = function(){
      var params = {
        name: vm.searchValue
      }
      storeApi.getSeries(params).then(function(series){
        console.log(series.result);
        vm.itemsList = series.result;
      },function(error){
        console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
      });
    }

    $scope.addToCart = function(item){
        vm.cartItems = ShoppingCart.addItem({quantity:1,
                                             objectId:item.objectId,
                                             price:item.price,
                                             name:item.name, 
                                             className:item.className,
                                             cover:item.cover,
                                             type: item.type,
                                             stock: item.stock
                                            });
    }

    // $scope.setCartItems  = function(cartItems){
    //   vm.cartItems = cartItems;
    // }
    
  }

})();
