ub.service('auth',["$http","$log","$q","$cookies",function($http,$log,$q,$cookies){
    
    this.isAuth=false;
    this.profpic=""
    this.fbresponse={};
    this.msg="";
    this.userobj = {};
    this.user = {};
    this.guser={};
    var self=this;
    

    
    self.userCrea =function() {
        var tAdef = $q.defer();
        
        FB.api('/me',{fields: 'first_name,last_name,gender,email,picture'}, function(response) {
            if(response.first_name == null || response.first_name.length ==0){
                response.first_name = response.email;
            }
            self.fbresponse = response;
            self.profpic = response.picture.data.url;
            self.isAuth=true;
            self.accesstoken = FB.getAuthResponse().accessToken;
            $cookies.put('acctoken',self.accesstoken);
            //access_token= FB.getAuthResponse().accessToken;
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.first_name + '!';
            document.getElementById('profpic').innerHTML =
            "<img src='" + response.picture.data.url + "'>";
            
            //$log.log('response object',response);
            
              $http({
                method: 'POST',
                url:"/auth/facebook/accesstoken",
                //params:{access_token:FB.getAuthResponse().accessToken}
                headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
                } 
                }).then(function successCallback(srresponse){
                  
                  self.userobj=srresponse.data;
                  $log.log('facebook passport authenticated user:',srresponse.data);
                  $cookies.putObject('usrobj',srresponse.data);
                  tAdef.resolve(self.userobj);
            
                },function errorCallback(srresponse){
                  $log.error("http request for user login failed");
                  tAdef.reject(srresponse.statusText);
              });
          
        });//FB.api call back function
        
        return tAdef.promise;
            
    };//userCrea
    
    this.fblogin =function(){
        var deferred = $q.defer();
        FB.login(function(response){
            
            if (response.status === 'connected') {
                          
                self.userCrea().then(
                 function(resolved){
                     deferred.resolve(resolved);    
                 },
                function(rejected){
                    deferred.reject(rejected);
                });
                 
            } else if (response.status === 'not_authorized') {
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
            
        }); 
        return deferred.promise;
    };//fblogin
    
    this.glogin =function(){
        var deferred = $q.defer();
        //var profile = googleUser.getBasicProfile();
        //var GoogleAuth=gapi.auth2.getAuthInstance();
        //var GoogleUser= GoogleAuth.currentUser.get();
        //var AuthResponse =GoogleUser.getAuthResponse();
        //$log.log('AuthResponse:',AuthResponse);
        auth2.signIn({
          'scope': 'profile email'
        }).then(function(response){
            self.gUser=response;
            self.accesstoken = self.gUser.getAuthResponse().access_token;
            $cookies.put('acctoken',self.accesstoken);
            
               $http({
                method: 'GET',
                url:"/auth/google/accesstoken",
                //params:{access_token:self.accesstoken}
                headers:{
                //Authorization : "Bearer " + self.accesstoken
                Access_token:self.accesstoken
                } 
                }).then(function successCallback(srresponse){
                  
                  self.userobj=srresponse.data;
                  $log.log('google passport authenticated user:',srresponse.data);
                  $cookies.putObject('usrobj',srresponse.data);
                  deferred.resolve(self.userobj);
            
                },function errorCallback(srresponse){
                  $log.error("http request for user login failed");
                  deferred.reject(srresponse.statusText);
              }); //$http google+
        });
               
        return deferred.promise;
    };//glogin
    
    this.ublogout=function(){
        var logdef= $q.defer();
        if(self.fbresponse){
            FB.logout(function(response){
            $log.log('logout response:'+ response);
            });
        }
        else if(auth2)
            {
                auth2.signOut().then(function () {
                    $log.log("Google user signed out");
                });//signOut
            }
            else
                {
                    $log.error('Logout error');
                }
        $cookies.remove('acctoken');
        $cookies.remove('resobj');
        logdef.resolve('logged out successfully');
        return logdef.promise;
    };
    
    this.fblogout = function(){
        var logdef= $q.defer();
        FB.logout(function(response){
            $log.log('logout response:'+ response);
            $cookies.remove('acctoken');
            $cookies.remove('resobj');
            logdef.resolve('logged out successfully');
        });
        return logdef.promise;
    };//fblogout
    
    this.glogout = function(){
        
        var logdef= $q.defer();        
        var auth2 = gapi.auth2.getAuthInstance();
        
        auth2.signOut().then(function () {
        $log.log('Google User signed out.');
        $cookies.remove('acctoken');
        $cookies.remove('resobj');
        logdef.resolve('Google User logged out successfully');
        });//signOut
        
        return logdef.promise;
    };//glogout
    
    this.getAccesstoken=function(){
        var acctoken = $cookies.get('acctoken');
        return acctoken;
    }
    this.getResponseobj=function(){
        var resobj = $cookies.getObject('usrobj');
        return resobj;
    }
}]);

ub.service('formsub',[ 'auth',"$http","$log","$q","$timeout","$cookies",function(auth,$http,$log,$q,$timeout,$cookies){
    var user={};
    var self=this;
    
    self.msg="";
    self.submit=function(user){
        var fsdef = $q.defer();   
        $http({
            method:"POST",
            url: "http://localhost:3000/api/updprof",
            params: user,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            }                       
            }).then(
                    function successCallback(srresponse){
                    $log.log("Posted Object: ",srresponse.config.params);
                    $cookies.putObject('usrobj',srresponse.data);
                    fsdef.resolve(srresponse);
                    },

                    function errorCallback(srresponse){
                    $log.log("http get request failure:"+srresponse.msg);
                    fsdef.reject(srresponse);
                    }
                );//$http
        return fsdef.promise;
        
    };//submit
    
   /* self.getprof=function(user){
        var deferred = $q.defer();
        $http({
            method:"GET",
            url:"http://localhost:3000/api/getprof",
            params: user
        }).then(function successCallback(srresponse){
                
                deferred.resolve(srresponse.data);                
                },
                function errorCallback(srresponse){
                $log.log("get user profile - Failure: "+srresponse.statusText);
                deferred.reject(srresponse.data);
                }
            );//$http
        
        return deferred.promise;
    }//getprof*/
}]);

ub.service('bike',['$http','auth','$log','$q','$base64',function($http,auth,$log,$q,$base64){
    var user={};
    var bike={};
    //retrieve bikes
    this.getbikes = function(user){
        var deferred = $q.defer();
        //$log.log("Bearer: ", auth.getAccesstoken());
        //$log.log("Bearer base64: ", $base64.encode(auth.getAccesstoken()));
        $http({
            method:"GET",
            url:"http://localhost:3000/api/getbikes",
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            }                       
        }).then(function successCallback(srresponse){
            deferred.resolve(srresponse.data);
        }, 
            function failureCallback(srresponse){
            $log.error("get bikes http call failed ",srresponse.statusText );
            deferred.reject(srresponse.statusText );
        });//$http
        return deferred.promise;
    };//getbikes
    
    //retrieve bikes for which there is no appointment
    this.getbikesappo = function(user){
        var deferred = $q.defer();
        $http({
            method:"GET",
            url:"http://localhost:3000/api/getbikeappo",
            params: user,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            } 
        }).then(function successCallback(srresponse){
            deferred.resolve(srresponse.data);
        }, 
            function failureCallback(srresponse){
            $log.error("get bikes without appointment http call failed ",srresponse.data);
            deferred.reject(srresponse.data);
        });//$http
        return deferred.promise;
    };//getbikesappo
    
    //delete bike
    
    this.delbike = function(bike){
        var deferred = $q.defer();
        $http({
            method:"DELETE",
            url:"http://localhost:3000/api/delbike",
            params: bike,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            } 
        }).then(function successCallback(srresponse){
            deferred.resolve(srresponse.data);
        },function failureCallback(srresponse){
            deferred.reject(srresponse.data);
        });
        return deferred.promise;
    };//delbike
    
    this.subbike = function(bike){
        var deferred = $q.defer();
        $http({
            method:"POST",
            url:"http://localhost:3000/api/regbike",
            params: bike,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            } 
        }
        ).then(function sucessCallback(srresponse){
            deferred.resolve(srresponse.data);
        },
               function failureCallback(srresponse){
            deferred.reject(srresponse.data);
        });//$http
        return deferred.promise;
    };//subbike
    
}]);

ub.service('appo',['auth','$http','$log','$q',function(auth,$http,$log,$q){
    var user={};
    var appo={};
    //retrieve appos
    this.getappos = function(user){
        var deferred = $q.defer();
        $http({
            method:"GET",
            url:"http://localhost:3000/api/vappos",
            params: user,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            } 
        }).then(function successCallback(srresponse){
            deferred.resolve(srresponse.data);
        }, 
            function failureCallback(srresponse){
            $log.error("get appos http call failed ",srresponse.data);
            deferred.reject(srresponse.data);
        });//$http
        return deferred.promise;
    };//getappos
    
    //delete appointment
    
   this.delappo = function(appo){
        var deferred = $q.defer();
        $http({
            method:"DELETE",
            url:"http://localhost:3000/api/dappos",
            params: appo,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            } 
        }).then(function successCallback(srresponse){
            deferred.resolve(srresponse.data);
        },function failureCallback(srresponse){
            deferred.reject(srresponse.data);
        });
        return deferred.promise;
    };//delappo
    
    
    this.addappo = function(appo){
        var deferred = $q.defer();
        $http({
            method:"POST",
            url:"http://localhost:3000/api/cappos",
            params: appo,
            headers:{
                Authorization : "Bearer " + auth.getAccesstoken()
            } 
        }
        ).then(function sucessCallback(srresponse){
            deferred.resolve(srresponse.data);
        },
               function failureCallback(srresponse){
            deferred.reject(srresponse.data);
        });//$http
        return deferred.promise;
    };//addappo
    
    
}]);