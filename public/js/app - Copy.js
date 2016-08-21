var ub = angular.module('ub',['ngRoute']);

ub.config(function($routeProvider){
	$routeProvider
	
	.when('/',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
	
	.when('/signup',{
		templateUrl: '../pages/signup.htm',
		controller:'signupController'
	})
	
	.when('/services/:id',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
	
	.when('/about/:id',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
	
	.when('/contact/:id',{
		templateUrl: '../pages/home.htm#contact',
		controller:'mainController'
	})
});

ub.controller('mainController',['$scope','$log','$location','$anchorScroll','$routeParams',function($scope,$log,$location,$anchorScroll,$routeParams){
	
	//console.log('we are inside main controller');
	//console.log($location.hash());
	//$anchorScroll();
	/*$scope.gotoabout=function(){
		/*$location.hash('about');
		$anchorScroll();
		$log.info('inside gotoabout');
	}; */
	//console.log($location);
	//$scope.gotoabout();
	console.log($routeParams.id);
	switch($routeParams.id)
	{
		case "2":
		$location.hash('services');		
		$anchorScroll();
		break;
		case "3":
		$location.hash('about');		
		$anchorScroll();
		break;
		case "4":
		$location.hash('contact');		
		$anchorScroll();
		
	};
	//console.log($location.hash());
	//$location.hash('about');
	//$anchorScroll();	
	
}]);

ub.controller('signupController',['$scope','$log',function($scope,$log){
	console.log('we are inside signup controller');
}]);