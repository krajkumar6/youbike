ub.controller('mainController',['$scope','$log','$http','fbauthFact','$location','$anchorScroll','$routeParams',function($scope,$log,$http,fbauthFact,$location,$anchorScroll,$routeParams){
	
    $scope.profpic="";
    $scope.msg="";
    $scope.isAuth = false;
    
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
    
	
    
    $scope.fblogin= function(){
        fbauthFact.fblogin().then(
                function(response){
                $scope.isAuth = fbauthFact.isAuth;
                $scope.msg= fbauthFact.msg;
                $scope.profpic=fbauthFact.profpic;
                //$scope.accesstoken=fbauthFact.accesstoken;
                //$scope.$apply();
                $log.log("fblogin() - success :"+response);
                $log.log("$scope.msg: "+$scope.msg);
                $log.log("$scope.isAuth:"+$scope.isAuth);
                $log.log("$scope.profpic:"+$scope.profpic);
                
            },function(reason){
                 $log.log("fblogin() - failure :Need to login to the application :"+reason);
            })
            
        };//fblogin
  
    $scope.fblogout = function(){
        
        fbauthFact.fblogout().then(
        function(response){
            $scope.msg=fbauthFact.msg;
        },function(reason){
            $scope.msg="Logout Error!! Pls check Logs";
        }
        );
    };
        
    //fblogout
    
}]);//mainController

ub.controller('orderctrl',["$scope","fbauthFact","$log",function($scope,fbauthFact,$log){
    $log.log("In Order controller");
    var fbresponse = fbauthFact.getResponseobj();
    $scope.name = fbresponse.first_name;
    
}]);

ub.controller('profctrl',["$scope","fbauthFact","formsub","$log",function($scope,fbauthFact,formsub,$log){
    $log.log("In Profile controller");
    $scope.msg = "";
    var fbresponse = fbauthFact.getResponseobj();
   
    
    $scope.reset = function(){
        $scope.user = formsub.getprof();
    };
    $scope.reset();//calling reset by default
    
    $scope.submit = function(user){
        $scope.user.email=fbresponse.email;
        formsub.submit($scope.user).then(function(response){
                $scope.msg=response;
                },function(reason){
                $scope.msg=reason;
            });
    };
    
    
  
}]);

ub.controller('apctrl',["$scope","fbauthFact","$log",function($scope,fbauthFact,$log){
    $log.log("In Appointment controller");
    var fbresponse = fbauthFact.getResponseobj();
    $scope.name = fbresponse.first_name;
    
}]);