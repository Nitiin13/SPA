var serviceModule=angular.module('ServiceModule',[]);
serviceModule.factory('serviceApi',function($http,$rootScope){
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
    serviceApi.addTicket=function(data){
        var req2=$http({
            method:'POST',
            url:baseUrl+'service/ticket_add',
            data:data
        });
        return req2;
    }
    serviceApi.userTickets=function(){
        var req3=$http({
            method:'GET',
            url:baseUrl+'service/usertickets',
        });
        return req3;
    }
    serviceApi.logout=function(){
        var req4=$http({
            method:'GET',
            url:baseUrl+'service/logout'
        });
        return req4;
    }
    return serviceApi;
})