/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useRef, useState} from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';
import MusicTrack from '../MusicTrack/MusicTrack';
import BeatsCreator from '../BeatsCreator/BeatsCreator';
import {usePlayers} from '../../contexts/PlayersContext';
import {v4 as uuidv4} from 'uuid';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import styled from '@emotion/styled/macro';
import {dark, darker} from '../../styles/colors';
import {GoSettings} from 'react-icons/all';

const StyledTrackContainer = styled.div`
  //display: 'grid';
  //grid-template-rows: 1fr 1fr;
  //grid-template-columns: 1fr;
  padding: 1em;
  margin-top: 1em;
  &:nth-child(even) {
    background-color: ${dark};
  }
  &:nth-child(odd) {
    background-color: ${dark};
  }
`;
// eslint-disable-next-line react/prop-types
const TrackContainer = ({type}) => {
  const [currentSong, setCurrentSong] = useState();
  const [showTrackSettings, setShowTrackSettings] = useState(true);
  const trackId = useRef(uuidv4());
  const {updatePlayerStartingOffset} = usePlayers();

  function toggleShowTrackSettings() {
    setShowTrackSettings(!showTrackSettings);
  }

  function trackFactory(type) {
    switch (type) {
      case 'Sound':
      case 'Effect':
        return (
          <MusicTrack
            trackId={trackId.current}
            currentSong={currentSong}
            setCurrentSong={setCurrentSong}
            type={type}
          />
        );
      case 'Drums':
        return <BeatsCreator setCurrentSong={setCurrentSong} />;
      default:
        return null;
    }
  }

  const onStopDrag = (e, ui) => {
    const currentTime =
      (ui.lastX * lofiDurationMinutes * 60) / ui.node.parentNode.clientWidth;
    updatePlayerStartingOffset(trackId.current, currentTime);
  };

  return (
    <StyledTrackContainer>
      <div
        css={{
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridColumnGap: '1em',
          alignItems: 'center',
        }}
      >
        <div>
          <Button
            variant={'primary'}
            onClick={toggleShowTrackSettings}
            css={{padding: '10px 10px'}}
          >
            <GoSettings size={'1.2em'} />
          </Button>
        </div>
        <div
          css={{
            backgroundColor: '#8EA8C3',
            position: 'relative',
            height: '38px',
          }}
        >
          <Track
            handleDragStop={onStopDrag}
            songName={currentSong ? currentSong.title : ' This track is empty'}
            duration={currentSong ? currentSong.duration : 0}
          />
        </div>
      </div>
      <div css={{marginTop: '1em', display: showTrackSettings ? 'block' : 'none'}}>
        {trackFactory(type)}
      </div>
    </StyledTrackContainer>
  );
};

export default TrackContainer;
