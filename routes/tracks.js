var express = require('express');
var router = express.Router();
// var spotifyApi = require('../controllers/spotify.js');

router.post('/tracks',async function(req, res, next) {
  var playlist = req.body.playlist;


  res.render('tracks', { title: 'tracks', playlist: playlist});
});


module.exports = router;