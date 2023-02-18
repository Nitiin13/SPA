var serviceModule=angular.module('ServiceModule',[]);
serviceModule.factory('serviceApi',function($http){
    var serviceApi = {};
    baseUrl="http://localhost/SPA/"
    serviceApi.checkLogin=function(data){
        var request =$http({
            method:'POST',
            url:baseUrl+'service/authenticate',
            data:data
        });
        return request;
    }
    serviceApi.registerUser=function(regdata){
        var request1=$http({
            method:'POST',
            url:baseUrl+'service/registerUser',
            data:regdata
        });
        return request1;
    }
    return serviceApi;
})