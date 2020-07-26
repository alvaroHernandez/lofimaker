/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useRef} from 'react';
import {Distortion, EQ3, Reverb} from 'tone';
import MusicEffect from '../components/MusicEffect/MusicEffect';
import {Knob, Arc, Value} from './rc-knob';
import {darker, lighter} from '../styles/colors';
import Toggle from 'react-toggle';
import './Knob.css';
import './Toggle.css';

const MusicEffectsContainer = ({player, updateDuration}) => {
  const reverberation = useRef(new Reverb().toDestination());
  const distortion = useRef(new Distortion().toDestination());
  const equalizer = useRef(new EQ3().toDestination());

  function sliderChangeHandlerForProperty(effect, property, value) {
    effect[property] = value;
    if (property === 'playbackRate') {
      updateDuration(value);
    }
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
      <MusicEffect name={'Amplify'}>
        <Knob
          value={0}
          size={70}
          angleOffset={220}
          angleRange={280}
          onChange={value =>
            sliderChangeHandlerForParameter(player, 'volume', value)
          }
          min={-35}
          max={15}
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={1} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Amplify</label>
      </MusicEffect>
      <MusicEffect name={'Speed'}>
        <Knob
          value={player?.playbackRate}
          size={70}
          angleOffset={220}
          angleRange={280}
          onChange={value =>
            sliderChangeHandlerForProperty(player, 'playbackRate', value)
          }
          min={0.8}
          max={2}
          steps={200}
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={1} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Speed</label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          value={player?.detune}
          size={70}
          angleOffset={220}
          angleRange={280}
          min={-1200}
          max={1200}
          onChange={value =>
            sliderChangeHandlerForProperty(player, 'detune', value)
          }
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={0} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Detune</label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          value={reverberation.current.decay}
          size={70}
          angleOffset={220}
          angleRange={280}
          min={0.001}
          max={10}
          steps={100}
          onChange={value =>
            sliderChangeHandlerForProperty(
              reverberation.current,
              'decay',
              value,
            )
          }
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={1} marginBottom={20} className="knob-value" />
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
          value={distortion.current.distortion}
          size={70}
          angleOffset={220}
          angleRange={280}
          min={0.001}
          max={2}
          steps={100}
          onChange={value =>
            sliderChangeHandlerForProperty(
              distortion.current,
              'distortion',
              value,
            )
          }
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={1} marginBottom={20} className="knob-value" />
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
              value={equalizer.current.low.value}
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
              <Arc arcWidth={11} color={lighter} background={darker} />
              <Value
                decimalPlace={1}
                marginBottom={20}
                className="knob-value"
              />
            </Knob>
            <label>Low</label>
          </MusicEffect>
          <MusicEffect>
            <Knob
              value={equalizer.current.mid.value}
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
              <Arc arcWidth={11} color={lighter} background={darker} />
              <Value
                decimalPlace={1}
                marginBottom={20}
                className="knob-value"
              />
            </Knob>
            <label>Mid</label>
          </MusicEffect>
          <MusicEffect>
            <Knob
              value={equalizer.current.high.value}
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
              <Arc arcWidth={11} color={lighter} background={darker} />
              <Value
                decimalPlace={1}
                marginBottom={20}
                className="knob-value"
              />
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
