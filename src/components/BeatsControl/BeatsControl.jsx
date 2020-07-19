import React from 'react';
import Button from '../Button/Button';
import {jsx} from '@emotion/core';

const BeatsControl = ({defaultValue, updateValue}) => {
  const [currentValue, setCurrentValue] = React.useState(defaultValue);
  function addOne() {
    const newValue = currentValue + 1;
    setCurrentValue(newValue);
    updateValue(newValue);
  }

  function subtractOne() {
    const newValue = currentValue - 1;
    setCurrentValue(newValue);
    updateValue(newValue);
  }
  return (
    <div
      css={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        css={{
          display: 'flex',
        }}
      >
        <Button onClick={subtractOne} variant={'small'}>
          -
        </Button>
        <input value={currentValue} css={{width: '2em'}}></input>
        <Button onClick={addOne}>+</Button>
      </div>
      <div css={{textAlign: 'center'}}>
        <span>repeat</span>
      </div>
    </div>
  );
};

export default BeatsControl;
