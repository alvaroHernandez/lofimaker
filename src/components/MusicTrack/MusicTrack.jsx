/* eslint-disable react/prop-types */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import MusicSelector from '../MusicSelector/MusicSelector';
import SoundCloudClient from '../../clients/SoundCloudClient';
import FreeSoundClient from '../../clients/FreeSoundClient';
import {usePlayers} from '../../contexts/PlayersContext';
import {GrainPlayer} from 'tone';
import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';

function soundClientFactory(type) {
  if (type === 'Sound') {
    return new SoundCloudClient();
  } else if (type === 'Effect') {
    return new FreeSoundClient();
  }
}

const MusicTrack = ({trackId, updateCurrentPlayer, type}) => {
  const soundClient = useRef(soundClientFactory(type));

  const {addPlayer, stopAll} = usePlayers();
  const [currentPlayer, setCurrentPlayer] = useState();
  const [loadingState, setLoadingState] = useState('idle');

  const updateDuration = playbackRate => {
    currentPlayer.duration = currentPlayer.originalDuration/ playbackRate;
    updateCurrentPlayer(currentPlayer);
  };

  async function createPlayer(getMusicInformation) {
    setLoadingState('loading');
    const {title, duration, url} = await getMusicInformation();
    stopAll();
    if (currentPlayer !== undefined) {
      currentPlayer.dispose();
    }

    const player = new MusicTrackPlayer(
      new GrainPlayer(url, () => {
        //TODO: move to MusicTrackPlayer and create my own hooks to update ui players accordingly inside that class
        addPlayer(trackId, player);
        setCurrentPlayer(player);
        updateCurrentPlayer(player);
        player.sync().start();
        setLoadingState('done');
      }),
      trackId,
      title,
      duration,
    );
    // updateDuration(duration,1);
  }

  const musicSelector = useMemo(
    () => (
      <MusicSelector
        soundClient={soundClient.current}
        selectionHandler={createPlayer}
      />
    ),

    [createPlayer],
  );

  const musicEffectContainer = useMemo(
    () => <MusicEffectsContainer player={currentPlayer?.player} updateDuration={updateDuration} />,
    [currentPlayer],
  );

  return (
    <React.Fragment>
      {loadingState !== 'idle' && (
        <div>
          {loadingState === 'done' && currentPlayer ? (
            <div>{musicEffectContainer}</div>
          ) : (
            <div
              css={{
                padding: '1em',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '39px',
              }}
            >
              <Spinner />
            </div>
          )}
        </div>
      )}
      <div css={{marginTop: '1em'}}>{musicSelector}</div>
    </React.Fragment>
  );
};

export default MusicTrack;
