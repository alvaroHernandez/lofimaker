/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import {useHistory} from 'react-router-dom';

import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import {usePlayers} from '../../contexts/PlayersContext';
import {useImage} from '../../contexts/ImageContext';
import {save} from '../../clients/LofiClient';
const buttonVariant = 'primary';
const ExportControls = ({preview}) => {
  const history = useHistory();
  const {serialize} = usePlayers();
  const {getImage, getFilter} = useImage();

  const logSerialized = async () => {
    const result = {
      players: serialize(),
      image: {url: getImage(), filter: getFilter()},
    };
    console.debug(JSON.stringify(result));
    console.debug((result));
    await save(result);
  };

  return (
    <AutoFitGrid min={'100px'}>
      <Button variant={buttonVariant} onClick={preview}>
        Preview
      </Button>
      <Button variant={buttonVariant} onClick={logSerialized}>
        Share
      </Button>
      <Button variant={buttonVariant} onClick={() => history.push('/gallery')}>
        Gallery
      </Button>
    </AutoFitGrid>
  );
};

export default ExportControls;
