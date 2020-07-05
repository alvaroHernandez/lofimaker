import React from 'react';
import styled from '@emotion/styled/macro';
import {dark, darker} from '../../styles/colors';
import Draggable from 'react-draggable';

function calculatePercentage(durationMillis) {
  const inSecond = durationMillis / 1000;
  return (inSecond * 100) / (10 * 60);
}

export const TrackMusicContainer = styled.div`
  position: absolute;
  height: 38px;
  display: flex;
  align-items: center;
`;

export const EmptyTrackMusicContainer = styled(TrackMusicContainer)`
  width: 100%;
`;

export const NonEmptyTrackMusicContainer = styled(TrackMusicContainer)`
  background-color: ${dark};
  width: ${props => props.filledPercentage}%;
`;

const Track = ({songName, duration, handleDrag}) => {
  const durationPercentage = calculatePercentage(duration);
  if (duration === 0) {
    return <EmptyTrackMusicContainer>
        <p>This track is empty</p>
      </EmptyTrackMusicContainer>;
  } else {
    return (
      <Draggable axis={'x'} bounds={'parent'} onDrag={handleDrag}>
        <NonEmptyTrackMusicContainer
          filledPercentage={durationPercentage}
          duration={duration}
        >
          <p>{songName}</p>
        </NonEmptyTrackMusicContainer>
      </Draggable>
    );
  }
};

export default Track;
