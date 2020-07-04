import React from 'react';
import styled from '@emotion/styled/macro';
import {dark, darker} from '../../styles/colors';

function calculatePercentage(duration) {
  const inSecond = duration / 1000;
  return (inSecond * 100) / (10 * 60);
}

export const TrackMusicContainer = styled.div`
  border: 0.1px solid #f1f1f4;
  height: 38px;
  background: linear-gradient(
    90deg,
    ${dark} ${props => calculatePercentage(props.duration)}%,
    ${darker} 0%
  );
  display: flex;
  align-items: center;
`;

const Track = ({songName, duration}) => {
  function clickHandler() {
    console.log('asda');
  }
  return (
    <TrackMusicContainer onClick={clickHandler} duration={duration}>
      <p>{songName}</p>
    </TrackMusicContainer>
  );
};

export default Track;
