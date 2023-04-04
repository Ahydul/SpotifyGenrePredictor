var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('tracks', { title: 'Tracks', });
});


module.exports = router;