//TODO: typescript interfaces?
import {Player, Sequence, Transport} from 'tone';
import {tracks} from '../assets/sounds/tracks';

class MusicTrackPlayer {
  constructor(
    grainPlayer,
    trackId,
    title,
    duration,
    onload,
    url,
    startTime = 0,
    effects,
    effectsToggles,
  ) {
    this.player = grainPlayer;
    this.trackId = trackId;
    this.title = title;
    this.duration = duration;
    this.originalDuration = duration;
    this.startTime = startTime;
    this.onload = () => onload(this);
    this.url = url;

    this.effectsToggles = {};
    this.effects = {};

    if (effects) {
      Object.entries(effects).forEach(([k, v]) => (this.effects[k] = v));
      grainPlayer.detune = this.effects.detune;
      grainPlayer.playbackRate = this.effects.playbackRate;
      grainPlayer.volume.value = this.effects.volume;
    } else {
      this.effects.detune = grainPlayer.detune;
      this.effects.playbackRate = grainPlayer.playbackRate;
      this.effects.volume = grainPlayer.volume.value;
    }

    if (effectsToggles) {
      Object.entries(effectsToggles).forEach(
        ([k, v]) => (this.effectsToggles[k] = v),
      );
    }

    this.player.toDestination();
    this.player.autostart = false;
    this.player.name = trackId;
    this.player.olverlap = 0;
    this.player.grainSize = 0.1;
  }

  dispose() {
    this.onload = () => {};
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
  serialize() {
    return {
      trackId: this.trackId,
      title: this.title,
      duration: this.duration,
      originalDuration: this.originalDuration,
      startTime: this.startTime,
      url: this.url,
      effects: this.effects,
      effectsToggles: this.effectsToggles,
      type: 'MusicTrackPlayer',
    };
  }
}

export {MusicTrackPlayer};

class SequencePlayer {
  updatePlaybackRate(playbackRate) {
    this.sequence.stop();
    this.sequence.playbackRate = playbackRate;
    this.sequence.start(Transport.seconds);
  }

  updateDuration(duration) {
    this.duration = duration;
  }

  updateLoop(loop) {
    this.sequence.stop();
    this.sequence.loop = loop;
    this.sequence.start(Transport.seconds);
  }

  constructor(
    setCurrentBeat,
    timeBetweenBeats,
    totalBeats,
    trackId,
    title,
    duration,
  ) {
    this.players = {};
    Object.entries(tracks).map(([key, value]) => {
      const newPlayer = new Player(value.sound);
      newPlayer.toDestination();
      newPlayer.autostart = false;
      this.players = {...this.players, [key]: newPlayer};
    });

    this.timeBetweenBeats = timeBetweenBeats;
    this.totalBeats = totalBeats;

    this.title = title;
    this.duration = duration;
    this.trackId = trackId;
    this.startTime = 0;

    this.beatsContainer = [];
    this.initializeBeatsContainer();
    this.sequence = this.initNewSequence(setCurrentBeat, this.beatsContainer);
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

  initializeBeatsContainer() {
    for (let i = 0; i < this.totalBeats; i++) {
      this.beatsContainer.push({});
    }
  }

  initNewSequence(setCurrentBeat, beatsContainer) {
    const beatColumnsIndicators = Array.from(Array(this.totalBeats).keys());
    return new Sequence(
      function (time, col) {
        setCurrentBeat(col);
        for (let [, value] of Object.entries(beatsContainer[col])) {
          if (value !== undefined) value.start(time);
        }
      },
      beatColumnsIndicators,
      this.timeBetweenBeats,
    );
  }

  serialize() {
    const serializedBeatsContainer = this.beatsContainer.map(beatTracks => {
      const beatTracksIndicators = {};
      Object.entries(beatTracks).forEach(([trackName, player]) => {
        if (player !== undefined) {
          beatTracksIndicators[trackName] = true;
        }
      });
      return beatTracksIndicators;
    });

    return {
      trackId: this.trackId,
      title: this.title,
      duration: this.duration,
      startTime: this.startTime,
      loops: this.sequence.loop,
      playbackRate: this.sequence.playbackRate,
      beatsContainer: serializedBeatsContainer,
      timeBetweenBeats: this.timeBetweenBeats,
      totalBeats: this.totalBeats,
      type: 'SequencePlayer',
    };
  }
}

export {SequencePlayer};
