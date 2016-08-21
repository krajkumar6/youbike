ub.config(function($routeProvider){
	$routeProvider
	
	.when('/',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
	
	.when('/home/:id',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
	
	.when('/signup',{
		templateUrl: '../pages/signup.htm',
		controller:'mainController'
	})
    
    .when('/logout',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
    
    .when('/order',{
		templateUrl: '../pages/order.htm',
		controller:'orderctrl',
        authenticated: true
  	})
    
    .when('/vprofile',{
		templateUrl: '../pages/vprofile.htm',
		controller:'profctrl',
        authenticated: true
    })
    
      .when('/uprofile',{
		templateUrl: '../pages/uprofile.htm',
		controller:'profctrl',
        authenticated: true
    })
	
    .when('/appoint',{
		templateUrl: '../pages/appoi.htm',
		controller:'apctrl',
        authenticated: true
	})
    
});

ub.run(['$rootScope','$location','fbauthFact',function($rootScope,$location,fbauthFact){

// registering a listener for $routeChangeStart event
    $rootScope.$on('$routeChangeStart',function(event,next,current){
    if(next.$$route.authenticated){
        var userAuth = fbauthFact.getAccesstoken();
        if(!userAuth){
            $location.path('/');
        }
      }
});
    
}]);
