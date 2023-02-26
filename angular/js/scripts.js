var app=angular.module("myApp", ["ui.router","ServiceModule"]);
app.config(function($stateProvider, $urlRouterProvider,$urlMatcherFactoryProvider,$locationProvider)
{
    $urlRouterProvider.otherwise('Home');
    $locationProvider.html5Mode(true);
   $urlMatcherFactoryProvider.caseInsensitive(true);
    $stateProvider.state('Home',{
        url:'/home',
        templateUrl:'angular/templates/login.html',
        controller:'loginController'
    }).state('SignUp',{
        url:'/signup',
        templateUrl:'angular/templates/register.html',
        controller:'signupController'
    }).state('Ticket',{
        url:'/tickets',
        templateUrl:'angular/templates/ticket.html',
        controller:'ticketController'
    }).state('logout',{
        url:'/home',
        templateUrl:'angular/templates/login.html',
        controller:'logoutController'
    })
});
// app.controller('headerController', function($scope,$rootScope){
//   if($rootScope.session!=null || $rootScope.session!=''){
//     $scope.session=$rootScope.session;
//   }
// })
app.controller('loginController', function($scope,serviceApi,$rootScope,$state){
    $scope.email='';
    $scope.password='';
    $scope.error=false;
    $rootScope.session='0';
    $rootScope.isLoggedIn=null;
    if($rootScope.session!='0' || $rootScope.isLoggedIn!=null)
    {
        $state.go('Ticket');
    }
    else{
        $state.go('Home');
    }
  

    $scope.authenticate=function(){
        var userdetails={
            'email':$scope.email,
            'pass':$scope.pass,
        };
        serviceApi.checkLogin(userdetails).then(function(response)
        {
            sessiondetails=response.data;
            $rootScope.session=sessiondetails['isloggedIn'];
            $rootScope.isLoggedIn=true; 
            $state.go('Ticket');
        },function(response){
           alert('Login failed');
        })
    }
}).controller('signupController',function($scope,serviceApi,$state){
    $scope.name="";
    $scope.email="";
    $scope.pass="";
    $scope.cpass="";
    $scope.error=false;
    $scope.registerUser=function(){
        if($scope.pass==$scope.cpass)
        {
                var userdetails={
                    'name':$scope.name,
                    'email':$scope.email,
                    'pass':$scope.pass,
                };
                serviceApi.registerUser(userdetails).then(function(response){
                    if(response.data==1)
                    {
                        $state.go('home');
                    }
                },function(response){
                    $scope.error=true;
                })
    }
    else{
        $scope.error=true;
    }
    }
}).controller('ticketController',function($scope,serviceApi,$state,$rootScope){
    if($rootScope.session == '0'){
        $state.go('Home');
    }
    else{
    $scope.tickettitle='';
    $scope.ticketdetail='';    
    $scope.present=false;
       $scope.errormessage=false;

    $scope.ticketadd=function(){
        data={
            title:$scope.tickettitle,
            desc:$scope.ticketdetail
        };
        serviceApi.addTicket(data).then(function(response){
            if(response.data==1)
            {
                $state.reload();
            }
        },function(response){
            alert('Error');
        }
                
        )

        }
        $scope.userTickets=function(){
            serviceApi.userTickets().then(function(response){
                $scope.present='true';
            // console.log(response.data);
           $scope.tickets=response.data;
            },function(response){
                $scope.errormessage=true;
            })
        }
    }
}).controller('logoutController',function($scope,$rootScope,$state){
    $scope.logout=function(){
        serviceApi.logout().then(function(response){
            $rootScope.session = '0';
            $rootScope.isLoggedIn=null;
            $state.go('home');
        },function(response){

        })
    }
});