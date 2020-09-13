/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import ImageGrid from '../ImageGrid/ImageGrid';
import CoverImage from '../CoverImage/CoverImage';

const GifGrid = ({gifs, clickHandler}) => {
  return (
    <ImageGrid min={'120px'}>
      {gifs.map(gif => (
        <li
          key={gif.id}
          onClick={() => clickHandler({url: gif.images.downsized_large.url})}
        >
          <CoverImage src={gif.images.preview_gif.url} />
        </li>
      ))}
    </ImageGrid>
  );
};

export default GifGrid;
