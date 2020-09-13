import styled from '@emotion/styled/macro';

const separation = '0.5em';

export const TrackInstrumentsContainer = styled.div`
  display: grid;
  grid-gap: ${separation};
  grid-area: trackInstrument;
`;

export const TrackInstrument = styled.div`
  align-items: center;
  display: flex;
`;

export const TrackBeats = styled.div`
  display: grid;
  grid-gap: ${separation};
  grid-area: trackBeats;
  grid-template-columns: repeat(${props => props.totalBeats}, 1fr);
  overflow: auto;
`;
