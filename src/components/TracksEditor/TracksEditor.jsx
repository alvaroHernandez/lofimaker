/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useRef, useState} from 'react';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import TrackContainer from '../TrackContainer/TrackContainer';
import styled from '@emotion/styled/macro';
import {usePlayers} from '../../contexts/PlayersContext';
import GlobalPlayerControls from '../GlobalPlayerControls/GlobalPlayerControls';

const IndividualTrackEditor = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const tracksTypes = ['Sound', 'Effect', 'Drums'];

const TracksEditor = () => {
  const [tracks, setTracks] = useState([]);
  const nextTrackId = useRef(1);
  const {stopAll} = usePlayers();

  const addTrack = async type => {
    await stopAll();
    setTracks([
      ...tracks,
      <TrackContainer key={nextTrackId.current} type={type} />,
    ]);
    nextTrackId.current += 1;
  };

  return (
    <React.Fragment>
      <AutoFitGrid>
        {tracksTypes.map(type => (
          <Button
            key={type}
            variant={'secondary'}
            onClick={() => addTrack(type)}
          >
            Add {type} Track
          </Button>
        ))}
      </AutoFitGrid>
      <GlobalPlayerControls />
      {tracks.length > 0 ? (
        <IndividualTrackEditor>{tracks}</IndividualTrackEditor>
      ) : (
        <BoxWithCenteredContent css={{height: '100vh'}}>
          Start Adding a Track using buttons above
        </BoxWithCenteredContent>
      )}
    </React.Fragment>
  );
};

export default TracksEditor;
