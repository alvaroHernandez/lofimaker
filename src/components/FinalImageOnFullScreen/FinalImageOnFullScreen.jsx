/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {useImage} from '../../contexts/ImageContext';

function FinalImageOnFullScreen() {
  const {getImage, getFilter} = useImage();
  return (
    <div css={{display: 'grid', placeItems: 'center'}}>
      <figure
        css={{width: 'fit-content', height: '100vh'}}
        className={getFilter()}
      >
        <img
          css={{width: 'auto !important', height: '100vh'}}
          alt={'final cover'}
          src={getImage()}
        />
      </figure>
    </div>
  );
}

export default FinalImageOnFullScreen;
