/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useRef} from 'react';
import { Distortion, EQ3, Reverb } from 'tone';
import MusicEffect from '../components/MusicEffect/MusicEffect';
import {Knob, Arc, Value} from 'rc-knob';
import {dark, lighter} from '../styles/colors';
import Toggle from 'react-toggle';
import './Knob.css';
import './Toggle.css';

const MusicEffectsContainer = ({player}) => {
  const reverberation = useRef(new Reverb().toDestination());
  const distortion = useRef(new Distortion().toDestination());
  const equalizer = useRef(new EQ3().toDestination());

  function sliderChangeHandlerForProperty(effect, property, value) {
    effect[property] = value;
  }

  function sliderChangeHandlerForParameter(effect, property, value) {
    effect[property].value = value;
  }

  function toggleEffect(effect, e) {
    if (player === undefined) {
      return;
    }
    if (e.target.checked) {
      player.connect(effect);
    } else {
      player.disconnect(effect);
    }
  }

  return (
    <div
      css={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        marginTop: '1em',
      }}
    >
      <MusicEffect name={'Volume'}>
        <Knob
          size={70}
          angleOffset={220}
          angleRange={280}
          onChange={value =>
            sliderChangeHandlerForParameter(player, 'volume', value)
          }
          min={-35}
          max={15}
          steps={50}
        >
          <Arc arcWidth={11} color={lighter} background={dark} />
          <Value marginBottom={20} className="knob-value" />
        </Knob>
        <label>Volume</label>
      </MusicEffect>
      <MusicEffect name={'Speed'}>
        <Knob
          size={70}
          angleOffset={220}
          angleRange={280}
          onChange={value =>
            sliderChangeHandlerForProperty(player, 'playbackRate', value)
          }
          min={0.1}
          max={1}
          steps={10}
        >
          <Arc arcWidth={11} color={lighter} background={dark} />
          <Value marginBottom={20} className="knob-value" />
        </Knob>
        <label>Speed</label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          size={70}
          angleOffset={220}
          angleRange={280}
          min={0.001}
          max={10}
          steps={100}
          onChange={value =>
            sliderChangeHandlerForProperty(
              reverberation.current,
              'reverb',
              value,
            )
          }
        >
          <Arc arcWidth={11} color={lighter} background={dark} />
          <Value marginBottom={20} className="knob-value" />
        </Knob>
        <label>Reverb</label>
        <label
          css={{
            marginTop: '0.5em',
          }}
        >
          <Toggle
            icons={false}
            onChange={state => toggleEffect(reverberation.current, state)}
          />
        </label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          size={70}
          angleOffset={220}
          angleRange={280}
          min={0.001}
          max={3}
          steps={100}
          onChange={value =>
            sliderChangeHandlerForProperty(
              distortion.current,
              'distortion',
              value,
            )
          }
        >
          <Arc arcWidth={11} color={lighter} background={dark} />
          <Value marginBottom={20} className="knob-value" />
        </Knob>
        <label>Distortion</label>
        <label
          css={{
            marginTop: '0.5em',
          }}
        >
          <Toggle
            icons={false}
            onChange={state => toggleEffect(distortion.current, state)}
          />
        </label>
      </MusicEffect>
      <div
        css={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        <div css={{display: 'inline-flex'}}>
          <MusicEffect>
            <Knob
              size={70}
              angleOffset={220}
              angleRange={280}
              onChange={value =>
                sliderChangeHandlerForParameter(equalizer.current, 'low', value)
              }
              min={-18}
              max={18}
              steps={36}
            >
              <Arc arcWidth={11} color={lighter} background={dark} />
              <Value marginBottom={20} className="knob-value" />
            </Knob>
            <label>Low</label>
          </MusicEffect>
          <MusicEffect>
            <Knob
              size={70}
              angleOffset={220}
              angleRange={280}
              onChange={value =>
                sliderChangeHandlerForParameter(equalizer.current, 'mid', value)
              }
              min={-18}
              max={18}
              step={36}
            >
              <Arc arcWidth={11} color={lighter} background={dark} />
              <Value marginBottom={20} className="knob-value" />
            </Knob>
            <label>Mid</label>
          </MusicEffect>
          <MusicEffect>
            <Knob
              size={70}
              angleOffset={220}
              angleRange={280}
              onChange={value =>
                sliderChangeHandlerForParameter(
                  equalizer.current,
                  'high',
                  value,
                )
              }
              min={-18}
              max={18}
              step={36}
            >
              <Arc arcWidth={11} color={lighter} background={dark} />
              <Value marginBottom={20} className="knob-value" />
            </Knob>
            <label>High</label>
          </MusicEffect>
        </div>
        <label
          css={{
            marginTop: '0.5em',
          }}
        >
          <Toggle
            icons={false}
            onChange={state => toggleEffect(equalizer.current, state)}
          />
        </label>
      </div>
    </div>
  );
};

export default MusicEffectsContainer;