/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';

const MusicEffect = ({children}) => {
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default MusicEffect;
