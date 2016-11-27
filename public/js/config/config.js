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
	
	.when('/Register/Login',{
		templateUrl: '../pages/signup.htm',
		controller:'mainController'
	})
    
    .when('/Logout',{
		templateUrl: '../pages/home.htm',
		controller:'mainController'
	})
    
    .when('/Profile',{
		templateUrl: '../pages/vprofile.htm',
		controller:'profctrl'
 //       authenticated: true
    })
    
    .when('/Bikes',{
		templateUrl: '../pages/vbike.htm',
		controller:'bikectrl'
    })
    
    .when('/addbike',{
		templateUrl: '../pages/addbike.htm',
		controller:'bikectrl'
    })
    
      .when('/uprofile',{
		templateUrl: '../pages/uprofile.htm',
		controller:'profctrl'
    })
	
    .when('/Appointment',{
		templateUrl: '../pages/vappo.htm',
		controller:'apctrl'
	})
    .when('/addappo',{
		templateUrl: '../pages/addappo.htm',
		controller:'apctrl'
	})
    
    .when('/ftservices',{
		templateUrl: '../pages/signedin/services.htm'
	})
    
    .when('/ftabout',{
		templateUrl: '../pages/signedin/about.htm'
	})
    
    .when('/ftfaq',{
		templateUrl: '../pages/signedin/faq.htm'
	})
    
    .when('/ftpricing',{
		templateUrl: '../pages/signedin/pricing.htm'
	})
    
    .when('/fthome',{
		templateUrl: '../pages/signedin/home.htm'
	})
    
});


/*
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
    
}]);*/
