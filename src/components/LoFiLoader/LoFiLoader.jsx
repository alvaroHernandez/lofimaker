import {useCallback, useState} from 'react';
import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import {Distortion, EQ3, GrainPlayer, Reverb} from 'tone';
import {useAsync} from '../../hooks/useAsync';
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

const loadPlayer = playerData => {
  const player = new MusicTrackPlayer(
    new GrainPlayer({
      url: playerData.url,
      onerror: e => {
        // eslint-disable-next-line no-console
        console.log('error loading buffer for player ' + e);
      },
      onload: () => {
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {run} = useAsync();
  const {setFilter, setImage} = useImage();

  async function loadLoFi(deserializedLofi) {
    await disposeAll();
    setFilter(deserializedLofi.image.filter);
    loadImage(deserializedLofi.image.url);
    deserializedLofi.players
      .map(loadPlayer)
      .forEach(player => addPlayer(player.trackId, player));
    setIsDialogOpen(true);
    stopAll();
    playAll();
  }

  function loadImageFromUrl(url) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.addEventListener('load', () => resolve(url));
      image.addEventListener('error', () => reject('Error loading image'));
      image.src = url;
      setImage(image.src);
    });
  }

  const loadImage = useCallback(
    url => {
      run(loadImageFromUrl(url));
    },
    [loadImageFromUrl, run],
  );

  return {
    isDialogOpen,
    setIsDialogOpen,
    loadLoFi,
  };
};

export default useLoFiLoader;
