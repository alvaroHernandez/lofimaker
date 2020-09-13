import React, {Fragment, useEffect} from 'react';
import {useAsync} from '../../hooks/useAsync';
import {getAll} from '../../clients/LofiClient';
import useLoFiLoader from '../LoFiLoader/LoFiLoader';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {Column, HeaderSection, Layout} from '../Layout/Layout';
import {dark, darker} from '../../styles/colors';
import GalleryControls from '../GalleryControls/GalleryControls';
import GalleryGrid from '../GalleryGrid/GalleryGrid';

const Gallery = () => {
  const {data: loFis, run} = useAsync({data: []});
  useEffect(() => {
    run(getAll());
  }, [run]);

  const {
    imageData,
    filter,
    isDialogOpen,
    setIsDialogOpen,
    loadLoFi,
  } = useLoFiLoader();

  async function elementClickHandler(loFi) {
    await loadLoFi(loFi);
  }

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
      <FinalImageContainer
        finalImage={imageData}
        finalImageFilter={filter}
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
      />
    </Fragment>
  );
};

export default Gallery;
