/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {ultraDark} from '../../styles/colors';
import Button from '../Button/Button';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import {usePlayers} from '../../contexts/PlayersContext';

const buttonVariant = 'primary';

const GlobalPlayerControls = () => {
  const {playAll, pauseAll, stopAll, isPlaying} = usePlayers();

  return (
    <AutoFitGrid css={{backgroundColor: ultraDark, marginTop: '1em'}}>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={playAll}
        disabled={isPlaying}
      >
        Play All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={pauseAll}
        disabled={!isPlaying}
      >
        Pause All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={stopAll}
        disabled={!isPlaying}
      >
        Stop All Tracks
      </Button>
    </AutoFitGrid>
  );
};

export default GlobalPlayerControls;
