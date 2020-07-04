/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {darker} from '../../styles/colors';

const BoxWithCenteredContent = ({children}) => {
  return (
    <div
      css={{
        margin: '0.5em 0 2em',
        width: '100%',
        backgroundColor: darker,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </div>
  );
};

export default BoxWithCenteredContent;
