/** @jsx jsx */
import {jsx} from '@emotion/core';
import FinalImageOnFullScreen from 'components/FinalImageOnFullScreen/FinalImageOnFullScreen';
import '@reach/dialog/styles.css';
import PropTypes from 'prop-types';

const FinalImageContainer = () => {
  return (
    <div>
      <FinalImageOnFullScreen />
    </div>
  );
};

FinalImageContainer.propTypes = {
  finalImage: PropTypes.string,
  finalImageFilter: PropTypes.string,
  isDialogOpen: PropTypes.bool,
  setIsDialogOpen: PropTypes.func,
};

export default FinalImageContainer;
