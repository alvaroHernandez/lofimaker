/** @jsx jsx */
import {jsx} from '@emotion/core';
import FinalImageModal from '../FinalImageModal/FinalImageModal';
import Section from '../Section/Section';
import Button from '../Button/Button';
import '@reach/dialog/styles.css';
import {usePlayers} from '../../contexts/PlayersContext';

const FinalImageContainer = ({finalImage, finalImageFilter, setIsDialogOpen, isDialogOpen}) => {
  const {stopAll} = usePlayers();


  function closePreviewHandler(value) {
    stopAll();
    setIsDialogOpen(value);
  }

  return (
    <div>
      <FinalImageModal
        imageFilter={finalImageFilter}
        setIsDialogOpen={closePreviewHandler}
        isDialogOpen={isDialogOpen}
        image={finalImage}
      />
    </div>
  );
};

export default FinalImageContainer;
