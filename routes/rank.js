var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var util = require('../config/util.js');
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client(); // default to localhost:9200
var User = mongoose.model('User');

var router = express.Router();

router.get('/', function(req, res) {

  mongoose.model('User').find({}, function(err, users) {
    console.log('users: ', users);
    res.render('partials/rank', {
      title: 'Chess Hub - Ranking',
      users: users,
      isRankPage: true
    });
  });
});
router.post('/', function(req, res) {
  var poke = req.body.poke;

  client.search({
    index: 'chesshub',
    type: 'users',
    body: {
      "query": {
        "bool": {
          "should": [{
            "match": {
              "poke:": poke
            }
          }]
        }
      }
    }

  }).then(function(resp) {
    var poke = resp.hits.hits;
    res.set('Content-Type', 'application/json');
    res.status(200);
    res.send({ games: games });
}, function (err) {
    res.status(500);
    console.log(err);
  })
})

module.exports = router;





// router.get('/puzzles', function(req, res) {
//   mongoose.model('Puzzle').find({}, function(err, puzzles) {
//     var randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
//     var token = req.params.token;
//     res.render('partials/puzzles', {
//       title: 'Play a Puzzle',
//       puzzle: randomPuzzle,
//       token: token,
//       user: req.user
//     })
//
// })
// }
