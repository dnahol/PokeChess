'use strict'

var app = angular.module('gameApp', ['btford.socket-io', 'nywton.chessboard', 'ui.router'])

var player;
var score = 0;


app.controller('chessCtrl', function($scope, Service, mySocket, $timeout, Auth) {

  $(document).ready(function () {

    var puzzle = getFen();

    var board = ChessBoard("board", {
      draggable: true,
      dropOffBoard: "snapback",
      position: puzzle.fen1
    });

    $scope.result;

    //check users answer and update users score
    $("#checkMove").click(function () {

      var userAnswer = board.fen();

      if(userAnswer == puzzle.fen2){

        $(".correct").removeClass("hidden");
        $(".wrong").addClass("hidden");
        $scope.userScore += 10;
        $scope.result = "Correct!";
        console.log("Correct!");

      }

      else {
        $(".correct").addClass("hidden");
        $(".wrong").removeClass("hidden");
        console.log("Wrong!");
      }

      updateBoard();
    });


    //change puzzle
    $("#nextPuzzle").click(function (){
      updateBoard();
    });

    function updateBoard(){
      console.log("updateboard");
      puzzle = getFen();

      board = ChessBoard("board", {
        draggable: true,
        dropOffBoard: "snapback",
        position: puzzle.fen1
      });

    };


  });//closes document ready


  $scope.userScore=score;

  $scope.$on('socket:error',  function(ev, data) {
    console.log('socket error:', data);
  });

  mySocket.on('playerNum',  function(playerNum) {
    console.log('playerNum: ', playerNum);
    $scope.player = playerNum;
    $scope.waitText = 'Waiting for opponent';
  });

  mySocket.on('gameStart', () => {
    if($scope.player) {
      $scope.waitText= 'Press Start to Begin!';
    }
  });

  mySocket.on('winner', (winner) => {
    if(winner === 'draw') {
      $scope.waitText = 'You tied! No Pokemon caught';
    } else if(winner === score) {
      $scope.waitText = 'You caught a Pokemon!';
    } else {
      $scope.waitText = 'You lost! Missed that Pokemon!';
    }

  });

  $scope.startTimer = () => {
    console.log('timer!');

    $scope.waitText = 'Your timer has started! You have 20 seconds!'

    $scope.counter = 20;
    $scope.onTimeout = function() {
      $scope.counter--;
      mytimeout = $timeout($scope.onTimeout,1000);
    }
    var mytimeout = $timeout($scope.onTimeout,1000);




    


    $timeout(function () {
      mySocket.emit('timeout', score);

      $scope.waitText='Your time is up! Waiting for oponent to finish.'
    }, 20000);
  }


});








app.controller('profileCtrl', function($scope, Auth, $state) {
  console.log('profileCtrl!');
  console.log(Auth.currentUser);
  console.log('$scope.currentUser:', $scope.currentUser);


  $scope.createPost = (post) => {



    console.log('$scope.currentUser:', $scope.currentUser);
  }


})


app.controller('homeCtrl', function($scope, Auth) {
  console.log('homeCtrl!');



})


app.controller('authFormCtrl', function($scope, $state, Auth) {
  console.log('authFormCtrl!');

  $scope.currentState = $state.current.name;

  $scope.submitForm = () => {
    if($scope.currentState === 'register') {

      // register user

      if($scope.user.password !== $scope.user.password2) {

        $scope.user.password = '';
        $scope.user.password2 = '';

        alert('Passwords must match.')
      } else {
        Auth.register($scope.user)
        .then(res => {
          return Auth.login($scope.user);
        })
        .then(res => {
          $state.go('chess');
        })
        .catch(res => {
          alert(`registration error: ${res.data.error}`);
        });
      }
    } else {
      // login user
      console.log($scope.user)
      Auth.login($scope.user)
      .then(res => {
        $state.go('chess');
      })
      .catch(res => {
        alert(`login error: ${res.data.error}`);
      })

    }
  };
});


app.controller('profileCtrl', function() {
  console.log('profileCtrl!');
})

app.controller('loginCtrl', function() {
  console.log('loginCtrl!');
})

app.controller('logoutCtrl', function() {
  console.log('logoutCtrl!');
})


app.factory('mySocket', function (socketFactory) {
  console.log('factory!');
  return socketFactory();
})


app.controller('mainCtrl', function($scope, Auth, $state) {

  $scope.$watch(function() {
    return Auth.currentUser;
  }, function(newVal, oldVal) {
    console.log('oldVal: ', oldVal);
    console.log('newVal: ', newVal );
    $scope.currentUser = newVal;
  })


  // console.log('mainCtrl');
  // Auth.getProfile()
  //   .then(res => {
  //     $scope.currentUser = res.data;
  //   })
  //   .catch(res => {
  //     $scope.currentUser = null;
  //   })
  $scope.logout = () => {
    Auth.logout()
    .then(res => {
      $state.go('home');
    })
  }


});
