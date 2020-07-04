/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';

const MusicControls = ({currentSong, player}) => {
  function play() {
    if (player !== undefined) {
      player.start();
    }
  }

  function stop() {
    if (player !== undefined) {
      player.stop();
    }
  }

  return (
    <BoxWithCenteredContent css={{marginTop: '2em'}}>
      {currentSong ? (
        <div>
          {player ? (
            [
              <div css={{display: 'flex', justifyContent: 'center'}}>
                <Button
                  css={{margin: '0 1em'}}
                  variant={'secondary'}
                  onClick={play}
                >
                  Play
                </Button>
                <Button variant={'secondary'} onClick={stop}>
                  Stop
                </Button>
              </div>,
              <div>
                <MusicEffectsContainer player={player} />
              </div>,
            ]
          ) : (
            <div>
              <Spinner />
            </div>
          )}
        </div>
      ) : (
        'Search and select a song...'
      )}
    </BoxWithCenteredContent>
  );
};

export default MusicControls;
