/** @jsx jsx */
import {jsx} from '@emotion/core';
import {DialogContent, DialogOverlay} from '@reach/dialog';
import React from 'react';
import {landscape, medium} from '../../styles/mediaqueries';
import {useImage} from '../../contexts/ImageContext';
import FullScreenSpinner from 'components/FullScreenSpinner/FullScreenSpinner';

function FinalImageModal({setIsDialogOpen, isDialogOpen, isLoadingLofi}) {
  const {getImage, getFilter} = useImage();
  return (
    <DialogOverlay
      onDismiss={() => setIsDialogOpen(false)}
      aria-label="welcome dialog"
      isOpen={isDialogOpen}
      style={{zIndex: '1', background: 'hsla(0, 0%, 0%, 0.9)'}}
    >
      <DialogContent
        css={{
          width: '100%',
          [medium]: {width: '100vh'},
          [landscape]: {width: '100vh'},
        }}
        aria-label={'lofi preview'}
        style={{
          background: 'hsla(0, 0%, 0%, 0.9)',
          padding: 0,
        }}
      >
        {isLoadingLofi ? (
          <FullScreenSpinner />
        ) : (
          <figure className={getFilter()}>
            <img alt={'final cover'} src={getImage()} width={'100%'} />
          </figure>
        )}
      </DialogContent>
    </DialogOverlay>
  );
}

export default FinalImageModal;
