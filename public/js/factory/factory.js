ub.service('fbauthFact',["$http","$log","$rootScope","$q","$cookies",function($http,$log,$rootScope,$q,$cookies){
    
    this.isAuth=false;
    this.profpic=""
    this.fbresponse={};
    this.msg="";
    var self=this;
    
    self.testAPI =function() {
        var tAdef = $q.defer();
        
        FB.api('/me',{fields: 'first_name,last_name,gender,email,picture'}, function(response) {
            self.fbresponse = response;
            self.profpic = response.picture.data.url;
            self.isAuth=true;
            self.accesstoken = FB.getAuthResponse().accessToken;
            $cookies.put('acctoken',self.accesstoken);
            $cookies.putObject('resobj',response);
           
            document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.first_name + '!';
            document.getElementById('profpic').innerHTML =
            "<img src='" + response.picture.data.url + "'>";
            
            

                        
            $http({
            method:"GET",
            url: "http://localhost:3000/api/creaprof",
            params: response
            }).then(function successCallback(srresponse){
                    self.msg=srresponse.data;    
                    //$log.log("http get request success: "+self.msg);
                    tAdef.resolve('http get request success');
                    },
                    function errorCallback(srresponse){
                        //$log.log("http get request failure:"+srresponse.data);
                        tAdef.reject('http get request failure');
                    });
             
            
            
        });//FB.api call back function
        
        return tAdef.promise;
            
    };//testAPI
    
    this.fblogin =function(){
        var deferred = $q.defer();
        FB.login(function(response){
            
            if (response.status === 'connected') {
              // Logged into your app and Facebook.
            //    self.isAuth=true;
              //  deferred.resolve('connected');     
                
                self.testAPI().then(
                 function(resolved){
                     deferred.resolve('connected');    
                 },
                function(rejected){
                    deferred.reject('error connecting');
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
    
    this.getAccesstoken=function(){
        var acctoken = $cookies.get('acctoken');
        return acctoken;
    }
    this.getResponseobj=function(){
        var resobj = $cookies.getObject('resobj');
        return resobj;
    }
}]);

ub.service('formsub',["$http","$log","$q","$timeout",function($http,$log,$q,$timeout){
    var user={};
    var self=this;
    
    self.msg="";
    self.submit=function(user){
        var fsdef = $q.defer();   
        $http({
            method:"POST",
            url: "http://localhost:3000/api/updprof",
            params: user
            }).then(
                    function successCallback(srresponse){
                    self.msg=srresponse.data;    
                    $log.log("Posted Object: ",srresponse.config.params);
                    fsdef.resolve(self.msg);
                    },

                    function errorCallback(srresponse){
                    self.msg=srresponse.statusText;
                    $log.log("http get request failure:"+self.msg);
                    fsdef.reject(self.msg);
                    }
                );//$http
        return fsdef.promise;
        
    };//submit
    
    self.getprof=function(user){
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
    }//getprof
}]);

ub.service('bike',['$http','fbauthFact','$log','$q',function($http,fbauthFact,$log,$q){
    var user={};
    var bike={};
    
    this.getbikes = function(user){
        var deferred = $q.defer();
        $http({
            method:"GET",
            url:"http://localhost:3000/api/getbike",
            params: user
        }).then(function successCallback(srresponse){
            deferred.resolve(srresponse.data);
        }, 
            function failureCallback(srresponse){
            $log.error("get bikes http call failed ",srresponse.data);
            deferred.reject(srresponse.data);
        });//$http
        return deferred.promise;
    };//getbikes
    
    this.subbike = function(bike){
        var deferred = $q.defer();
        $http({
            method:"POST",
            url:"http://localhost:3000/api/regbike",
            params: bike
        }
        ).then(function sucessCallback(srresponse){
            deferred.resolve(srresponse.data);
        },
               function failureCallback(srresponse){
            deferred.resolve(srresponse.data);
        });//$http
        return deferred.promise;
    };//subbike
    
}]);