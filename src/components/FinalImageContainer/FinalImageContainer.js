/** @jsx jsx */
import {jsx} from '@emotion/core';
import FinalImageModal from '../FinalImageModal/FinalImageModal';
import '@reach/dialog/styles.css';
import {usePlayers} from '../../contexts/PlayersContext';
import PropTypes from 'prop-types';

const FinalImageContainer = () => {
  return (
    <div>
      <FinalImageModal />
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
