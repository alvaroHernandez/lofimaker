/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';

const AutoFitGrid = props => {
  return (
    <div
      {...props}
      css={{
        display: 'grid',
        gridTemplateColumns: 'repeat( auto-fit, minmax(250px, 1fr) )',
        gridGap: '1em',
      }}
    />
  );
};

export default AutoFitGrid;
