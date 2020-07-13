/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useEffect, useCallback, useState} from 'react';
import SimpleForm from '../SimpleForm/SimpleForm';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs';
import '@reach/tabs/styles.css';
import GifSearcher from '../GifSearcher/GifSearcher';
import {useAsync} from '../../hooks/useAsync';
import ImagePreview from '../ImagePreview/ImagePreview';
import * as PropTypes from 'prop-types';
import defaultImage from '../../assets/images/logo192.png';

const ImageLoader = ({updateFinalImage, setGlobalFilter}) => {
  const {data, run, isLoading, isError, isSuccess} = useAsync();
  // const [imageUrl, setImageUrl] = useState();

  function loadImageFromUrl(url) {
    return new Promise(function (resolve, reject) {
      const image = new Image();
      image.addEventListener('load', () => resolve(url));
      image.addEventListener('error', () => reject('Error loading image'));
      image.src = url;
    });
  }

  const loadImage = useCallback(
    img => {
      run(loadImageFromUrl(img.url));
    },
    [run],
  );

  useEffect(() => {
    loadImage({url: defaultImage});
  }, [loadImage]);

  return (
    <div>
      <div>
        <ImagePreview
          isLoading={isLoading}
          data={data}
          isError={isError}
          isSuccess={isSuccess}
          setGlobalFilter={setGlobalFilter}
          updateFinalImage={updateFinalImage}
        />
      </div>
      <Tabs>
        <TabList>
          <Tab>Search a Gif</Tab>
          <Tab>Load Image from URL</Tab>
        </TabList>
        <TabPanels css={{padding: '1em'}}>
          <TabPanel>
            <GifSearcher clickHandler={loadImage} />
          </TabPanel>
          <TabPanel>
            <SimpleForm
              onSubmit={loadImage}
              buttonText={'Load Image'}
              inputName={'url'}
              isLoading={isLoading}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

ImageLoader.propTypes = {
  updateFinalImage: PropTypes.func.isRequired,
  setGlobalFilter: PropTypes.func.isRequired,
};

export default ImageLoader;
