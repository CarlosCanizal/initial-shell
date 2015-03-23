(function() {
  'use strict';

  angular
    .module('app.layout')
    .controller('Shell',Shell);

  Shell.$inject = ['$scope','$state','$stateParams','userApi','storeApi','ShoppingCart','publisherApi'];

  function Shell($scope, $state,$stateParams, userApi, storeApi, ShoppingCart, publisherApi){
    // jshint validthis: true 
    var shell = this;

    shell.searchValue = null;
    shell.searchBox = null;
    shell.itemsList = [];
    shell.publishers = [];
    shell.errorResponse = null;
    shell.errorBar = false;
    shell.error = null;
    shell.message = null;
    shell.sideMenu = false;
    shell.loaded = false;
    shell.premierList = false;
    shell.publishersList = false;
    shell.initialSearch = 'recomendados';

    console.log($stateParams);
    if($stateParams.section && $stateParams.section != null){
      shell.initialSearch = $stateParams.section;
      alert(shell.initialSearch);
    }

    shell.title = 'Resultados';

    shell.currentUser  = userApi.currentUser();
    shell.loading = false;
    shell.isDashboard = false;
    shell.confirmation = false;
    shell.currentPublisher =null;
    shell.shelfLoaded = false;
    shell.landing = true;

    shell.shoppingCart = ShoppingCart.getTotal();

    shell.resetViews = function(event){
      if(shell.sideMenu)
        shell.sideMenu = false;
      shell.premierList = false;
      shell.publishersList = false;
    }

    shell.updateShoppingCart =  function(cart){
      shell.shoppingCart = cart;
      return shell.shoppingCart;
    };

    shell.hoverPremier = function(){
      shell.premierList = true;
      shell.publishersList = false;
    }
    shell.hoverPublishers = function(){
      shell.premierList = false;
      shell.publishersList = true;
    }

    shell.hideSubmenus = function(){
      shell.premierList = false;
      shell.publishersList = false;
    }

    shell.loadShelf = function(publisher){
      shell.landing = false;
      shell.searching = false;
      shell.premierList = false;
      shell.publishersList = false;
      shell.itemsList = [];
      shell.searchValue = null;
      shell.searchBox = null;
      shell.currentPublisher= publisher;
      shell.shelfLoaded = true;
    }

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
      shell.landing =false;
      shell.searching =true;
      shell.shelfLoaded = false;
      shell.itemsList = [];
      shell.searchValue = shell.searchBox;
      
    };

    shell.addToCart = function(item, qty){
        var quantity;
        quantity = qty ? parseInt(qty) : 1;
        shell.shoppingCart = ShoppingCart.addItem({quantity:quantity,
                                             objectId:item.objectId,
                                             price:item.price,
                                             name:item.name, 
                                             type: item.type,
                                             coverUrl:item.coverUrl,
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

    publisherApi.getPublishers().then(function(result){
      shell.publishers = result.results;
    },function(error){
      shell.setError(error);
    })
    
  }

})();
