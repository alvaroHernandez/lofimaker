/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React from 'react';
import Spinner from 'components/Spinner/Spinner';

const FullScreenSpinner = () => (
  <div
    css={{
      color: 'white',
      width: '100%',
      fontSize: '7em',
      height: '100vh',
      alignContent: 'center',
      display: 'grid',
      justifyContent: 'center',
    }}
  >
    <Spinner />
  </div>
);

export default FullScreenSpinner;
