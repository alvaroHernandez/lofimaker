/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useRef, useState} from 'react';
import {Layout, Column} from '../Layout/Column';

import ImageLoader from '../ImageLoader/ImageLoader';
import {dark, light} from '../../styles/colors';
import '@reach/tabs/styles.css';
import Section from '../Section/Section';
import Header from '../Header/Header';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import TrackContainer from '../TrackContainer/TrackContainer';

const availableTracks = ['Sound', 'Effect', 'Drums', 'Melody', 'Bass'];

const LoFiMaker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [finalImage, setFinalImage] = useState();
  const [finalImageFilter, setFinalImageFilter] = useState();
  const [tracks, setTracks] = useState([]);
  const nextTrackId = useRef(1);

  const updateFinalImage = imageSrc => {
    setFinalImage(imageSrc);
  };

  const addTrack = type => {
    setTracks([
      ...tracks,
      <TrackContainer key={nextTrackId.current} type={type} />,
    ]);
    nextTrackId.current += 1;
  };

  return (
    <Layout color={'white'} backgroundColor={light}>
      <Column backgroundColor={dark} spanSmall={10} spanMedium={12}>
        <Header />
        <Section>
          <ImageLoader
            setGlobalFilter={setFinalImageFilter}
            updateFinalImage={updateFinalImage}
          />
        </Section>
        <Section>
          <BoxWithCenteredContent>
            Now add as many tracks as you want!
          </BoxWithCenteredContent>
          <AutoFitGrid>
            {availableTracks.map(type => (
              <Button
                key={type}
                variant={'secondary'}
                onClick={() => addTrack(type)}
              >
                {type}
              </Button>
            ))}
          </AutoFitGrid>
          {tracks}
        </Section>
        <FinalImageContainer
          finalImage={finalImage}
          finalImageFilter={finalImageFilter}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Column>
    </Layout>
  );
};

export default LoFiMaker;
