/** @jsx jsx */
import {jsx} from '@emotion/core';
import FinalImageModal from '../FinalImageModal/FinalImageModal';
import Section from '../Section/Section';
import Button from '../Button/Button';
import '@reach/dialog/styles.css';

const FinalImageContainer = ({
  finalImage,
  finalImageFilter,
  setIsDialogOpen,
  isDialogOpen,
}) => {
  return (
    <div>
      <FinalImageModal
        imageFilter={finalImageFilter}
        setIsDialogOpen={setIsDialogOpen}
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
            onClick={() => setIsDialogOpen(true)}
          >
            {"I'm Ready!"}
          </Button>
        </Section>
      )}
    </div>
  );
};

export default FinalImageContainer;
