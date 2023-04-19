var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');

router.post('/tracks',async function(req, res, next) {
  var playlistId = req.body.playlist;
// Get a user's playlists
var playlist = await spotifyApi.getPlaylist(playlistId, {
  offset: 1,
  limit: 3,
});

var aux = await spotifyApi.getPlaylist(playlistId, {
  offset: 1,
  limit: 3,
});

// Get playlist's tracks
var detailedPlaylist = aux.body.tracks.items;

  var playlistsTrackIds = await detailedPlaylist
  .filter(a=>a.track!=null)
  .map(a =>a.track.id);

  const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(playlistsTrackIds);
  // Get track's audio features

  detailedPlaylist.push(audioFeatures);

  res.render('tracks', { title: 'tracks', 
  playlistId: playlistId,
  songs:playlist.body.tracks.items,
  features:detailedPlaylist
});

});


module.exports = router;