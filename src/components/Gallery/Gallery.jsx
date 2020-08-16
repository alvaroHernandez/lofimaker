/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {Fragment, useEffect} from 'react';
import {useAsync} from '../../hooks/useAsync';
import {getAll} from '../../clients/LofiClient';
import useLoFiLoader from '../LoFiLoader/LoFiLoader';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import {Column, HeaderSection, Layout} from '../Layout/Column';
import {dark, darker, light, lighter} from '../../styles/colors';
import GalleryControls from '../GalleryControls/GalleryControls';
import styled from '@emotion/styled/macro';

const ButtonContainer = styled.div({
  opacity: '0',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  '-ms-transform': 'translate(-50%, -50%)',
  'text-align': 'center',
});

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
              <li
                css={{
                  position: 'relative',
                  width: '100%',
                  background: '#212529',
                  '&:hover': {
                    'img:nth-child(1)': {opacity: '0.3'},
                    'div:nth-child(2)': {opacity: 1},
                  },
                }}
              >
                <img
                  key={lofi.id}
                  alt={'lofi cover'}
                  css={{
                    display: 'block',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    '&:hover': {opacity: '0.3'},
                  }}
                  src={lofi.image.url}
                />
                <ButtonContainer>
                  <button
                    css={{
                      border: 0,
                      fontSize: '3em',
                      background: '#fff0f000',
                      color: light,
                      '&:hover': {
                        color: lighter,
                      },
                    }}
                    onClick={() => clickHandler(lofi)}
                  >
                    Play!
                  </button>
                </ButtonContainer>
                <div
                  css={{
                    background: 'rgb(41 37 34 / 72%)',
                    position: 'absolute',
                    bottom: '-10px',
                    marginBottom: '10px',
                    padding: '10px',
                    width: '100%',
                    boxSizing: 'border-box',
                    color: lighter,
                  }}
                >
                  <span
                    css={{
                      display: 'block',
                    }}
                  >
                    {lofi.name}
                  </span>
                  <span
                    css={{
                      fontSize: '13px',
                      display: 'block',
                      color: light,
                    }}
                  >
                    by {lofi.author}
                  </span>
                </div>
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
