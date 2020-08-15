/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {Fragment, useEffect} from 'react';
import {useAsync} from '../../hooks/useAsync';
import {getAll} from '../../clients/LofiClient';
import useLoFiLoader from '../LoFiLoader/LoFiLoader';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {Column, HeaderSection, Layout} from '../Layout/Column';
import {dark, darker} from '../../styles/colors';
import GalleryControls from '../GalleryControls/GalleryControls';

const Gallery = () => {
  const {data: lofis, run} = useAsync({data: []});
  useEffect(() => {
    run(getAll());
  }, [run]);

  async function clickHandler(loFi) {
    await loadLofi(loFi);
  }

  const {
    imageData,
    filter,
    isDialogOpen,
    setIsDialogOpen,
    loadLofi,
  } = useLoFiLoader();

  return (
    <Fragment>
      <HeaderSection>
        <GalleryControls />
      </HeaderSection>
      <Layout color={'white'} backgroundColor={dark}>
        <Column backgroundColor={darker} back spanSmall={12} spanMedium={12}>
          <ul
            css={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gridGap: '10px',
              gridAutoFlow: 'dense',
              listStyle: 'none',
              margin: '1em auto',
              padding: '0',
            }}
          >
            {lofis.map(lofi => (
              <li key={lofi.id} onClick={() => clickHandler(lofi)}>
                <img
                  key={lofi.id}
                  alt={'lofi cover'}
                  css={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                  }}
                  src={lofi.image.url}
                />
              </li>
            ))}
          </ul>
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
