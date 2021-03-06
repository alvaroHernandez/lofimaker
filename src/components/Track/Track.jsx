/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled/macro';
import {alternative, dark, darker} from '../../styles/colors';
import Draggable from 'react-draggable';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import {Transport} from 'tone';

function calculatePercentage(durationMillis) {
  const inSecond = durationMillis / 1000;
  return (inSecond * 100) / (lofiDurationMinutes * 60);
}

//TODO: figure out why class name is being recalculated every prop change, maybe is bad for performance
const CurrentPositionMarkers = styled.div`
  width: 1px;
  background-color: white;
  height: 38px;
  left: ${props => props.position}%;
  position: absolute;
  z-index: 1;
`;

const TrackMusicContainer = styled.div`
  position: absolute;
  height: 38px;
  display: flex;
  align-items: center;
`;

const EmptyTrackMusicContainer = styled(TrackMusicContainer)`
  background-color: #3F2235;
  width: 100%;
  color: #f1f1f4;
`;

const NonEmptyTrackMusicContainer = styled(TrackMusicContainer)`
  color: #f1f1f4;
  background-color: #C62462;
  width: ${props => props.filledPercentage}%;
`;

const ResponsiveText = styled.span`
  padding-left: 1em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Track = ({songName, duration, handleDragStop}) => {
  const [currentPosition, setCurrentPosition] = useState();

  //TODO: this should be done only once for all tracks
  useEffect(() => {
    Transport.scheduleRepeat(time => {
      setCurrentPosition(
        (Transport.seconds * 100) / (lofiDurationMinutes * 60),
      );
    }, 0.5);
  }, []);

  const durationPercentage = calculatePercentage(duration);
  if (duration === 0) {
    return (
      <EmptyTrackMusicContainer>
        <ResponsiveText>
          empty track, search and choose a sound using input below
        </ResponsiveText>
      </EmptyTrackMusicContainer>
    );
  } else {
    return (
      <React.Fragment>
        <CurrentPositionMarkers position={currentPosition} />
        <Draggable axis={'x'} bounds={'parent'} onStop={handleDragStop}>
          <NonEmptyTrackMusicContainer
            filledPercentage={durationPercentage}
            duration={duration}
          >
            <ResponsiveText>{songName}</ResponsiveText>
          </NonEmptyTrackMusicContainer>
        </Draggable>
      </React.Fragment>
    );
  }
};

export default Track;
