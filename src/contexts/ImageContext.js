/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useCallback} from 'react';

const ImageContext = React.createContext();
ImageContext.displayName = 'ImageContext';

function ImageProvider(props) {
  const imageUrl = React.useRef(null);
  const imageFilter = React.useRef(null);

  const setImage = useCallback(url => {
    imageUrl.current = url;
  }, []);

  const getImage = useCallback(() => {
    return imageUrl.current;
  }, []);

  const setFilter = useCallback(filter => {
    imageFilter.current = filter;
  }, []);

  const getFilter = useCallback(() => {
    return imageFilter.current;
  }, []);

  const value = {
    setImage,
    getImage,
    setFilter,
    getFilter,
  };
  return <ImageContext.Provider value={value} {...props} />;
}

function useImage() {
  const context = React.useContext(ImageContext);
  if (context === undefined) {
    throw new Error(`useImage must be used within a ImageProvider`);
  }
  return context;
}

export {ImageProvider, useImage};
