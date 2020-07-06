/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import MusicEffectsContainer from '../../MusicEffectsContainer/MusicEffectsContainer';
import Spinner from '../Spinner/Spinner';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import {usePlayers} from '../../contexts/PlayersContext';

const MusicControls = ({player, currentSong}) => {
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

  return (
    <BoxWithCenteredContent css={{paddingTop: '2em'}}>
      {currentSong ? (
        <div>
          {player ? (
            [
              !isPlaying && (
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
                </div>
              ),
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
