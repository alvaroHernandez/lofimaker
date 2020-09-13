/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useEffect, useCallback, useState} from 'react';
import '@reach/tabs/styles.css';
import {useAsync} from '../../hooks/useAsync';
import ImagePreview from '../ImagePreview/ImagePreview';
import defaultImage from '../../assets/images/logo192.png';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import {ShowOnMedium} from '../Layout/Layout';
import {useImage} from '../../contexts/ImageContext';
import Spinner from '../Spinner/Spinner';
import ImagePicker from '../ImagePicker/ImagePicker';

const scrollToTop = () => window.scrollTo(0, 0);

const ImageLoader = () => {
  const {data, run, isLoading, isError, isSuccess} = useAsync();
  const {setImage} = useImage();
  const [showImagePicker, setShowImagePicker] = useState(true);

  function hideImagePicker() {
    setShowImagePicker(!showImagePicker);
  }

  const loadImageFromUrl = useCallback(
    url => {
      return new Promise(function (resolve, reject) {
        const image = new Image();
        image.addEventListener('load', () => resolve(url));
        image.addEventListener('error', () => reject('Error loading image'));
        image.src = url;
        setImage(url);
        scrollToTop();
      });
    },
    [setImage],
  );

  const loadImage = useCallback(
    img => {
      run(loadImageFromUrl(img.url));
    },
    [loadImageFromUrl, run],
  );

  useEffect(() => {
    loadImage({url: defaultImage});
  }, [loadImage]);

  return (
    <div>
      {isLoading ? (
        <BoxWithCenteredContent css={{padding: '25% 0'}}>
          <Spinner />
        </BoxWithCenteredContent>
      ) : isError ? (
        <BoxWithCenteredContent css={{padding: '25% 0'}}>
          <span>Error Loading Image, try with another URL</span>
        </BoxWithCenteredContent>
      ) : isSuccess ? (
        <ImagePreview data={data} />
      ) : null}
      <ShowOnMedium>
        <BoxWithCenteredContent>
          <Button css={{width: '100%'}} onClick={hideImagePicker}>
            {showImagePicker ? 'Hide Image Picker' : 'Show Image Picker'}
          </Button>
        </BoxWithCenteredContent>
      </ShowOnMedium>
      {showImagePicker && (
        <ImagePicker isLoading={isLoading} loadImage={loadImage} />
      )}
    </div>
  );
};

export default ImageLoader;
