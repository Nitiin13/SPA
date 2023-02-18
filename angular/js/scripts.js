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
    })
});
app.controller('headerController', function($scope){
    $scope.isloggedIn = false;
}).controller('loginController', function($scope,serviceApi){
    $scope.email='';
    $scope.password='';
    $scope.error=false;
    $scope.authenticate=function(){
        var userdetails={
            'email':$scope.email,
            'pass':$scope.pass,
        };
        serviceApi.checkLogin(userdetails).then(function(response)
        {
            if(response.data==1)
            {
            alert('Login successful');
            }
            else{
            alert('Login failed');
            }
        },function(response){
           
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
});