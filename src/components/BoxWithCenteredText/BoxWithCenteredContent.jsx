/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';

const BoxWithCenteredContent = props => {
  return (
    <div
      css={{
        margin: '0.5em 0 0.5em',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      {...props}
    />
  );
};

export default BoxWithCenteredContent;
