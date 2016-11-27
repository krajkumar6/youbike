var gapiinit=function(){
    //console.log('in gapiinit');
    gapi.load('auth2',function(){
       auth2 = gapi.auth2.init({
            client_id: '1094664898379-8u0muh9eme8nnvp95dafuc3rvigu4j9u.apps.googleusercontent.com',
            fetch_basic_profile: true            
            });            
        });//gapi.load
    };


ub.controller('mainController',['$scope','$log','$http','auth','$location','$anchorScroll','$routeParams','bike',"$location","$window","$rootScope",function($scope,$log,$http,auth,$location,$anchorScroll,$routeParams,bike,$location,$window,$rootScope){
	
    $scope.profpic="";
    $rootScope.testmsg="raj";
    $rootScope.isAuth = false;
    $rootScope.menu =['Services','Pricing','Appointment','Signup','About','FAQ','Contact Us'];
    
    $rootScope.usr ={};
    var googleUser ={};
    var usermenu=["Profile","Appointment","Bikes","Logout"];
    
	switch($routeParams.id)
	{
		case "1":
		$location.hash('Services');		
		$anchorScroll();
		break;
		case "2":
		$location.hash('Pricing');		
		$anchorScroll();
		break;
        case "3":
		$location.hash('Signup');		
		$anchorScroll();
		break;
        case "4":
		$location.hash('Signup');		
		$anchorScroll();
		break;
        case "5":
		$location.hash('About');		
		$anchorScroll();
		break;
        case "6":
		$location.hash('FAQ');		
		$anchorScroll();
        break;
		case "7":
		$location.hash('Contact Us');		
		$anchorScroll();
        break;
        
		
	};
    
    
    $scope.fblogin= function(){
        auth.fblogin().then(
                function(response){
                    
                $rootScope.isAuth = true;
                $rootScope.menu = usermenu;
                    
                $log.log('isAuth:',$scope.isAuth);
                $rootScope.usr =auth.getResponseobj();
                $rootScope.usr.access_token=auth.getAccesstoken();  
                $scope.msg= response.msg;
                $rootScope.usr.profpic=auth.profpic;
                
                
                $log.log('$rootScope.usr',$rootScope.usr);
                    
                bike.getbikes().then(function(bikeresp){
                   
                    if (bikeresp.length ==0)
                    {
                    $location.path('/addbike');//redirect to addbike screen    
                    }
                    else{
                    $location.path('/Appointment');//else redirect to view appointment screen
                    
                    }
                },function(bikereas){
                    $scope.msg1 = bikereas;
                });//getbikes
                    
                  
                            
            },function(reason){
                 $log.log("fblogin() - failure :Need to login to the application :"+reason);
            })
            
        };//fblogin
    /*
    $scope.fblogout = function(){
        
        auth.fblogout().then(
        function(response){
            $scope.msg=auth.msg;
            $location.path('/');
            $window.location.reload();
        },function(reason){
            $scope.msg="Logout Error!! Pls check Logs";
        }
        );
    };
    */
        
    //fblogout
    
    $scope.glogin= function(){
        auth.glogin().then(
                function(response){
                    
                $rootScope.isAuth = true;
                $rootScope.usr =auth.getResponseobj();  
                $scope.msg= response.msg;
                $rootScope.usr.profpic=auth.profpic;
                
                bike.getbikes($rootScope.usr).then(function(response){
                   $log.log('response',response);
                    if (response.length ==0)
                    {
                    $location.path('/addbike');//redirect to addbike screen    
                    }
                    else{
                    $location.path('/Appointment');//else redirect to view appointment screen
                    }
                },function(reason){
                    $scope.msg1 = reason;
                });//getbikes
                  
                            
            },function(reason){
                 $log.log("google login() - failure :Need to login to the application :"+reason);
            })
            
        };//glogin
    
    $scope.ublogout=function(){
        auth.ublogout().then(function(response){
            $rootScope.isAuth = false;
            $rootScope.usr={};
            $location.path('/');
            $window.location.reload();
            $log.log('Logged out successfully:',response);
        },function(reason){
            $log.error('Log out error:',reason);
        });
    };
    
  
    
    /*$scope.glogout = functinon(){
        
        auth.glogout().then(
        function(response){
            $scope.msg=auth.msg;
            $location.path('/');
            $window.location.reload();
        },function(reason){
            $scope.msg="Google Logout Error!! Pls check Logs";
        }
        );
    };*/ //glogout
    
}]);//mainController


ub.controller('profctrl',["$scope","auth","formsub","$log","$timeout","$location",function($scope,auth,formsub,$log,$timeout,$location){
    //$log.log("In Profile controller");
    $scope.msg = "";
    $scope.usr =auth.getResponseobj();
    

   $scope.submit = function(){
        
        formsub.submit($scope.usr).then(function(response){
                $scope.msg=response.msg;
                $scope.usr = auth.getResponseobj();
                $log.log('$scope.usr',$scope.usr);
                $location.path('/Profile');
                },function(reason){
                $scope.msg=reason.msg;
            });
    };//submit
}]);

ub.controller('apctrl',["$scope","auth","$log","appo","bike","$location",function($scope,auth,$log,appo,bike,$location){
    $log.log("In Appointment controller");
    $scope.usr= auth.getResponseobj();
    $scope.appos = {};
    $scope.newappo = [];
    
    $scope.selected = {value: null};
    var idx;
    
        
    $scope.myDate = new Date();
    
    $scope.minDate = new Date(
       $scope.myDate.getFullYear(),
       $scope.myDate.getMonth(),
       $scope.myDate.getDate());
    
    $scope.maxDate = new Date(
       $scope.myDate.getFullYear(),
       $scope.myDate.getMonth() + 1,
       $scope.myDate.getDate());
    
    $scope.onlyWeekendsPredicate = function(date) {
       var day = date.getDay();
       return day === 0;
     }//onlyWeekendsPredicate    
    
    appo.getappos($scope.usr).then(function(response){
        $scope.appos = response;
        $scope.msg = response.msg;
    },function(reason){
        $scope.msg = reason.msg;
    });//getappos
    
    bike.getbikesappo($scope.usr).then(function(response){
        $scope.newappo = response;
        },function(reason){
        $scope.msg = reason.msg;
    });//getbikesappo
    
    $scope.delappo=function(idx){
        $scope.appos[idx].usr_id = $scope.usr._id;
        appo.delappo($scope.appos[idx]).then(function(response){
            $scope.appos.splice(idx,1);
            $scope.msg = response;
        },function(reason){
            $scope.msg = reason;
        });        
    };
    
    $scope.addappo = function(idx){
        $scope.newappo[idx].usr_id = $scope.usr._id;
       $scope.newappo[idx].usr_email = $scope.usr.email;
        appo.addappo($scope.newappo[idx]).then(function(response){
           $scope.msg = response; 
            $location.path('/Appointment');
        },function(reason){
            $scope.msg = reason;
        });
    };
}]);

ub.controller('bikectrl',["$scope","auth","$log","bike","$location",function($scope,auth,$log,bike,$location){
    $log.log("In bike controller");
    $scope.msg = "";
    $scope.bikes =[];//bikes array to store bikes retrieved for a user
    $scope.bike ={};//bike object to submit details of bike
    $scope.regno="";
    //var bike ={};
    var idx;
    
    $scope.usr = auth.getResponseobj();
    $scope.bike.usr_id = $scope.usr._id;
    
    bike.getbikes($scope.usr._id).then(function(response){
        $scope.bikes = response;
        
    },function(reason){
        $scope.msg = reason;
    });//getbikes
    
    $scope.delbike = function(idx){
        $scope.bikes[idx].usr_id = $scope.usr._id;
        bike.delbike($scope.bikes[idx]).then(function(response){
            $scope.bikes.splice(idx,1);
            $scope.msg = response;
        },function(reason){
            $scope.msg = reason;
        });
    };
    
    $scope.subbike = function(){
        
        bike.subbike($scope.bike).then(function(response){
           $scope.msg= response;
           $location.path('/Bikes');
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
