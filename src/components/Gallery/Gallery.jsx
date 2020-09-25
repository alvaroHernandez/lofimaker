/** @jsx jsx */
import {css, jsx} from '@emotion/core';
import React, {Fragment, useCallback, useEffect, useState} from 'react';
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
import fscreen from 'fscreen';
import FinalImageModal from 'components/FinalImageModal/FinalImageModal';
import Spinner from 'components/Spinner/Spinner';
import FullScreenSpinner from 'components/FullScreenSpinner/FullScreenSpinner';

const isFullScreenAvailable = fscreen.fullscreenEnabled;

const Gallery = () => {
  const {data: loFis, run, isLoadingGallery} = useAsync({data: []});
  const {stopAll} = usePlayers();
  const handle = useFullScreenHandle();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingLoFi, setLoadingLoFi] = useState(false);

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
    setLoadingLoFi(true);
    await loadLoFi(loFi);
    setLoadingLoFi(false);
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
          {isLoadingGallery ? (
            <div
              css={{
                width: '100%',
                fontSize: '7em',
                height: '100vh',
                alignContent: 'center',
                display: 'grid',
                justifyContent: 'center',
              }}
            >
              <Spinner />
            </div>
          ) : (
            <div css={{height: '100vh'}}>
              <GalleryGrid
                elements={loFis}
                elementClickHandler={elementClickHandler}
              />
            </div>
          )}
        </Column>
      </Layout>
      {isFullScreenAvailable ? (
        <FullScreen handle={handle} onChange={reportChange}>
          {handle.active &&
            (loadingLoFi ? <FullScreenSpinner /> : <FinalImageContainer />)}
        </FullScreen>
      ) : (
        <FinalImageModal
          isLoadingLofi={loadingLoFi}
          setIsDialogOpen={onModalClose}
          isDialogOpen={isModalOpen}
        />
      )}
    </div>
  );
};

export default Gallery;
