var ub = angular.module('ub',['ngRoute']);



//controller
ub.controller('mainController',['$scope','$log','$http','fbauthFact','$location','$anchorScroll','$routeParams',function($scope,$log,$http,fbauthFact,$location,$anchorScroll,$routeParams){
	
    $scope.profpic="";
    $scope.msg={};
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
                $scope.accesstoken=fbauthFact.accesstoken;
                //$scope.$apply();
                $log.log("fblogin() - success :"+response);
                $log.log("$scope.msg: "+$scope.msg);
                $log.log("$scope.isAuth:"+$scope.isAuth);
                $log.log("$scope.profpic:"+$scope.profpic);
                
            },function(reason){
                 $log.log("fblogin() - failure :Need to login to the application :"+reason);
            })
            
        };//fblogin
    
}]);

//factory
ub.service('fbauthFact',["$http","$log","$rootScope","$q","$timeout",function($http,$log,$rootScope,$q,$timeout){
    
    this.isAuth=false;
    this.profpic=""
    this.fbresponse={};
    this.msg="";
    var self=this;
    
    self.testAPI =function() {
        var tAdef = $q.defer();
        
        $timeout(function(){
            self.fbresponse = 1;
            self.profpic ='xyz';
            self.isAuth=true;
            
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + 'Raj' + '!';
            document.getElementById('profpic').innerHTML =
            "<img src='" + "" + "'>";
            
            tAdef.resolve('http get request success');
            
            //$rootScope.$apply();
          },1000);  
        
        
        return tAdef.promise;
            
    };//testAPI
    
    this.fblogin =function(){
        var deferred = $q.defer();
       
            
            if (1 === 1) {
              // Logged into your app and Facebook.
                 $timeout(self.testAPI().then(
                 function(resolved){
                     $log.log('testAPI() - success');
                    deferred.resolve('connected');    
                 },
                function(rejected){
                    $log.log('testAPI() - failure');
                    deferred.reject('error connecting');
                }),1000);
                 
            } else if (0 === 1) {
              // The person is logged into Facebook, but not your app.
                deferred.reject('not_authorized');
                document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
            } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
                 deferred.reject('not logged in');
                document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
            } 
            
        
        return deferred.promise;
    };//fblogin

}]);