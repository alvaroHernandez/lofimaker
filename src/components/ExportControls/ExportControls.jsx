/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {Fragment, useState} from 'react';
import Button from '../Button/Button';
import {useHistory} from 'react-router-dom';
import SaveLoFiModal from '../SaveLoFiModal/SaveLoFiModal';
import {Grid} from '../Layout/Layout';
import { usePlayers } from "contexts/PlayersContext";
const buttonVariant = 'primary';

const ExportControls = ({preview}) => {
  const history = useHistory();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { stopAll } = usePlayers();

  const openSaveLoFiModal = () => {
    setIsDialogOpen(true);
    stopAll();
  };

  return (
    <Fragment>
      <Grid css={{gridTemplateColumns: '1fr 1fr 1fr'}}>
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
      </Grid>
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
