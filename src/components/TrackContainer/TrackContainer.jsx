/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useCallback, useMemo, useRef, useState} from 'react';
import Track from '../Track/Track';
import Button from '../Button/Button';
import MusicTrack from '../MusicTrack/MusicTrack';
import BeatsCreator from '../BeatsCreator/BeatsCreator';
import {usePlayers} from '../../contexts/PlayersContext';
import {v4 as uuidv4} from 'uuid';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import styled from '@emotion/styled/macro';
import {dark} from '../../styles/colors';
import {GoSettings} from 'react-icons/go';
import {BsPlayFill} from 'react-icons/bs';
import {BsFillStopFill} from 'react-icons/bs';
import {ToggleVisible} from '../Layout/Column';
import ToneBeatsCreator from "../BeatsCreator/ToneBeatsCreator";

const StyledTrackContainer = styled.div`
  padding: 1em;
  margin-top: 1em;
  &:nth-child(even) {
    background-color: ${dark};
  }
  &:nth-child(odd) {
    background-color: ${dark};
  }
`;
const TrackControl = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-column-gap: 0.2em;
  align-items: center;
`;

const TrackControlButton = styled(Button)`
  padding: 9px 9px;
  margin-right: 0.2em;
`;

const TrackContainer = ({type}) => {
  const [currentSong, setCurrentSong] = useState();
  const [showTrackSettings, setShowTrackSettings] = useState(true);
  const trackId = useRef(uuidv4());

  const {getPlayer, updatePlayerStartingOffset} = usePlayers();

  function play() {
    const player = getPlayer(trackId.current);
    if (player !== undefined) {
      player.unsync();
      player.start();
    }
  }

  function stop() {
    const player = getPlayer(trackId.current);
    if (player !== undefined) {
      player.unsync();
      player.stop();
    }
  }

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
        return <ToneBeatsCreator setCurrentSong={setCurrentSong} />;
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
      <TrackControl>
        <div>
          <TrackControlButton onClick={toggleShowTrackSettings}>
            <GoSettings size={'1.2em'} />
          </TrackControlButton>
          <TrackControlButton onClick={play}>
            <BsPlayFill size={'1.2em'} />
          </TrackControlButton>
          <TrackControlButton onClick={stop}>
            <BsFillStopFill size={'1.2em'} />
          </TrackControlButton>
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
      </TrackControl>
      <ToggleVisible show={showTrackSettings}>
        {trackFactory(type)}
      </ToggleVisible>
    </StyledTrackContainer>
  );
};

export default TrackContainer;
