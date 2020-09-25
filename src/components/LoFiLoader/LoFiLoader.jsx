import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import {Distortion, EQ3, GrainPlayer, Reverb} from 'tone';
import {usePlayers} from '../../contexts/PlayersContext';
import {useImage} from '../../contexts/ImageContext';

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

const loadPlayer = (playerData, playerLoadedCallback) => {
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
        .map(player =>
          loadPlayer(player, () => {
            totalPlayers = totalPlayers - 1;
          }),
        )
        .forEach(player => addPlayer(player.trackId, player));
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
