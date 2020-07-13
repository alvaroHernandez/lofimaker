/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useRef, useState} from 'react';
import {Layout, Column} from '../Layout/Column';

import ImageLoader from '../ImageLoader/ImageLoader';
import {dark, darker, ultraDark} from '../../styles/colors';
import '@reach/tabs/styles.css';
import Section from '../Section/Section';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import FinalImageContainer from '../FinalImageContainer/FinalImageContainer';
import TrackContainer from '../TrackContainer/TrackContainer';
import {usePlayers} from '../../contexts/PlayersContext';
import GlobalPlayerControls from '../GlobalPlayerControls/GlobalPlayerControls';
import styled from '@emotion/styled/macro';

const availableTracks = ['Sound', 'Effect', 'Drums', 'Melody', 'Bass'];

const TracksContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const HeaderSection = styled(Section)`
  margin-top: 0;
  background-color: ${dark};
`;

const LoFiMaker = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [finalImage, setFinalImage] = useState();
  const [finalImageFilter, setFinalImageFilter] = useState();
  const [tracks, setTracks] = useState([]);
  const nextTrackId = useRef(1);

  const {playAll, stopAll} = usePlayers();

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

  function previewHandler() {
    setIsDialogOpen(true);
    stopAll();
    playAll();
  }

  return (
    <Layout color={'white'} backgroundColor={dark}>
      <Column backgroundColor={darker} back spanSmall={0} spanMedium={3}>
        <ImageLoader
          setGlobalFilter={setFinalImageFilter}
          updateFinalImage={updateFinalImage}
        />
      </Column>
      <Column backgroundColor={ultraDark} spanSmall={12} spanMedium={9}>
        <HeaderSection>
          <GlobalPlayerControls preview={previewHandler} />
        </HeaderSection>
        <Section css={{backgroundColor: ultraDark}}>
          <AutoFitGrid>
            {availableTracks.map(type => (
              <Button
                key={type}
                variant={'secondary'}
                onClick={() => addTrack(type)}
              >
                Add {type}
              </Button>
            ))}
          </AutoFitGrid>
          {tracks.length > 0 ? (
            <TracksContainer>{tracks}</TracksContainer>
          ) : (
            <BoxWithCenteredContent
              css={{backgroundColor: ultraDark, height: '100vh'}}
            >
              Start Adding a Track using buttons above
            </BoxWithCenteredContent>
          )}

          {/*{tracks.map((track) => (<Section>{track}</Section>))}*/}
        </Section>

        {/*<Section css={{minHeight: '100vh'}}>*/}

        {/*</Section>*/}

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
