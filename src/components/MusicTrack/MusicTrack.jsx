/* eslint-disable react/prop-types */
import React, {useRef} from 'react';
import MusicControls from '../MusicControls/MusicControls';
import MusicSelector from '../MusicSelector/MusicSelector';
import SoundCloudClient from '../../clients/SoundCloudClient';
import FreeSoundClient from '../../clients/FreeSoundClient';

function soundClientFactory(type) {
  if (type === 'sound') {
    return new SoundCloudClient();
  } else if (type === 'effect') {
    return new FreeSoundClient();
  }
}

const MusicTrack = ({player, setPlayer, currentSong, setCurrentSong, type}) => {
  const soundClient = useRef(soundClientFactory(type));

  return (
    <>
      <MusicControls currentSong={currentSong} player={player} />
      <div>
        <MusicSelector
          soundClient={soundClient.current}
          setPlayer={setPlayer}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </>
  );
};

export default MusicTrack;
