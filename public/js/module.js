'use strict';

var app = angular.module('gameApp');

app.run(function(Auth) {
  Auth.getProfile();
});


app.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '/html/home.html',
    controller: 'homeCtrl',
    resolve: {
      posts: function(Auth) {
        return ;
      }
    }
  })

  .state('register', {
    url: '/register',
    templateUrl: '/html/authForm.html',
    controller: 'authFormCtrl'
  })

  .state('login', {
    url: '/login',
    templateUrl: '/html/authForm.html',
    controller: 'authFormCtrl'
  })

  .state('profile', {
    url: '/profile',
    templateUrl: '/html/profile.html',
    controller: 'profileCtrl',
    resolve: {
      profile: function(Auth) {
        return Auth.getProfile();
      }
    }
  })

  .state('chess', {
    url: '/chess',
    templateUrl: '/html/chess.html',
    controller: 'chessCtrl',
    resolve: {
      profile: function(Auth) {
        return Auth.getProfile();
      }
    }
  })


  $urlRouterProvider.otherwise('/');
})

app.filter('titlecase', function() {
  return function(input) {
    return input[0].toUpperCase() + input.slice(1).toLowerCase();
  }
});
