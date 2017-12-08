var myApp = angular.module('myApp', [ 'ngRoute', 'nrzLightify', 'angular-cookie-law', 'ui.bootstrap']);   
 
myApp.config(['$routeProvider','$httpProvider', '$provide',  '$locationProvider',
      function($routeProvider, $httpProvider, $provide,  $locationProvider ) {
// You can not ask for instance during configuration phase - you can ask only for providers.	 
// runs once only
 $locationProvider.hashPrefix(''); // prevents #! with Angular 1.6.x
	$routeProvider.					
		when('/home', {
						templateUrl: './partials/home.html',
						controller: 'HomeCtrl'
					  }).												   	 						
		otherwise({
						redirectTo: '/home'
					  });	
  }]); 
 
myApp.controller("HomeCtrl", [ '$scope', 'xxxx', 'nrzLightify',
    function ($scope, xxxx, nrzLightify) {
        $scope.name = "Home";
        $scope.person =  {"name": "beta", "email" : "beta@example.com"};
        $scope.modelData = xxxx.getModel();
        
        $scope.persons = [];
        
        $scope.resetPersons = function (m)
         {  
			console.log(m);
            var msg = m || "Resetting";
			nrzLightify({
					type: 'info',
				text: msg,
				},  5000);

            $scope.persons = [  {"name": "one", "email" : "one@example.com"},
                                {"name": "two", "email" : "two@example.com"},
                                {"name": "three", "email" : "three@example.com"}
                             ];                   
         };    
		 
        $scope.resetPersons( "initialising the person array" ); // run this on page load
    }
     ]);

myApp.service('xxxx', [function () {	
	function yyy(){return   {"name": "alpha", "email" : "alpha@example.com"};}
	return {
		getModel :  yyy
	};
}]);

myApp.directive('aDirectiveTemplate', [function ( ) { // custom directive
    return {
        template: 'Name: {{person.name}}<br /> email: {{person.email}}'
    };
}]);

myApp.directive('personDetails', ['$compile', '$templateCache',function ($compile, $templateCache ) { // custom directive
    
  	  function controllerFunction($scope) {  // initialize scope or set methods etc
 
         $scope.clearPerson = function () // a local function
         {
          //  $scope.person = {"name": "", "email" : ""}; // creates a new object and does not as work expected
              $scope.person.name = "";
              $scope.person.email = "";            
         };
		 
		 $scope.resetFromLocal = function(x)  {
 		 $scope.resetPersonInParent( { 'msg' : x } ) ; 
		} ;
	  }		
    
   return { // there are other attributes that can be returned
        restrict: 'E', //E = element, A = attribute, C = class, M = comment         
        scope: { //@ reads the attribute value, = provides two-way binding, & works with functions
            title: '@',
            person: '=', // a single person
            resetPersonInParent: '&resetMethod'
            },
        template: '<hr><div>{{title}})<br>Name: {{person.name}}<br /> email: {{person.email}}</div><input type="text" ng-model="person.name"/><br><input type="text" ng-model="person.email"/><button ng-click="clearPerson()">X</button>&nbsp;<button ng-click="resetFromLocal(  \'Resetting All Persons\'  )">Reset</button>',
        //  templateUrl: 'mytemplate.html', // issues with dynamic refresh etc
        controller: ['$scope',  controllerFunction],
        
        link: function ($scope, element, attrs) // does not require the minification array syntax
        { 
            //DOM manipulation tasks
            //var dynamicHTML = $templateCache.get("....../carddetails.html");
            //element.html(dynamicHTML);  
            //$compile(element.contents())(scope); 
        }       
    };
}]);