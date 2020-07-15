/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';

const MusicControls = ({player, currentSong}) => {

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
