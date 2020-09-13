/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Section} from '../Layout/Layout';
import {ultraDark} from '../../styles/colors';
import PropTypes from 'prop-types';

export const StickySection = ({children}) => {
  return (
    <Section
      css={{
        zIndex: 2,
        position: 'sticky',
        top: 0,
      }}
    >
      {children}
    </Section>
  );
};

StickySection.propTypes = {
  children: PropTypes.element.isRequired,
};
