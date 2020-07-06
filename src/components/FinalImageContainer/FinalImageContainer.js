/** @jsx jsx */
import {jsx} from '@emotion/core';
import FinalImageModal from '../FinalImageModal/FinalImageModal';
import Section from '../Section/Section';
import Button from '../Button/Button';
import '@reach/dialog/styles.css';
import {usePlayers} from '../../contexts/PlayersContext';

const FinalImageContainer = ({
  finalImage,
  finalImageFilter,
  setIsDialogOpen,
  isDialogOpen,
}) => {
  const {playAll, stopAll} = usePlayers();

  function previewHandler() {
    setIsDialogOpen(true);
    stopAll();
    playAll();
  }

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
      {finalImage && (
        <Section>
          <Button
            css={{
              width: '100%',
            }}
            variant={'secondary'}
            onClick={previewHandler}
          >
            {"I'm Ready!"}
          </Button>
        </Section>
      )}
    </div>
  );
};

export default FinalImageContainer;
