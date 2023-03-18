import SpotifyWebApi from "spotify-web-api-node";

const scopes = [
  "user-read-email",
  "playlist-read-private",
  "playlist-read-collaborative",
  "streaming",
  "user-read-private",
  "user-library-read",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-follow-read",
  // "user-library-modify",
].join(",");

const params = {
  scope: scopes,
};

const queryString = new URLSearchParams(params).toString();

const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryString}`;

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
});

export default spotifyApi;
export { LOGIN_URL };
