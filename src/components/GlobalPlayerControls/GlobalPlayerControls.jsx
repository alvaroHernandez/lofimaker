/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';

import {usePlayers} from '../../contexts/PlayersContext';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
const buttonVariant = 'primary';
const GlobalPlayerControls = ({preview}) => {
  const {playAll, pauseAll, stopAll} = usePlayers();
  return (
    <AutoFitGrid>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={playAll}
      >
        Play All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={pauseAll}
      >
        Pause All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={stopAll}
      >
        Stop All Tracks
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={preview}
      >
        Preview
      </Button>
      <Button
        css={{marginRight: '1em'}}
        variant={buttonVariant}
        onClick={() => {}}
      >
        Share
      </Button>
    </AutoFitGrid>
  );
};

export default GlobalPlayerControls;
