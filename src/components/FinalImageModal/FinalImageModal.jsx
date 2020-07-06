import {DialogContent, DialogOverlay} from '@reach/dialog';
import React from 'react';

function FinalImageModal({setIsDialogOpen, isDialogOpen, image, imageFilter}) {
  return (
    <DialogOverlay
      onDismiss={() => setIsDialogOpen(false)}
      aria-label="welcome dialog"
      isOpen={isDialogOpen}
      style={{background: 'hsla(0, 0%, 0%, 0.9)'}}
    >
      <DialogContent
        aria-label={'lofi preview'}
        style={{background: 'hsla(0, 0%, 0%, 0.9)'}}
      >
        <figure className={imageFilter}>
          <img alt={'final cover'} src={image} width={'100%'} />
        </figure>
      </DialogContent>
    </DialogOverlay>
  );
}

export default FinalImageModal;
