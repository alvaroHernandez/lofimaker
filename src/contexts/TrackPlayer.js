//TODO: typescript interfaces?
import {Player, Transport} from 'tone';
import {tracks} from '../assets/sounds/tracks';

class MusicTrackPlayer {
  constructor(grainPlayer, trackId, title, duration) {
    this.player = grainPlayer;
    this.trackId = trackId;
    this.title = title;
    this.duration = duration;
    this.originalDuration = duration;
    this.startTime = 0;

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

  updatePlayerStartingOffset(startTime) {
    this.startTime = startTime;
    this.player.unsync();
    this.player.sync().start(startTime);
  }
}

export {MusicTrackPlayer};

class SequencePlayer {
  updatePlaybackRate(playbackRate){
    this.sequence.stop();
    this.sequence.playbackRate = playbackRate;
    this.sequence.start(Transport.seconds);
  }

  updateDuration(duration){
    this.duration = duration;
  }

  updateLoop(loop){
    this.sequence.stop();
    this.sequence.loop = loop;
    this.sequence.start(Transport.seconds);
  }

  constructor(sequence, trackId, title, duration) {
    this.players = {};
    Object.entries(tracks).map(([key, value]) => {
      const newPlayer = new Player(value.sound);
      newPlayer.toDestination();
      newPlayer.autostart = false;
      this.players = {...this.players, [key]: newPlayer};
    });

    this.title = title;
    this.duration = duration;
    this.trackId = trackId;
    this.startTime = 0;

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

  updatePlayerStartingOffset(startTime) {
    this.startTime = startTime;
    this.sequence.stop();
    this.sequence.start(startTime);
  }

  getPlayer(trackName) {
    return this.players[trackName];
  }
}

export {SequencePlayer};
