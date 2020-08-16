/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import PropTypes from 'prop-types';
import {TabList, TabPanel, TabPanels, Tabs} from '@reach/tabs';
import {darker} from '../../styles/colors';
import CustomTab from '../CustomTab/CustomTab';
import GifSearcher from '../GifSearcher/GifSearcher';
import SimpleForm from '../SimpleForm/SimpleForm';
import {GoLink} from 'react-icons/go';

const ImagePicker = ({loadImage, isLoading}) => {
  return (
    <Tabs css={{marginTop: '1em'}}>
      <TabList css={{backgroundColor: darker}}>
        <CustomTab index={0} css={{backgroundColor: darker}}>
          Search a Gif
        </CustomTab>
        <CustomTab index={1} css={{backgroundColor: darker}}>
          Load Image from URL
        </CustomTab>
      </TabList>
      <TabPanels css={{padding: '1em 1em 0'}}>
        <TabPanel>
          <GifSearcher clickHandler={loadImage} />
        </TabPanel>
        <TabPanel>
          <SimpleForm
            placeholder={'paste an image url here...'}
            onSubmit={loadImage}
            buttonText={<GoLink />}
            inputName={'url'}
            isLoading={isLoading}
          />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

ImagePicker.propTypes = {
  loadImage: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default ImagePicker;
