/** @jsx jsx */
import {jsx} from '@emotion/core';
import FinalImageModal from '../FinalImageModal/FinalImageModal';
import '@reach/dialog/styles.css';
import {usePlayers} from '../../contexts/PlayersContext';
import PropTypes from 'prop-types';

const FinalImageContainer = ({
  setIsDialogOpen,
  isDialogOpen,
}) => {
  const {stopAll} = usePlayers();

  function closePreviewHandler(value) {
    stopAll();
    setIsDialogOpen(value);
  }

  return (
    <div>
      <FinalImageModal
        setIsDialogOpen={closePreviewHandler}
        isDialogOpen={isDialogOpen}
      />
    </div>
  );
};

FinalImageContainer.propTypes = {
  finalImage: PropTypes.string,
  finalImageFilter: PropTypes.string,
  isDialogOpen: PropTypes.bool,
  setIsDialogOpen: PropTypes.bool,
};

export default FinalImageContainer;
