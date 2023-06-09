var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');

router.post('/playlists',async function(req, res, next) {
  var user = req.body.user;

  console.log("PUTA MIERDA2");
  // Get a user's playlists
  try {
    var playlists = await spotifyApi.getUserPlaylists(user, {
      offset: 1,
      limit: 3,
    });
    
  } catch (error) {
    res.render('index', { title: 'Spotify Genre Predictor', error:'Usuario no encontrado' });
  }


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

  res.render('tracks', { title: 'tracks', playlist: playlist});
      const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(playlistsTrackIds);

      // Get track's audio features

      detailedPlaylists.push(audioFeatures);
    } catch (err) {
      console.log('Something went wrong!', err);
    }
  }

  res.render('playlists', { 
    title: 'Playlists de: ', 
    name: user, 
    playlistsUser: playlists.body.items});
});



module.exports = router;