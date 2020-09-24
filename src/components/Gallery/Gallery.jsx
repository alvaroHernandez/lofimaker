/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React, { Fragment, useCallback, useEffect, useState } from 'react';
import {useAsync} from '../../hooks/useAsync';
import {getAll} from '../../clients/LofiClient';
import useLoFiLoader from '../LoFiLoader/LoFiLoader';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {Column, HeaderSection, Layout} from '../Layout/Layout';
import {dark, darker} from '../../styles/colors';
import GalleryControls from '../GalleryControls/GalleryControls';
import GalleryGrid from '../GalleryGrid/GalleryGrid';
import {usePlayers} from 'contexts/PlayersContext';
import {FullScreen, useFullScreenHandle} from 'react-full-screen';
import fscreen from "fscreen";
import FinalImageModal from "components/FinalImageModal/FinalImageModal";

const isFullScreenAvailable = fscreen.fullscreenEnabled;

const Gallery = () => {
  const {data: loFis, run} = useAsync({data: []});
  const {stopAll} = usePlayers();
  const handle = useFullScreenHandle();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    run(getAll());
  }, [run]);

  const {loadLoFi} = useLoFiLoader();

  async function elementClickHandler(loFi) {
    if (isFullScreenAvailable) {
      handle.enter();
    } else {
      setIsModalOpen(true);
    }
    await loadLoFi(loFi);
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
      css={css`
        background: linear-gradient(to right, #61045f, #aa076b);
      `}
    >
      <HeaderSection>
        <GalleryControls />
      </HeaderSection>
      <Layout color={'white'}>
        <Column spanSmall={12} spanMedium={12}>
          <GalleryGrid
            elements={loFis}
            elementClickHandler={elementClickHandler}
          />
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

export default Gallery;
