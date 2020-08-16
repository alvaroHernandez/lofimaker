import styled from '@emotion/styled/macro';
import {medium} from '../../styles/mediaqueries';
import {dark} from '../../styles/colors';
import {simple} from '../../styles/spacing';

const Layout = styled.div`
  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 0em;
  grid-row-gap: 0em;
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
  color: #fff;
  margin-top: 0.2em;
  background-color: ${props => props.backgroundColor};
  padding: 0.2em 1em;
`;

const HeaderSection = styled(Section)`
  padding: 0.7em;
  margin-top: 0;
  background-color: ${dark};
`;

const ToggleVisible = styled.div`
  margin-top: 1em;
  display: ${props => (props.show ? 'block' : 'none')};
`;

const ShowOnMedium = styled.div`
  display: block;
  ${medium} {
    display: none;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-gap: ${simple};
`;

const JustifiedItems = styled.div`
  display: flex;
  justify-content: center;
`;

export {
  Column,
  Layout,
  Section,
  ToggleVisible,
  ShowOnMedium,
  HeaderSection,
  Grid,
  JustifiedItems,
};
