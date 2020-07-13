/* eslint-disable react/prop-types */
/** @jsx jsx */
import {jsx} from '@emotion/core';
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

const MusicTrack = ({
  trackId,
  currentSong,
  setCurrentSong,
  type,
  playRef,
  stopRef,
}) => {
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
    <React.Fragment>
      <MusicControls
        playRef={playRef}
        stopRef={stopRef}
        player={currentPlayer}
        currentSong={currentSong}
      />
      <div css={{marginTop: '1em'}}>
        <MusicSelector
          soundClient={soundClient.current}
          selectionHandler={handleSelection}
        />
      </div>
    </React.Fragment>
  );
};

export default MusicTrack;
