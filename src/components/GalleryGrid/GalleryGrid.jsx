/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import ImageGrid from '../ImageGrid/ImageGrid';
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
