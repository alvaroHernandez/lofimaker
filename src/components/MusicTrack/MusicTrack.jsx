/* eslint-disable react/prop-types */
import React, {useEffect, useRef, useState} from 'react';
import MusicControls from '../MusicControls/MusicControls';
import MusicSelector from '../MusicSelector/MusicSelector';
import SoundCloudClient from '../../clients/SoundCloudClient';
import FreeSoundClient from '../../clients/FreeSoundClient';
import {v4 as uuidv4} from 'uuid';
import {usePlayers} from '../../contexts/PlayersContext';
import {GrainPlayer} from 'tone';

function soundClientFactory(type) {
  if (type === 'Sound') {
    return new SoundCloudClient();
  } else if (type === 'Effect') {
    return new FreeSoundClient();
  }
}

const MusicTrack = ({currentSong, setCurrentSong, type}) => {
  const soundClient = useRef(soundClientFactory(type));
  const trackId = useRef(uuidv4());
  const {getPlayer, addPlayer} = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
    console.log('useeffect');
    setCurrentPlayer(getPlayer(trackId));
  }, []);

  async function handleSelection({title, duration, url}) {
    if (currentPlayer !== undefined) {
      currentPlayer.dispose();
      await setCurrentPlayer();
    }

    setCurrentSong({title, duration});
    const player = new GrainPlayer(url, () => {
      console.log(player);
      setCurrentPlayer(player);
      addPlayer(trackId.current, player);
    }).toDestination();
    player.olverlap = 0;
    player.autostart = false;
    player.name = trackId.current;
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
