/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';

import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
const buttonVariant = 'primary';
const ExportControls = ({preview}) => {
  return (
    <AutoFitGrid min={'100px'}>
      <Button
        variant={buttonVariant}
        onClick={preview}
      >
        Preview
      </Button>
      <Button
        variant={buttonVariant}
        onClick={() => {}}
      >
        Share
      </Button>
    </AutoFitGrid>
  );
};

export default ExportControls;
