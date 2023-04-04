var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Playlist' });
});

router.post('/tracks',async function(req, res, next) {
  var playlist = req.body.playlist;

 

  res.render('tracks', { title: 'tracks', playlist: playlist});
});
module.exports = router;