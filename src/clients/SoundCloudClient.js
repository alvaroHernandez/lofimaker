import {client} from './baseClient';

class SoundCloudClient {
  constructor() {
    this.client = require('soundcloud');
    this.client.initialize({
      client_id: process.env.REACT_APP_SOUND_CLOUD_CLIENT_ID,
    });
  }

  search(query) {
    return this.client
      .get('/tracks', {
        limit: 36,
        q: query,
      })
      .then(function (tracks) {
        return tracks;
      });
  }

  stream(track) {
    return client(
      `${track}?client_id=${process.env.REACT_APP_SOUND_CLOUD_CLIENT_ID}`,
      {redirect: 'manual'},
    );
  }
}

export default SoundCloudClient;
