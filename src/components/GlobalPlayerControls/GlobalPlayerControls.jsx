/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useEffect} from 'react';
import {IconButton} from '../Button/Button';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import {usePlayers} from '../../contexts/PlayersContext';
import {FaPlayCircle, FaPauseCircle, FaStopCircle} from 'react-icons/fa';
import {Transport} from 'tone';

const buttonVariant = 'primary';
const GlobalPlayerControls = () => {
  const {playAll, pauseAll, stopAll} = usePlayers();
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    Transport.on('stop', () => {
      setIsPlaying(false);
    });

    Transport.on('pause', () => {
      setIsPlaying(false);
    });
  }, []);

  const play = () => {
    setIsPlaying(true);
    playAll();
  };

  const pause = () => {
    setIsPlaying(false);
    pauseAll();
  };

  const stop = () => {
    setIsPlaying(false);
    stopAll();
  };

  return (
    <AutoFitGrid min={'50px'}>
      <IconButton variant={buttonVariant} onClick={play} disabled={isPlaying}>
        <FaPlayCircle />
      </IconButton>
      <IconButton variant={buttonVariant} onClick={pause} disabled={!isPlaying}>
        <FaPauseCircle />
      </IconButton>
      <IconButton variant={buttonVariant} onClick={stop} disabled={!isPlaying}>
        <FaStopCircle />
      </IconButton>
    </AutoFitGrid>
  );
};

export default GlobalPlayerControls;
