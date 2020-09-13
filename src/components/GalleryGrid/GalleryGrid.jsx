/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import ImageGridItem from '../ImageGridItem/ImageGridItem';
import CoverImage from '../CoverImage/CoverImage';
import {
  ButtonContainer,
  ImageGridElementButton,
} from '../ImageGridElementButton/ImageGridElementButton';
import ImageGridElementInfo from '../ImageGridElementInfo/ImageGridElementInfo';
import {light} from '../../styles/colors';
import ImageGrid from '../ImageGrid/ImageGrid';
import {GoPlay} from 'react-icons/go';

const GalleryGrid = ({elements, elementClickHandler}) => {
  return (
    <ImageGrid>
      {elements.map(element => (
        <ImageGridItem key={element.id}>
          <CoverImage
            key={element.id}
            alt={'lofi cover'}
            css={{
              '&:hover': {opacity: '0.3'},
            }}
            src={element.image.url}
          />
          <ButtonContainer>
            <ImageGridElementButton onClick={() => elementClickHandler(element)}>
              <GoPlay />
            </ImageGridElementButton>
          </ButtonContainer>
          <ImageGridElementInfo>
            <span
              css={{
                display: 'block',
              }}
            >
              {element.name}
            </span>
            <span
              css={{
                fontSize: '13px',
                display: 'block',
                color: light,
              }}
            >
              by {element.author}
            </span>
          </ImageGridElementInfo>
        </ImageGridItem>
      ))}
    </ImageGrid>
  );
};

GalleryGrid.propTypes = {
  elements: PropTypes.array.isRequired,
  elementClickHandler: PropTypes.func.isRequired,
};

export default GalleryGrid;
