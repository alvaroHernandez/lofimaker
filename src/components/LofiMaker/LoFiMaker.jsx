/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {Fragment, useCallback, useState} from 'react';
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
import {FullScreen, useFullScreenHandle} from 'react-full-screen';

const LoFiMaker = () => {
  const {playAll, stopAll} = usePlayers();
  const handle = useFullScreenHandle();

  function previewHandler() {
    handle.enter();
    stopAll();
    playAll();
  }

  const reportChange = useCallback(
    (state, handle) => {
      if (state === false) {
        stopAll();
      }
    },
    [stopAll],
  );

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
      <FullScreen handle={handle} onChange={reportChange}>
        {handle.active && <FinalImageContainer />}
      </FullScreen>
    </Fragment>
  );
};

export default LoFiMaker;
