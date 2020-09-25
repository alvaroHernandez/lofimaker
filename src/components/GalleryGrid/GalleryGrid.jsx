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
import {alternative, light} from '../../styles/colors';
import ImageGrid from '../ImageGrid/ImageGrid';
import {GoPlay} from 'react-icons/go';
import Button, {IconButton} from 'components/Button/Button';
import {Grid} from 'components/Layout/Layout';
import GalleryGridElement from "components/GalleryGridElement/GalleryGridElement";

const GalleryGrid = ({elements, elementClickHandler}) => {

  return (
    <ImageGrid>
      {elements.map(element => (
        <GalleryGridElement lofi={element} elementClickHandler={elementClickHandler}/>
      ))}
    </ImageGrid>
  );
};

GalleryGrid.propTypes = {
  elements: PropTypes.array.isRequired,
  elementClickHandler: PropTypes.func.isRequired,
};

export default GalleryGrid;
