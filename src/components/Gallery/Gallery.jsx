import React, {Fragment, useCallback, useEffect} from 'react';
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

const Gallery = () => {
  const {data: loFis, run} = useAsync({data: []});
  const {stopAll} = usePlayers();
  const handle = useFullScreenHandle();

  useEffect(() => {
    run(getAll());
  }, [run]);

  const {loadLoFi} = useLoFiLoader();

  async function elementClickHandler(loFi) {
    handle.enter();
    await loadLoFi(loFi);
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
        <GalleryControls />
      </HeaderSection>
      <Layout color={'white'} backgroundColor={dark}>
        <Column backgroundColor={darker} back spanSmall={12} spanMedium={12}>
          <GalleryGrid
            elements={loFis}
            elementClickHandler={elementClickHandler}
          />
        </Column>
      </Layout>
      <FullScreen handle={handle} onChange={reportChange}>
        {handle.active && <FinalImageContainer />}
      </FullScreen>
    </Fragment>
  );
};

export default Gallery;
