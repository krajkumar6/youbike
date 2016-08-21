ub.controller('mainController',['$scope','$log','$http','authFact','$location','$anchorScroll','$routeParams',function($scope,$log,$http,authFact,$location,$anchorScroll,$routeParams){
	
    $scope.isAuth=false;
    $scope.fbresponse ={};
    $scope.profpic="";
    $scope.msg={};
    
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
	
    
    $scope.fblogin =function(){
        FB.login(function(response){


            if (response.status === 'connected') {
              // Logged into your app and Facebook.
              $scope.testAPI();
            } else if (response.status === 'not_authorized') {
              // The person is logged into Facebook, but not your app.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
            } else {
              // The person is not logged into Facebook, so we're not sure if
              // they are logged into this app or not.
              document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
            }       
        });       
    };//fblogin
    
        
    $scope.testAPI =function() {
        FB.api('/me',{fields: 'first_name,last_name,gender,email,picture'}, function(response) {
            $scope.fbresponse = response;
            
           // console.log('Successful login for: ' + response.first_name);
            //console.log('email:' + (response.email));
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.first_name + '!';
            document.getElementById('profpic').innerHTML =
            "<img src='" + response.picture.data.url + "'>";
            authFact.profpic = response.picture.data.url;
            $scope.profpic = authFact.profpic;
            $scope.isAuth = authFact.isAuth;
            //$log.log('profpic:'+$scope.profpic);
            //$log.log('isAuth:'+$scope.isAuth);
            //$log.log('$scope.fbresponse :'+$scope.fbresponse );
                        
            $http({
            method:"GET",
            url: "http://localhost:3000/api/creaprof",
            params: $scope.fbresponse
            }).then(function successCallback(response){
                    $scope.msg=response.data;    
                    $log.log("http get request success: "+response.data);
                    },
                    function errorCallback(response){
                        $log.log("http get request failure"+response.data);
                    });
            
            $log.log("$scope.msg: "+$scope.msg);
            $scope.$apply();
        });
        $scope.accesstoken = FB.getAuthResponse().accessToken;
        authFact.setAccesstoken($scope.accesstoken);
        
  
        //app.get('/api/creaprof/:uid',function(req,res){
        
        
    };//testAPI
    
}]);