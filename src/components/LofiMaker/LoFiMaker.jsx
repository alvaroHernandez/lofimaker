/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState} from 'react';
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
    <Layout color={'white'} backgroundColor={dark}>
      <Column backgroundColor={darker} back spanSmall={12} spanMedium={3}>
        <Section>
          <ImageLoader
            setGlobalFilter={setFinalImageFilter}
            updateFinalImage={updateFinalImage}
          />
        </Section>
      </Column>
      <Column backgroundColor={ultraDark} spanSmall={11} spanMedium={9}>
        <HeaderSection>
          <ExportControls preview={previewHandler} />
        </HeaderSection>
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
  );
};

export default LoFiMaker;
