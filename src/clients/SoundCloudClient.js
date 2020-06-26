class SoundCloudClient {
  constructor() {
    this.client = require('soundcloud')
    this.client.initialize({
      client_id: process.env.REACT_APP_SOUND_CLOUD_CLIENT_ID,
    })
  }

  search(query) {
    return this.client
      .get('/tracks', {
        q: query,
      })
      .then(function (tracks) {
        return tracks
      })
  }

  stream(track) {
    return this.client.stream(track)
  }
}

export default SoundCloudClient
