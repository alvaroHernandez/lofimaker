/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';
import {useHistory} from 'react-router-dom';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
const buttonVariant = 'primary';
const GalleryControls = () => {
  const history = useHistory();

  return (
    <AutoFitGrid min={'100px'}>
      <Button variant={buttonVariant} onClick={() => history.push('/')}>
        GoBack
      </Button>
    </AutoFitGrid>
  );
};

export default GalleryControls;
