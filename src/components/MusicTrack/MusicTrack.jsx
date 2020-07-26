/* eslint-disable react/prop-types */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import MusicSelector from '../MusicSelector/MusicSelector';
import SoundCloudClient from '../../clients/SoundCloudClient';
import FreeSoundClient from '../../clients/FreeSoundClient';
import {usePlayers} from '../../contexts/PlayersContext';
import {GrainPlayer} from 'tone';
import {MusicTrackPlayer} from '../../contexts/TrackPlayer';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';

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

  const updateDuration = useCallback(
    () => playbackRate => {
      currentPlayer.duration = currentPlayer.originalDuration / playbackRate;
      updateCurrentPlayer(currentPlayer);
    },
    [currentPlayer, updateCurrentPlayer],
  );

  const onloadPlayer = (player, oldPlayer) => {
    if (oldPlayer !== undefined) {
      oldPlayer.dispose();
    }

    player.sync().start();
    setLoadingState('done');
  };

  const createPlayer = useCallback(
    async getMusicInformation => {
      try {
        setLoadingState('loading');
        const oldPlayer = currentPlayer;

        const {title, duration, url} = await getMusicInformation();
        stopAll();

        const player = new MusicTrackPlayer(
          new GrainPlayer({
            url: url,
            onerror: e => {
              // eslint-disable-next-line no-console
              console.log('error loading buffer for player ' + e);
            },
            onload: () => {
              player.onload();
            },
          }),
          trackId,
          title,
          duration,
          newPlayer => {
            onloadPlayer(newPlayer, oldPlayer);
          },
        );
        addPlayer(trackId, player);
        await setCurrentPlayer(player);
        updateCurrentPlayer(player);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.log('error loading player ' + e);
        setLoadingState('error');
      }
    },
    [addPlayer, currentPlayer, stopAll, trackId, updateCurrentPlayer],
  );

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
    () => (
      <MusicEffectsContainer
        player={currentPlayer?.player}
        updateDuration={updateDuration}
      />
    ),
    [currentPlayer, updateDuration],
  );

  return (
    <React.Fragment>
      <div>
        {loadingState === 'loading' && (
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
        {loadingState === 'error' && (
          <BoxWithCenteredContent>
            <text>Error</text>
          </BoxWithCenteredContent>
        )}
        {loadingState === 'done' && currentPlayer && (
          <div>{musicEffectContainer}</div>
        )}
      </div>
      <div css={{marginTop: '1em'}}>{musicSelector}</div>
    </React.Fragment>
  );
};

export default MusicTrack;
