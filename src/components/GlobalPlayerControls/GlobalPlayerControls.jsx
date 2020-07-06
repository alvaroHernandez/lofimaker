/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';

import {usePlayers} from '../../contexts/PlayersContext';

const GlobalPlayerControls = () => {
  const {playAll, pauseAll, stopAll} = usePlayers();
  return (
    <BoxWithCenteredContent css={{marginTop: '2em'}}>
      <Button
        css={{marginRight: '1em'}}
        variant={'secondary'}
        onClick={playAll}
      >
        Play All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={'secondary'}
        onClick={pauseAll}
      >
        Pause All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={'secondary'}
        onClick={stopAll}
      >
        Stop All Tracks
      </Button>
    </BoxWithCenteredContent>
  );
};

export default GlobalPlayerControls;
