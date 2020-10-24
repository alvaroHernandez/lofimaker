import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import {Distortion, EQ3, GrainPlayer, Reverb} from 'tone';
import {usePlayers} from '../../contexts/PlayersContext';
import {useImage} from '../../contexts/ImageContext';
import {SequencePlayer} from 'contexts/TrackPlayer';

const onloadPlayer = player => {
  Object.entries(player.effectsToggles).forEach(([k, isOn]) => {
    if (k === 'Reverb' && isOn) {
      const reverberation = new Reverb().toDestination();
      reverberation.decay = player.effects.decay;
      player.player.connect(reverberation);
    }
    if (k === 'Distortion' && isOn) {
      const distortion = new Distortion().toDestination();
      distortion.distortion = player.effects.distortion;
      player.player.connect(distortion);
    }
    if (k === 'EQ3' && isOn) {
      const equalizer = new EQ3().toDestination();
      equalizer.low.value = player.effects.low;
      equalizer.mid.value = player.effects.mid;
      equalizer.high.value = player.effects.high;
      player.player.connect(equalizer);
    }
  });

  player.sync(player.startTime).start();
};

const loadSequencePlayer = (playerData, playerLoadedCallback) => {
  const {
    timeBetweenBeats,
    totalBeats,
    trackId,
    title,
    duration,
    beatsContainer,
    loops,
    playbackRate,
    startTime,
  } = playerData;
  const sequencePlayer = new SequencePlayer(
    () => {},
    timeBetweenBeats,
    totalBeats,
    trackId,
    title,
    duration,
  );
  beatsContainer.forEach((beatTracks, beatIndex) => {
    Object.entries(beatTracks).forEach(([trackName, hasPlayer]) => {
      if (hasPlayer === true) {
        sequencePlayer.beatsContainer[beatIndex][
          trackName
        ] = sequencePlayer.getPlayer(trackName);
      }
    });
  });

  sequencePlayer.updateLoop(loops);
  sequencePlayer.updatePlaybackRate(playbackRate);
  sequencePlayer.updatePlayerStartingOffset(startTime);
  playerLoadedCallback();
  return sequencePlayer;
};

const loadMusicTrackPlayer = (playerData, playerLoadedCallback) => {
  const player = new MusicTrackPlayer(
    new GrainPlayer({
      url: playerData.url,
      onerror: e => {
        // eslint-disable-next-line no-console
        console.log('error loading buffer for player ' + e);
      },
      onload: () => {
        playerLoadedCallback();
        player.onload();
      },
    }),
    playerData.trackId,
    playerData.title,
    playerData.duration,
    newPlayer => onloadPlayer(newPlayer),
    playerData.url,
    playerData.startTime,
    playerData.effects,
    playerData.effectsToggles,
  );
  return player;
};

const useLoFiLoader = () => {
  const {addPlayer, stopAll, playAll, disposeAll} = usePlayers();
  const {setFilter, setImage} = useImage();

  const loadLoFi = deserializedLofi =>
    new Promise(resolve => {
      disposeAll();
      setFilter(deserializedLofi.image.filter);
      loadImageFromUrl(deserializedLofi.image.url);
      let totalPlayers = deserializedLofi.players.length;
      deserializedLofi.players
        .map(player => {
          if (player.type === 'MusicTrackPlayer') {
            return loadMusicTrackPlayer(player, () => {
              totalPlayers = totalPlayers - 1;
            });
          } else if (player.type === 'SequencePlayer') {
            return loadSequencePlayer(player, () => {
              totalPlayers = totalPlayers - 1;
            });
          } else {
            // eslint-disable-next-line no-console
            console.log('error loading player', player);
            totalPlayers = totalPlayers - 1;
            return null;
          }
        })
        .forEach(player => {
          if (player !== null) addPlayer(player.trackId, player);
        });
      const checkIfAllPlayerAreLoaded = setInterval(() => {
        if (totalPlayers === 0) {
          clearInterval(checkIfAllPlayerAreLoaded);
          stopAll();
          playAll();
          resolve();
        }
      }, 330);
    });

  function loadImageFromUrl(url) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.addEventListener('load', () => resolve(url));
      image.addEventListener('error', () => reject('Error loading image'));
      image.src = url;
      setImage(image.src);
    });
  }

  return {
    loadLoFi,
  };
};

export default useLoFiLoader;
