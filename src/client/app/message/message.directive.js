angular
  .module('app.dashboard')
  .directive('confirmMessage',confirmMessage);

confirmMessage.$inject = ['Message'];

function confirmMessage(Message){
  return{
    restrict: 'EA',
    scope: true,
    // templateUrl: 'app/message/message.template.html',
    link:function(scope, element, attribute){

      scope.show= false;
      console.log(Message);


      scope.showModal = function(event){
        Message.setModal(true);
      }

      scope.hideModal = function(){
        Message.setModal(false);
      }

      scope.$watch(
        function() {
          return Message.currentValue;
        },
        function() {
          if(Message.currentValue == true){
            console.log('viewer', 'Change detected, new object:', Message.currentValue);
            Message.setValue(false);
            console.log('attribute',attribute.confirm);
            scope.$eval(attribute.confirm);
          }
          // angular.copy(Message.currentObject, scope.show);
        },
        true // No need to be true
      );


    }
  }
}