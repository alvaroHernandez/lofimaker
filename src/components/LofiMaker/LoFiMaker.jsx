/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React, {Fragment, useCallback, useState} from 'react';
import {Layout, Column, HeaderSection} from '../Layout/Layout';
import ImageLoader from '../ImageLoader/ImageLoader';
import {dark, darker, ultraDark} from '../../styles/colors';
import '@reach/tabs/styles.css';
import fscreen from 'fscreen';

import {Section} from '../Layout/Layout';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {usePlayers} from '../../contexts/PlayersContext';
import ExportControls from '../ExportControls/ExportControls';
import TracksEditor from '../TracksEditor/TracksEditor';
import GlobalPlayerControls from '../GlobalPlayerControls/GlobalPlayerControls';
import {StickySection} from '../StickySection/StickySection';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import FinalImageModal from 'components/FinalImageModal/FinalImageModal';

const isFullScreenAvailable = fscreen.fullscreenEnabled;

const style = css`
  height: 100%;
  box-sizing: border-box;
  margin: 0 20px 1em 20px;
  -webkit-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.31);
  -moz-box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.31);
  box-shadow: 10px 10px 5px 0px rgba(0, 0, 0, 0.31);
  background: linear-gradient(to right, #ed6c6c, #aa076b);
  padding: 1em;
`;

const LoFiMaker = () => {
  const {playAll, stopAll} = usePlayers();
  const handle = useFullScreenHandle();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function previewHandler() {
    if (isFullScreenAvailable) {
      handle.enter();
    } else {
      setIsModalOpen(true);
    }
    stopAll();
    playAll();
  }

  const onModalClose = () => {
    stopAll();
    setIsModalOpen(false);
  };

  const reportChange = useCallback(
    (state, handle) => {
      if (state === false) {
        stopAll();
      }
    },
    [stopAll],
  );

  return (
    <div
      css={{
        background: 'linear-gradient(to right, #61045F, #AA076B)',
      }}
    >
      <HeaderSection>
        <ExportControls preview={previewHandler} />
      </HeaderSection>
      <Layout color={'white'}>
        <Column spanSmall={12} spanMedium={3}>
          <div css={style}>
            <ImageLoader />
          </div>
        </Column>
        <Column spanSmall={12} spanMedium={9}>
          <div
            css={css`
              height: 100vh;
              margin: 0 20px 1em 20px;
            `}
          >
            <StickySection>
              <GlobalPlayerControls />
            </StickySection>
            <Section>
              <TracksEditor />
            </Section>
          </div>
        </Column>
      </Layout>
      {isFullScreenAvailable ? (
        <FullScreen handle={handle} onChange={reportChange}>
          {handle.active && <FinalImageContainer />}
        </FullScreen>
      ) : (
        <FinalImageModal
          setIsDialogOpen={onModalClose}
          isDialogOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default LoFiMaker;
