//TODO: typescript interfaces?
import {Player, Transport} from 'tone';
import {tracks} from '../assets/sounds/tracks';

class MusicTrackPlayer {
  constructor(grainPlayer, trackId) {
    this.player = grainPlayer;
    this.player.toDestination();
    this.player.autostart = false;
    this.player.name = trackId;
    this.player.olverlap = 0;
    this.player.grainSize = 0.1;
  }

  dispose() {
    this.player.dispose();
  }

  unmute() {
    this.player.mute = false;
  }

  mute() {
    this.player.mute = true;
  }

  sync(startTime) {
    this.player.sync();
    this.player.start(startTime);
    return this.player;
  }

  unsync() {
    this.player.unsync();
    return this.player;
  }
}

export {MusicTrackPlayer};

class SequencePlayer {
  constructor(sequence, trackId) {
    this.players = {};
    Object.entries(tracks).map(([key, value]) => {
      const newPlayer = new Player(value.sound);
      newPlayer.toDestination();
      newPlayer.autostart = false;
      this.players = {...this.players, [key]: newPlayer};
    });

    this.sequence = sequence;
    this.sequence.start(Transport.seconds);
  }

  dispose() {
    this.sequence.dispose();
  }

  unmute() {
    Object.entries(this.players).forEach(([, player]) => {
      player.mute = false;
    });
  }

  mute() {
    Object.entries(this.players).forEach(([, player]) => {
      player.mute = true;
    });
  }

  sync() {
    this.sequence.stop(0);
    this.sequence.start(Transport.seconds);
    return this;
  }

  unsync() {
    this.sequence.stop(0);
    return this;
  }

  getPlayer(trackName) {
    return this.players[trackName];
  }
}

export {SequencePlayer};
