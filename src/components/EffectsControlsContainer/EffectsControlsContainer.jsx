/** @jsx jsx */
import {jsx} from '@emotion/core';
import styled from '@emotion/styled/macro';
import {medium} from '../../styles/mediaqueries';
import React, {useRef} from 'react';

const EffectsControlsContainer = ({children, containerRef}) => {
  return (
    <div
      ref={containerRef}
      css={{
        display: 'flex',
        marginTop: '1em',
        paddingBottom: '1em',
        overflow: 'auto',
        [medium]: {
          placeContent: 'center',
          paddingBottom: '0',
        },
      }}
    >
      {children}
    </div>
  );
};

export default EffectsControlsContainer;
