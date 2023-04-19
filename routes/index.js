var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Spotify Genre Predictor' });
});

router.post('/',async function(req, res, next) {
  var user = req.body.user;

  // Get a user's playlists
  var playlists = await spotifyApi.getUserPlaylists(user, {
    offset: 1,
    limit: 3,
  });

  // Get a user's playlists
  var prueba = await spotifyApi.getPlaylist('0rtZkMRnuKQGCyB4mBWiwF', {
    offset: 1,
    limit: 3,
  });

  res.json(prueba.body.tracks.items)

  // Get playlist's tracks
  var detailedPlaylists = [];

  for (const p of playlists.body.items) {
    try {      
      var detailedPlaylist = await spotifyApi.getPlaylistTracks(p.id, {
        offset: 1,
        limit: 5,
        fields: 'items'
      });

      var playlistsTrackIds = await detailedPlaylist.body.items
        .filter(a=>a.track!=null)
        .map(a =>a.track.id);

      const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(playlistsTrackIds);
      
      // Get track's audio features

      detailedPlaylists.push(audioFeatures);
    } catch (err) {
      console.log('Something went wrong!', err);
    }
  }

  res.json(detailedPlaylist);
});

module.exports = router;
