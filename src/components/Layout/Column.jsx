import styled from '@emotion/styled/macro';
import {medium} from '../../styles/mediaqueries';
import {darker} from '../../styles/colors';

const Layout = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 0em;
  grid-row-gap: 1em;
  min-height: 100vh;
`;

const Column = styled.div`
  background-color: ${props => props.backgroundColor};
  padding: 0 0;
  grid-column: span ${props => props.spanSmall};
  ${medium} {
    grid-column: span ${props => props.spanMedium};
  }
`;

const Section = styled.div`
  margin-top: 1em;
  background-color: ${props => props.backgroundColor};
  padding: 1em;
`;

const ToggleVisible = styled.div`
  margin-top: 1em;
  display: ${props => (props.show ? 'block' : 'none')};
`;

export {Column, Layout, Section, ToggleVisible};
