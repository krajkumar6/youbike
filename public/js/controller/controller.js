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
        break;
        case "5":
		$location.hash('faq');		
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

ub.controller('profctrl',["$scope","fbauthFact","formsub","$log","$timeout",function($scope,fbauthFact,formsub,$log,$timeout){
    $log.log("In Profile controller");
    $scope.msg = "";
    $scope.usr ={};
   var fbresponse = fbauthFact.getResponseobj();
   formsub.getprof(fbresponse).then(function(response){
        $scope.usr = response;
        $log.log('$scope.usr',$scope.usr);
    });
    
   $scope.submit = function(){
        
        formsub.submit($scope.usr).then(function(response){
                $scope.msg=response;
                },function(reason){
                $scope.msg=reason;
            });
    };//submit
}]);

ub.controller('apctrl',["$scope","fbauthFact","$log",function($scope,fbauthFact,$log){
    $log.log("In Appointment controller");
    var fbresponse = fbauthFact.getResponseobj();
    $scope.name = fbresponse.first_name;
    
}]);

ub.controller('bikectrl',["$scope","fbauthFact","$log","bike",function($scope,fbauthFact,$log,bike){
    $log.log("In bike controller");
    $scope.msg = "";
    $scope.bikes =[];//bikes array to store bikes retrieved for a user
    $scope.bike ={};//bike object to submit details of bike
    //var bike ={};
    var idx;
    
    $scope.usr = fbauthFact.getResponseobj();
    
    bike.getbikes($scope.usr).then(function(response){
        $scope.bikes = response;
    },function(reason){
        $scope.msg = reason;
    });//getbikes
    
    $scope.delbike = function(idx){
        $scope.bikes.splice(idx,1);
        bike.delbike($scope.bikes[idx]).then(function(response){
          $scope.msg = response;
        },function(reason){
            $scope.msg = reason;
        });
    };
    
    $scope.subbike = function(){
        $scope.bike.email = $scope.usr.email;
        bike.subbike($scope.bike).then(function(response){
           $scope.msg= response;
        },function(reason){
            $scope.msg=reason;
        });
    };//subbike
    
    $scope.year = ['2000','2001','2002','2003','2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015','2016'];
    
}]);