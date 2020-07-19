/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {TrackBeats, TrackInstrument, TrackInstrumentsContainer} from './styles';
import styled from '@emotion/styled/macro';
import Beat from '../Beat/Beat';

const separation = '0.5em';

const StyledBeatsCreatorGrid = styled.div`
  display: grid;
  grid-gap: ${separation};
  grid-template-columns: 1fr 10fr;
  grid-template-areas: 'trackInstrument trackBeats';
`;

const BeatsCreatorGrid = ({
  tracks,
  totalBeats,
  toggleBeat,
  highlightedColumn,
}) => {
  function renderBeats(trackName, totalMeasures) {
    const beatsSquares = [];
    for (let i = 0; i < totalMeasures; i++) {
      beatsSquares.push(
        <Beat
          isHighlighted={i === highlightedColumn}
          addMoreMargin={(i + 1) % 4 === 0}
          key={`trackName-${i}`}
          trackName={trackName}
          beatIndex={i}
          clickHandler={toggleBeat}
        />,
      );
    }
    return beatsSquares;
  }
  return (
    <StyledBeatsCreatorGrid>
      <TrackInstrumentsContainer>
        {Object.keys(tracks).map(track => (
          <TrackInstrument id={{track}}>{track}</TrackInstrument>
        ))}
      </TrackInstrumentsContainer>
      <TrackBeats totalBeats={totalBeats}>
        {Object.keys(tracks).map(track => renderBeats(track, totalBeats))}
      </TrackBeats>
    </StyledBeatsCreatorGrid>
  );
};

export default BeatsCreatorGrid;
