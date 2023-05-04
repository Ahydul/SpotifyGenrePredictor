
var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');
const fs = require('fs')
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
var detailedPlaylists=[];
var detailedPlaylist = aux.body.tracks.items;

  var playlistsTrackIds = await detailedPlaylist
  .filter(a=>a.track!=null)
  .map(a =>a.track.id);

  const audioFeatures = await spotifyApi.getAudioFeaturesForTracks(playlistsTrackIds);
  // Get track's audio features

  detailedPlaylists.push(audioFeatures);
  var songFeatures=[]

  for (let i = 0; i < playlist.body.tracks.items.length; i++) {
    track_id=playlist.body.tracks.items[i].track.id;
    duration_ms=playlist.body.tracks.items[i].track.duration_ms;
    danceability = detailedPlaylists[0].body.audio_features[i].danceability;
    energy = detailedPlaylists[0].body.audio_features[i].energy;
    key = detailedPlaylists[0].body.audio_features[i].key;
    loudness = detailedPlaylists[0].body.audio_features[i].loudness;
    mode = detailedPlaylists[0].body.audio_features[i].mode;
    speechiness = detailedPlaylists[0].body.audio_features[i].speechiness;
    acousticness = detailedPlaylists[0].body.audio_features[i].acousticness;
    instrumentalness = detailedPlaylists[0].body.audio_features[i].instrumentalness;
    liveness = detailedPlaylists[0].body.audio_features[i].liveness;
    valence = detailedPlaylists[0].body.audio_features[i].valence;
    tempo = detailedPlaylists[0].body.audio_features[i].tempo;
    time_signature = detailedPlaylists[0].body.audio_features[i].time_signature;
  
    const song = {
      track_id: track_id,
      duration_ms: duration_ms,
      danceability: danceability,
      energy: energy,
      key: key,
      loudness: loudness,
      mode: mode,
      speechiness: speechiness,
      acousticness: acousticness,
      instrumentalness: instrumentalness,
      liveness: liveness,
      valence: valence,
      tempo: tempo,
      time_signature: time_signature
    };
    songFeatures.push(song);
  }
  //res.json(songFeatures);
  fs.writeFileSync('tracksFeatures.json', JSON.stringify(songFeatures));

  res.render('tracks', { title: 'tracks', 
  playlistId: playlistId,
  songs:playlist.body.tracks.items,
  features:detailedPlaylist,
  track_id:track_id,
  duration_ms:duration_ms,
  danceability:danceability
});

});


module.exports = router;