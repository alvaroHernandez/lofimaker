/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useEffect, useCallback} from 'react';
import SimpleForm from '../SimpleForm/SimpleForm';
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useTabsContext,
} from '@reach/tabs';
import '@reach/tabs/styles.css';
import GifSearcher from '../GifSearcher/GifSearcher';
import {useAsync} from '../../hooks/useAsync';
import ImagePreview from '../ImagePreview/ImagePreview';
import * as PropTypes from 'prop-types';
import defaultImage from '../../assets/images/logo192.png';
import {dark, darker} from '../../styles/colors';

function CustomTab({index, ...props}) {
  const {selectedIndex} = useTabsContext();
  return (
    <Tab
      style={{
        backgroundColor: `${selectedIndex === index ? dark : darker}`,
      }}
      {...props}
    />
  );
}

const ImageLoader = ({updateFinalImage, setGlobalFilter}) => {
  const {data, run, isLoading, isError, isSuccess} = useAsync();

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
        <TabList css={{backgroundColor: darker, borderBottom: '1px solid'}}>
          <CustomTab index={0} css={{backgroundColor: darker}}>
            Search a Gif
          </CustomTab>
          <CustomTab index={1} css={{backgroundColor: darker}}>
            Load Image from URL
          </CustomTab>
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
