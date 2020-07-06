import React, {useEffect, useState} from 'react';
import styled from '@emotion/styled/macro';
import {dark} from '../../styles/colors';
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
  width: 100%;
`;

const NonEmptyTrackMusicContainer = styled(TrackMusicContainer)`
  background-color: ${dark};
  width: ${props => props.filledPercentage}%;
`;

const Track = ({songName, duration, handleDragStop}) => {
  const [currentPosition, setCurrentPosition] = useState();

  //TODO: this should be done only once for all tracks
  useEffect(() => {
    Transport.scheduleRepeat(time => {
      console.log('XXXX');
      console.log(Transport.seconds);
      console.log((Transport.seconds * 100) / (lofiDurationMinutes * 60));
      console.log('XXXX');

      setCurrentPosition(
        (Transport.seconds * 100) / (lofiDurationMinutes * 60),
      );
    }, 0.5);
  }, []);

  const durationPercentage = calculatePercentage(duration);
  if (duration === 0) {
    return (
      <EmptyTrackMusicContainer>
        <p>This track is empty</p>
      </EmptyTrackMusicContainer>
    );
  } else {
    return (
      <>
        <CurrentPositionMarkers position={currentPosition} />
        <Draggable axis={'x'} bounds={'parent'} onStop={handleDragStop}>
          <NonEmptyTrackMusicContainer
            filledPercentage={durationPercentage}
            duration={duration}
          >
            <p>{songName}</p>
          </NonEmptyTrackMusicContainer>
        </Draggable>
      </>
    );
  }
};

export default Track;
