/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useEffect, useMemo, useRef} from 'react';
import {Distortion, EQ3, Reverb} from 'tone';
import MusicEffect from '../components/MusicEffect/MusicEffect';
import {Knob, Arc, Value} from './rc-knob';
import {darker, lighter} from '../styles/colors';
import Toggle from 'react-toggle';
import './Knob.css';
import './Toggle.css';
import EffectsControlsContainer from '../components/EffectsControlsContainer/EffectsControlsContainer';
const knobSize = 90;
const arcSize = 29;

const MusicEffectsContainer = ({player, updateDuration}) => {
  const tonePlayer = player?.player;
  const containerRef = useRef();
  const reverberation = useMemo(() => new Reverb().toDestination(), []);
  const distortion = useMemo(() => new Distortion().toDestination(), []);
  const equalizer = useMemo(() => new EQ3().toDestination(), []);

  useEffect(() => {
    if (player !== undefined) {
      player.effects.decay = reverberation.decay;
      player.effects.distortion = distortion.distortion;
      player.effects.low = equalizer.low.value;
      player.effects.mid = equalizer.mid.value;
      player.effects.high = equalizer.high.value;
    }
  }, [distortion, equalizer, player, reverberation]);

  function sliderChangeHandlerForProperty(effect, property, value) {
    effect[property] = value;
    player.effects[property] = value;
    if (property === 'playbackRate') {
      updateDuration(value);
    }
  }

  function sliderChangeHandlerForParameter(effect, property, value) {
    effect[property].value = value;
    player.effects[property] = value;
  }

  function toggleEffect(effect, e) {
    if (tonePlayer === undefined) {
      return;
    }
    if (e.target.checked) {
      tonePlayer.connect(effect);
      player.effectsToggles[effect] = true;
    } else {
      tonePlayer.disconnect(effect);
      player.effectsToggles[effect] = false;
    }
  }

  return (
    <EffectsControlsContainer containerRef={containerRef}>
      <MusicEffect name={'Amplify'}>
        <Knob
          scrollParent={containerRef}
          value={0}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          onChange={value =>
            sliderChangeHandlerForParameter(tonePlayer, 'volume', value)
          }
          min={-35}
          max={15}
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
          <Value decimalPlace={1} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Amplify</label>
      </MusicEffect>
      <MusicEffect name={'Speed'}>
        <Knob
          scrollParent={containerRef}
          value={tonePlayer?.playbackRate}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          onChange={value =>
            sliderChangeHandlerForProperty(tonePlayer, 'playbackRate', value)
          }
          min={0.8}
          max={2}
          steps={200}
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
          <Value decimalPlace={1} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Speed</label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          scrollParent={containerRef}
          value={tonePlayer?.detune}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          min={-1200}
          max={1200}
          onChange={value =>
            sliderChangeHandlerForProperty(tonePlayer, 'detune', value)
          }
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
          <Value decimalPlace={0} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Detune</label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          scrollParent={containerRef}
          value={reverberation.decay}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          min={0.001}
          max={10}
          steps={100}
          onChange={value =>
            sliderChangeHandlerForProperty(reverberation, 'decay', value)
          }
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
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
            onChange={state => toggleEffect(reverberation, state)}
          />
        </label>
      </MusicEffect>
      <MusicEffect>
        <Knob
          scrollParent={containerRef}
          value={distortion.distortion}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          min={0.001}
          max={2}
          steps={100}
          onChange={value =>
            sliderChangeHandlerForProperty(distortion, 'distortion', value)
          }
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
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
            onChange={state => toggleEffect(distortion, state)}
          />
        </label>
      </MusicEffect>
      <div
        css={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}
      >
        <div css={{display: 'inline-flex'}}>
          <MusicEffect>
            <Knob
              scrollParent={containerRef}
              value={equalizer.low.value}
              size={knobSize}
              angleOffset={220}
              angleRange={280}
              onChange={value =>
                sliderChangeHandlerForParameter(equalizer, 'low', value)
              }
              min={-18}
              max={18}
              steps={36}
            >
              <Arc arcWidth={arcSize} color={lighter} background={darker} />
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
              scrollParent={containerRef}
              value={equalizer.mid.value}
              size={knobSize}
              angleOffset={220}
              angleRange={280}
              onChange={value =>
                sliderChangeHandlerForParameter(equalizer, 'mid', value)
              }
              min={-18}
              max={18}
              step={36}
            >
              <Arc arcWidth={arcSize} color={lighter} background={darker} />
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
              scrollParent={containerRef}
              value={equalizer.high.value}
              size={knobSize}
              angleOffset={220}
              angleRange={280}
              onChange={value =>
                sliderChangeHandlerForParameter(equalizer, 'high', value)
              }
              min={-18}
              max={18}
              step={36}
            >
              <Arc arcWidth={arcSize} color={lighter} background={darker} />
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
            onChange={state => toggleEffect(equalizer, state)}
          />
        </label>
      </div>
    </EffectsControlsContainer>
  );
};

export default MusicEffectsContainer;
