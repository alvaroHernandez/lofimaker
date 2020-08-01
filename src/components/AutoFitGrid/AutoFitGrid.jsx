import styled from '@emotion/styled/macro';

const AutoFitGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(${props => (props.min ? props.min : '250px')}, 1fr)
  );
  grid-gap: 1em;
`;

export default AutoFitGrid;
