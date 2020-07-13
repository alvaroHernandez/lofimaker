/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState} from 'react';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import AutoFitGrid from '../AutoFitGrid/AutoFitGrid';
import Button from '../Button/Button';
import Spinner from '../Spinner/Spinner';

const classes = ['normal', 'toaster', 'reyes', 'nashville'];

const ImagePreview = ({
  data,
  isError,
  isLoading,
  isSuccess,
  updateFinalImage,
  setGlobalFilter,
}) => {
  const [currentClass, setCurrentClass] = useState('');

  function applyFilter(filter) {
    setCurrentClass(filter);
    setGlobalFilter(filter);
  }
  if (isLoading) {
    return (
      <BoxWithCenteredContent css={{margin: '0', height: '300px'}}>
        <Spinner />
      </BoxWithCenteredContent>
    );
  }

  if (isError) {
    return (
      <BoxWithCenteredContent css={{margin: '0', height: '300px'}}>
        <span>Error Loading Image, try with another URL</span>
      </BoxWithCenteredContent>
    );
  } else if (isSuccess) {
    updateFinalImage(data);
    return (
      <div css={{minHeight: '300px'}}>
        <BoxWithCenteredContent css={{margin: '0'}}>
          <figure className={currentClass}>
            <img
              width={'100%'}
              src={data}
              alt={'custom user loaded'}
            />
          </figure>
        </BoxWithCenteredContent>
        <div>
          <div css={{textAlign: 'center', marginBottom: '0.5em'}}>
            <span>Pick a filter</span>
          </div>
          <div css={{display: 'flex', justifyContent: 'center'}}>
            {classes.map(filter => (
              <Button
                css={{marginRight: '0.5em'}}
                key={filter}
                variant={'secondary'}
                onClick={() => applyFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default ImagePreview;
