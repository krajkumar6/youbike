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
    
    .when('/vprofile',{
		templateUrl: '../pages/vprofile.htm',
		controller:'profctrl'
 //       authenticated: true
    })
    
    .when('/vbike',{
		templateUrl: '../pages/vbike.htm',
		controller:'bikectrl',
        authenticated: true
    })
    
    .when('/addbike',{
		templateUrl: '../pages/addbike.htm',
		controller:'bikectrl',
        authenticated: true
    })
    
      .when('/uprofile',{
		templateUrl: '../pages/uprofile.htm',
		controller:'profctrl',
        authenticated: true
    })
	
    .when('/appoint',{
		templateUrl: '../pages/vappo.htm',
		controller:'apctrl',
        authenticated: true
	})
    .when('/addappo',{
		templateUrl: '../pages/addappo.htm',
		controller:'apctrl',
        authenticated: true
	})
    
});

ub.run(['$rootScope','$location','auth',function($rootScope,$location,auth){

// registering a listener for $routeChangeStart event
    $rootScope.$on('$routeChangeStart',function(event,next,current){
    if(next.$$route.authenticated){
        var userAuth = auth.getAccesstoken();
        if(!userAuth){
            $location.path('/');
        }
      }
});
    
}]);
