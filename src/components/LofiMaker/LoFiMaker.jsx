/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Fragment, useState} from 'react';
import {Layout, Column} from '../Layout/Column';

import ImageLoader from '../ImageLoader/ImageLoader';
import {dark, darker, ultraDark} from '../../styles/colors';
import '@reach/tabs/styles.css';

import {Section} from '../Layout/Column';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {usePlayers} from '../../contexts/PlayersContext';
import ExportControls from '../ExportControls/ExportControls';
import styled from '@emotion/styled/macro';
import TracksEditor from '../TracksEditor/TracksEditor';

const HeaderSection = styled(Section)`
  padding: 0.7em;
  margin-top: 0;
  background-color: ${dark};
`;

const LoFiMaker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [finalImage, setFinalImage] = useState();
  const [finalImageFilter, setFinalImageFilter] = useState();

  const {playAll, stopAll} = usePlayers();

  const updateFinalImage = imageSrc => {
    setFinalImage(imageSrc);
  };

  function previewHandler() {
    setIsDialogOpen(true);
    stopAll();
    playAll();
  }

  return (
    <Fragment>
      <HeaderSection>
        <ExportControls preview={previewHandler} />
      </HeaderSection>
      <Layout color={'white'} backgroundColor={dark}>
        <Column backgroundColor={darker} back spanSmall={12} spanMedium={3}>
          <ImageLoader
            setGlobalFilter={setFinalImageFilter}
            updateFinalImage={updateFinalImage}
          />
        </Column>
        <Column backgroundColor={ultraDark} spanSmall={12} spanMedium={9}>
          <Section>
            <TracksEditor />
          </Section>
          <FinalImageContainer
            finalImage={finalImage}
            finalImageFilter={finalImageFilter}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        </Column>
      </Layout>
    </Fragment>
  );
};

export default LoFiMaker;
