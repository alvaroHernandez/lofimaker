/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {
  Distortion,
  Oscillator,
  Player,
  Vibrato,
  AutoFilter,
  Reverb,
  AmplitudeEnvelope,
} from 'tone';
import Button from '../components/Button/Button';
import Slider from '@reach/slider';
import '@reach/slider/styles.css';

const Tone = ({name, player, effect, property, from, to, step}) => {
  function disableEffect() {
    player.disconnect(effect);
  }

  function enableEffect() {
    player.connect(effect);
  }

  function sliderChangeHandler(value) {
    console.log('-------');
    console.log(value);
    console.log('-------');
    console.log(effect);
    console.log(property);
    console.log(effect[property]);
    // debugger
    effect[property].value = value;
  }

  return (
    <div
      css={{
        display: 'flex',
        alignItems: 'center',
        '*': {
          marginRight: '1em',
        },
      }}
    >
      <p>{name}</p>
      <Slider onChange={sliderChangeHandler} min={from} max={to} step={step} />
      <Button variant={'secondary'} onClick={enableEffect}>
        Enable
      </Button>
      <Button variant={'secondary'} onClick={disableEffect}>
        Disable
      </Button>
    </div>
  );
};

export default Tone;
