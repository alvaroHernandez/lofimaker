/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import {usePlayers} from '../../contexts/PlayersContext';

const MusicControls = ({player, currentSong, playRef, stopRef}) => {
  const {isPlaying} = usePlayers();

  function play() {
    if (player !== undefined) {
      player.unsync();
      player.start();
    }
  }

  function stop() {
    if (player !== undefined) {
      player.unsync();
      player.stop();
    }
  }

  playRef.current = play;
  stopRef.current = stop;

  return currentSong ? (
    <div>
      {player ? (
        <div>
          <MusicEffectsContainer player={player} />
        </div>
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
  ) : null;
};

export default MusicControls;
