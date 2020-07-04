/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState} from 'react';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import Button from '../Button/Button';

const classes = ['normal', 'toaster', 'reyes', 'nashville'];

const ImagePreview = ({
  data,
  isError,
  isSuccess,
  updateFinalImage,
  setGlobalFilter,
}) => {
  const [currentClass, setCurrentClass] = useState('');

  function applyFilter(filter) {
    setCurrentClass(filter);
    setGlobalFilter(filter);
  }

  if (isError) {
    return (
      <BoxWithCenteredContent>
        <span>Error Loading Image, try with another URL</span>
      </BoxWithCenteredContent>
    );
  } else if (isSuccess) {
    updateFinalImage(data);
    return (
      <div>
        <BoxWithCenteredContent>
          <figure css={{width: '50%'}} className={currentClass}>
            <img width={'100%'} src={data} alt={'custom user loaded'} />
          </figure>
        </BoxWithCenteredContent>
        <BoxWithCenteredContent>
          <span>You can pick an image filter if you want</span>
        </BoxWithCenteredContent>
        <AutoFitGrid>
          {classes.map(filter => (
            <Button
              key={filter}
              variant={'secondary'}
              onClick={() => applyFilter(filter)}
            >
              {filter}
            </Button>
          ))}
        </AutoFitGrid>
      </div>
    );
  } else {
    return (
      <BoxWithCenteredContent>
        <span>First, load an Image choosing an option below</span>;
      </BoxWithCenteredContent>
    );
  }
};

export default ImagePreview;
