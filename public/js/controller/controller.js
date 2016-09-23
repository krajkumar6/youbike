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
    $scope.regno="";
    //var bike ={};
    var idx;
    
    $scope.usr = fbauthFact.getResponseobj();
    
    bike.getbikes($scope.usr).then(function(response){
        $scope.bikes = response;
    },function(reason){
        $scope.msg = reason;
    });//getbikes
    
    $scope.delbike = function(idx){
        
        bike.delbike($scope.bikes[idx]).then(function(response){
            $scope.bikes.splice(idx,1);
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
    $scope.makes = {
        'Bajaj':['Avenger','Avenger 150 Street'],
        'Hero':['Splendor'],
        'Honda':['Activa'],
        'TVS':['Jupiter'],
        'Yamaha':['RX100'],
        'Suzuki':['Facino']
    };//make
    
    /*
    "Avenger"
        Avenger 150 Street"
       "Avenger 220 Cruise","makeid":1},
        {"id":4,"make":"Avenger 220 Street","makeid":1},
        {"id":5,"make":"Boxer","makeid":1},
        {"id":6,"make":"Bravo","makeid":1},
        {"id":7,"make":"Byk","makeid":1},
        {"id":8,"make":"Caliber","makeid":1},
        {"id":9,"make":"Chetak","makeid":1},
        {"id":10,"make":"Classic","makeid":1},
        {"id":11,"make":"CT","makeid":1},
        {"id":12,"make":"CT100","makeid":1},
        {"id":13,"make":"Cub","makeid":1},
        {"id":14,"make":"Discover 100","makeid":1},
        {"id":15,"make":"Discover 100 M","makeid":1},
        {"id":16,"make":"Discover 100 T","makeid":1},
         {"id":17,"make":"Discover 125","makeid":1},
         {"id":18,"make":"Discover 125 M","makeid":1},
         {"id":19,"make":"Discover 125 ST","makeid":1},
         {"id":20,"make":"Discover 125T","makeid":1},
         {"id":21,"make":"Discover 135","makeid":1},
         {"id":22,"make":"Discover 150","makeid":1},
         {"id":23,"make":"Discover 150F","makeid":1},
         {"id":24,"make":"Discover 150S","makeid":1},
         {"id":25,"make":"Discover125","makeid":1},
         {"id":26,"make":"Kristal","makeid":1},
        {"id":27,"make":"Legend","makeid":1},
         {"id":28,"make":"M80","makeid":1},
         {"id":29,"make":"Platina","makeid":1},
         {"id":30,"make":"Priya","makeid":1},
         {"id":31,"make":"Pulsar 135 LS","makeid":1},
         {"id":32,"make":"Pulsar 150","makeid":1},
        {"id":33,"make":"Pulsar 150 DTS-i","makeid":1},
         {"id":34,"make":"Pulsar 180 DTS-i","makeid":1},
         {"id":35,"make":"Pulsar 200","makeid":1},
         {"id":36,"make":"Pulsar 220 DTS-i","makeid":1},
         {"id":37,"make":"Pulsar 220 Fi","makeid":1},
         {"id":38,"make":"Pulsar 220F","makeid":1},
           {"id":39,"make":"Pulsar 220S","makeid":1},
         {"id":40,"make":"Pulsar AS150","makeid":1},
         {"id":41,"make":"Pulsar AS200","makeid":1},
         {"id":42,"make":"Pulsar NS200","makeid":1},
         {"id":43,"make":"Pulsar RS200","makeid":1},
           {"id":44,"make":"Rave","makeid":1},
         {"id":45,"make":"Saffire","makeid":1},
         {"id":46,"make":"Spirit","makeid":1},
         {"id":47,"make":"Sunny Spice","makeid":1},
         {"id":48,"make":"V15","makeid":1},
           {"id":49,"make":"Wave","makeid":1},
         {"id":50,"make":"Wind","makeid":1},
         {"id":51,"make":"Xcd","makeid":1}
    */
       
    
    $scope.year = ['2016','2015','2014','2013','2012','2011','2010','2009','2008','2007','2006','2005','2004','2003','2002','2001','2000'];
    
}]);