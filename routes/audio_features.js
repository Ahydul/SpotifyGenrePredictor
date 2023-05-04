var express = require('express');
var router = express.Router();
var spotifyApi = require('../controllers/spotify.js');
const fs = require('fs')

/* GET home page. */
router.get('/audio-features', function(req, res, next) {
    res.render('audioFeatures', { title: 'Spotify Genre Predictor' });
});

router.post('/audio-features', async function(req, res, next) {
    var tracks = req.body.tracks;
    tracks = tracks.split('\n').map(e => e.replace('https://open.spotify.com/track/','').trim())
    
    var audio_features = await spotifyApi.getAudioFeaturesForTracks(tracks);
    
    audio_features = JSON.stringify(audio_features.body)

    console.log("pito");
    console.log(audio_features);

    fs.writeFileSync('tracksFeatures.json', audio_features);
    
    res.render('audioFeatures', { title: 'Spotify Genre Predictor' });

});

module.exports = router;
