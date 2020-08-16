/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {Fragment, useState} from 'react';
import Button from '../Button/Button';
import {useHistory} from 'react-router-dom';

import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import SaveLoFiModal from '../SaveLoFiModal/SaveLoFiModal';
const buttonVariant = 'primary';
const ExportControls = ({preview}) => {
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openSaveLoFiModal = () => {
    setIsDialogOpen(true);
  };

  return (
    <Fragment>
      <AutoFitGrid min={'100px'}>
        <Button variant={buttonVariant} onClick={preview}>
          Preview
        </Button>
        <Button variant={buttonVariant} onClick={openSaveLoFiModal}>
          Share
        </Button>
        <Button
          variant={buttonVariant}
          onClick={() => history.push('/gallery')}
        >
          Gallery
        </Button>
      </AutoFitGrid>
      {isDialogOpen && (
        <SaveLoFiModal
          setIsDialogOpen={setIsDialogOpen}
          isDialogOpen={isDialogOpen}
        />
      )}
    </Fragment>
  );
};

export default ExportControls;
