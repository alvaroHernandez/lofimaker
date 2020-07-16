/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import Button from '../Button/Button';

import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
const buttonVariant = 'primary';
const ExportControls = ({preview}) => {
  return (
    <AutoFitGrid>
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

export default ExportControls;
