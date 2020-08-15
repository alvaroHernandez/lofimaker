/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';

import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import {usePlayers} from '../../contexts/PlayersContext';
import {useImage} from '../../contexts/ImageContext';
const buttonVariant = 'primary';
const ExportControls = ({preview}) => {
  const {serialize} = usePlayers();
  const {getImage, getFilter} = useImage();

  const logSerialized = () => {
    const result = {
      players: serialize(),
      image: {url: getImage(), filter: getFilter()},
    };
    console.log(JSON.stringify(result));
    console.log(result);
  };

  return (
    <AutoFitGrid min={'100px'}>
      <Button variant={buttonVariant} onClick={preview}>
        Preview
      </Button>
      <Button variant={buttonVariant} onClick={logSerialized}>
        Share
      </Button>
    </AutoFitGrid>
  );
};

export default ExportControls;
