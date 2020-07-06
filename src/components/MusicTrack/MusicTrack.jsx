/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from 'react';
import MusicControls from '../MusicControls/MusicControls';
import MusicSelector from '../MusicSelector/MusicSelector';
import SoundCloudClient from '../../clients/SoundCloudClient';
import FreeSoundClient from '../../clients/FreeSoundClient';
import {usePlayers} from '../../contexts/PlayersContext';
import {GrainPlayer} from 'tone';

function soundClientFactory(type) {
  if (type === 'Sound') {
    return new SoundCloudClient();
  } else if (type === 'Effect') {
    return new FreeSoundClient();
  }
}

const MusicTrack = ({trackId, currentSong, setCurrentSong, type}) => {
  const soundClient = useRef(soundClientFactory(type));

  const {getPlayer, addPlayer} = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
    setCurrentPlayer(getPlayer(trackId));
  }, []);

  async function handleSelection({title, duration, url}) {
    if (currentPlayer !== undefined) {
      currentPlayer.dispose();
      await setCurrentPlayer();
    }

    setCurrentSong({title, duration});
    const player = new GrainPlayer(url, () => {
      setCurrentPlayer(player);
      addPlayer(trackId, player);
    }).toDestination();
    player.olverlap = 0;
    player.autostart = false;
    player.name = trackId;
  }

  return (
    <>
      <MusicControls player={currentPlayer} currentSong={currentSong} />
      <div>
        <MusicSelector
          soundClient={soundClient.current}
          selectionHandler={handleSelection}
        />
      </div>
    </>
  );
};

export default MusicTrack;
