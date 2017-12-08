// http://andyshora.com/unit-testing-best-practices-angularjs.html
describe('app.js test', function() {

  var someService;
  
  var element;

  beforeEach(module('myApp'));
  /*
  beforeEach(inject(function($injector) {
    someService = $injector.get('someService');
  }));
  */
  
    function a() {return 0;}
	/*
	beforeEach(inject(function ($controller, $rootScope) {
        scope = $rootScope.$new();
        scope.page3 = {};
        InformationController = $controller('HomeCtrl', {
            $scope: scope
        });
    }));  
	*/
  
  it('alpha 1', function() {
	  expect(a()).toBe(0);
   // expect(someService.fibonacci(0)).toBe(0);
	});

  it('alpha 2', function() {
	  expect(a()).toBe(0);
   // expect(someService.fibonacci(0)).toBe(0);
	});  
  
  
    it('test an element', function() {
		
	//browser().navigateTo('#/home');
    expect(browser().location().path()).toBe("/home");		
		
		
		
	 // expect(element('#t123').html()).toContain('Hello !');
	});  
  
  
  
  
  
  
});