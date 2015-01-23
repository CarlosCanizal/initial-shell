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

      scope.states = [];
      scope.municipalities = [];
      scope.districts = [];

      getUbication();
      console.log(scope.addressFormView);

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
          scope.address.state = state ? state : scope.states[0].name;
          return sepomexAPI.getMunicipalities(scope.address.state);
        }).then(function(result){
          scope.municipalities = result.results;
          scope.address.municipality =  scope.municipalities[0] && !municipality ? scope.municipalities[0].name : municipality;
          return sepomexAPI.getDistricts(scope.address.state, scope.address.municipality) 
        }).then(function(result){
          scope.districts = result.results;
          scope.address.district =  scope.districts[0] && !district ? scope.districts[0].name : district;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.updateUbication =  function(){
        var zip = scope.address.zip;
        getDistrict(zip);
      }

      scope.updateZip = function(){
        sepomexAPI.getZip(scope.address.district, scope.address.municipality, scope.address.state).then(function(result){
          scope.addressForm.zip.$setViewValue(result.results[0].zip);
          scope.addressForm.zip.$render();
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.updateMunicipalities = function(){
        scope.address.zip = null;
        sepomexAPI.getMunicipalities(scope.address.state).then(function(result){
          scope.municipalities = result.results;
          if(scope.municipalities[0])
            scope.address.municipality = scope.municipalities[0].name;
          return sepomexAPI.getDistricts(scope.address.state, scope.address.municipality) 
        }).then(function(result){
          scope.districts = result.results;
          if(scope.districts[0])
            scope.address.district = scope.districts[0].name;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.updateDistricts = function(){
        scope.address.zip = null;
        sepomexAPI.getDistricts(scope.address.state, scope.address.municipality).then(function(result){
          scope.districts = result.results;
          if(scope.districts[0])
            scope.address.district = scope.districts[0].name;
        },function(error){
          console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
        });
      }

      scope.saveAddress = function(){
        if(scope.addressForm.$valid){
          scope.showLoading();
          scope.address.user = {"__type":"Pointer",className:"_User","objectId":scope.currentUser.objectId}
          userApi.saveAddress(scope.address).then(function(address){
            console.log(address);
            if(scope.addresses)
              scope.addresses.push(address);
            if(scope.shoppingCart){
              scope.shoppingCart.shippingAddress = address;
            }
            scope.address = {};
            scope.addressForm.$setPristine();
            scope.showAddressForm(false);
          },function(error){
            console.error('status: '+error.status+', statusText: '+error.statusText+', error: '+error.data.error);
          }).finally(scope.hideLoading);
        }
      }
      
    }
  }
}