/** @jsx jsx */
import {jsx} from '@emotion/core';
import {useState} from 'react';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import Button from '../Button/Button';
import {useImage} from '../../contexts/ImageContext';
import PropTypes from 'prop-types';

const classes = ['normal', 'toaster', 'reyes', 'nashville'];

const ImagePreview = ({data}) => {
  const [currentClass, setCurrentClass] = useState('');
  const {setFilter} = useImage();

  function applyFilter(filter) {
    setCurrentClass(filter);
    setFilter(filter);
  }

  return (
    <div>
      <BoxWithCenteredContent css={{margin: '0'}}>
        <figure className={currentClass}>
          <img width={'100%'} src={data} alt={'custom user loaded'} />
        </figure>
      </BoxWithCenteredContent>
      <BoxWithCenteredContent>
        <span>pick a filter: </span>
      </BoxWithCenteredContent>
      <BoxWithCenteredContent>
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
      </BoxWithCenteredContent>
    </div>
  );
};

ImagePreview.propTypes = {
  data: PropTypes.string.isRequired,
};

export default ImagePreview;
