describe('LoginController',function(){
  beforeEach(module('app'));
  // beforeEach(module('app.layout'));

  var shell;
  beforeEach(inject(function($rootScope,$controller){
    var scope = $rootScope.$new();
    login = $controller('Shell',{
      $scope:scope
    });
  }));

  describe("variable definition",function(){
    it("searchValue must be defined",function(){
      expect(shell.searchValue).toBeDefined();
    });
  });




});