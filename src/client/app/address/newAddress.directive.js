angular
  .module('app.cart')
  .directive('newAddress',newAddress);

newAddress.$inject = ['userApi','sepomexAPI'];

function newAddress(userApi, sepomexAPI){
  return{
    restrict: 'EA',
    templateUrl: 'app/address/address.form.html',
    scope: true,
    link:function(scope,element,attr){

      var shell =  scope.shell;

      if(scope.checkout)
        var checkout = scope.checkout

      if(scope.address)
        var address = scope.address;

      scope.newAddress = {};
      scope.states = [];
      scope.municipalities = [];
      scope.districts = [];

      getUbication();

      function getDistrict(zip){
        sepomexAPI.getDistrict(zip).then(function(result){
          var result = result.results[0];
          var state =  result.state;
          var municipality = result.municipality;
          var district = result.name;
          getUbication(state, municipality, district);
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      function getUbication(state, municipality, district){
        sepomexAPI.getStates().then(function(result){
          scope.states = result.results;
          scope.newAddress.state = state ? state : scope.states[0].name;
          return sepomexAPI.getMunicipalities(scope.newAddress.state);
        }).then(function(result){
          scope.municipalities = result.results;
          scope.newAddress.municipality =  scope.municipalities[0] && !municipality ? scope.municipalities[0].name : municipality;
          return sepomexAPI.getDistricts(scope.newAddress.state, scope.newAddress.municipality) 
        }).then(function(result){
          scope.districts = result.results;
          scope.newAddress.district =  scope.districts[0] && !district ? scope.districts[0].name : district;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.updateUbication =  function(){
        var zip = scope.newAddress.zip;
        getDistrict(zip);
      }

      scope.updateZip = function(){
        sepomexAPI.getZip(scope.newAddress.district, scope.newAddress.municipality, scope.newAddress.state).then(function(result){
          scope.addressForm.zip.$setViewValue(result.results[0].zip);
          scope.addressForm.zip.$render();
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.updateMunicipalities = function(){
        scope.newAddress.zip = null;
        sepomexAPI.getMunicipalities(scope.newAddress.state).then(function(result){
          scope.municipalities = result.results;
          if(scope.municipalities[0])
            scope.newAddress.municipality = scope.municipalities[0].name;
          return sepomexAPI.getDistricts(scope.newAddress.state, scope.newAddress.municipality) 
        }).then(function(result){
          scope.districts = result.results;
          if(scope.districts[0])
            scope.newAddress.district = scope.districts[0].name;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.updateDistricts = function(){
        scope.newAddress.zip = null;
        sepomexAPI.getDistricts(scope.newAddress.state, scope.newAddress.municipality).then(function(result){
          scope.districts = result.results;
          if(scope.districts[0])
            scope.newAddress.district = scope.districts[0].name;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.saveAddress = function(){
        if(scope.addressForm.$valid){
          shell.showLoading();
          scope.newAddress.user = {"__type":"Pointer",className:"_User","objectId":shell.currentUser.objectId}
          userApi.saveAddress(scope.newAddress).then(function(result){
    
            if(address && address.addresses){
              address.addresses.push(result);
            }
            
            if(checkout){
              // checkout.addresses.push(result);
              shell.shoppingCart.shippingAddress = result;
            }
            scope.newAddress = {};
            scope.addressForm.$setPristine();
            scope.showAddressForm(false);

          },function(error){
            console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
          }).finally(shell.hideLoading);
        }
      }
      
    }
  }
}