/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Fragment, useState} from 'react';
import {Layout, Column, HeaderSection} from '../Layout/Layout';
import ImageLoader from '../ImageLoader/ImageLoader';
import {dark, darker, ultraDark} from '../../styles/colors';
import '@reach/tabs/styles.css';

import {Section} from '../Layout/Layout';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {usePlayers} from '../../contexts/PlayersContext';
import ExportControls from '../ExportControls/ExportControls';
import TracksEditor from '../TracksEditor/TracksEditor';
import GlobalPlayerControls from '../GlobalPlayerControls/GlobalPlayerControls';
import {StickySection} from '../StickySection/StickySection';

const LoFiMaker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const {playAll, stopAll} = usePlayers();

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
          <Section>
            <ImageLoader />
          </Section>
        </Column>
        <Column backgroundColor={ultraDark} spanSmall={12} spanMedium={9}>
          <StickySection>
            <GlobalPlayerControls />
          </StickySection>
          <Section>
            <TracksEditor />
          </Section>
        </Column>
      </Layout>
      <FinalImageContainer
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </Fragment>
  );
};

export default LoFiMaker;
