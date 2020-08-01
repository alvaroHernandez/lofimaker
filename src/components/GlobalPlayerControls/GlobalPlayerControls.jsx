/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {ultraDark} from '../../styles/colors';
import Button from '../Button/Button';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import {usePlayers} from '../../contexts/PlayersContext';
import {FaPlayCircle} from 'react-icons/fa';
import {FaPauseCircle} from 'react-icons/fa';
import {FaStopCircle} from 'react-icons/fa';

const buttonVariant = 'primary';

const GlobalPlayerControls = () => {
  const {playAll, pauseAll, stopAll, isPlaying} = usePlayers();

  return (
    <AutoFitGrid
      min={'50px'}
      css={{backgroundColor: ultraDark, marginTop: '1em'}}
    >
      <Button
        css={{fontSize: '1.2em', padding: '0.2em'}}
        variant={buttonVariant}
        onClick={playAll}
        disabled={isPlaying}
      >
        <FaPlayCircle />
      </Button>
      <Button
        css={{fontSize: '1.2em', padding: '0.2em'}}
        variant={buttonVariant}
        onClick={pauseAll}
        disabled={!isPlaying}
      >
        <FaPauseCircle />
      </Button>
      <Button
        css={{fontSize: '1.2em', padding: '0.2em'}}
        variant={buttonVariant}
        onClick={stopAll}
        disabled={!isPlaying}
      >
        <FaStopCircle />
      </Button>
    </AutoFitGrid>
  );
};

export default GlobalPlayerControls;
