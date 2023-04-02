require('dotenv').config();

var SpotifyWebApi = require('spotify-web-api-node');

var credentials = {
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000'
};
// ,
// scopes = ['user-read-private', 'user-read-email'],
// state = 'some-state-of-my-choice';

var spotifyApi = new SpotifyWebApi(credentials);

// Retrieve access token using Client Credential Flow
spotifyApi.clientCredentialsGrant().then(
    function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function(err) {
        console.log('Something went wrong when retrieving an access token', err);
    }
);

/*
    //Authorization Code Flow

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);

// Retrieve an access token and a refresh token
spotifyApi.authorizationCodeGrant('code').then(
    function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);

        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    },
    function(err) {
        console.log('Something went wrong!', err);
    }
);
*/

/*
//   Get Audio Features for a Track 
spotifyApi.getAudioFeaturesForTrack('3Qm86XLflmIXVm1wcwkgDK')
.then(function(data) {
    console.log(data.body);
}, function(err) {
    console.log(err);
});

//   Get Audio Features for several tracks 
spotifyApi.getAudioFeaturesForTracks(['4iV5W9uYEdYUVa79Axb7Rh', '3Qm86XLflmIXVm1wcwkgDK'])
.then(function(data) {
    console.log(data.body);
}, function(err) {
    console.log(err);
});



// Get a user's playlists
spotifyApi.getUserPlaylists(user)
    .then(function(data) {
        return data.body;
    },function(err) {
        console.log('Something went wrong!', err);
    });
*/

module.exports = spotifyApi;
