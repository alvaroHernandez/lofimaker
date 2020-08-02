/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useRef} from 'react';
import MusicEffect from '../MusicEffect/MusicEffect';
import {Arc, Knob, Value} from '../../MusicEffectsContainer/rc-knob';
import {darker, lighter} from '../../styles/colors';
import {findClosest} from '../../utils/findClosest';
import {medium} from '../../styles/mediaqueries';
import EffectsControlsContainer from "../EffectsControlsContainer/EffectsControlsContainer";
const totalAvailableLoops = 10;
const availableLoops = Array.from(Array(totalAvailableLoops).keys());
const knobSize = 90;
const arcSize = 29;
const BeatsCreatorEffects = ({bpm, loops, updateBpm, updateLoops}) => {
  const containerRef = useRef();
  const attemptToUpdateLoops = value => {
    const newValue = findClosest(availableLoops, value);
    if (newValue !== loops) {
      updateLoops(newValue);
    }
  };
  return (
    <EffectsControlsContainer containerRef={containerRef}>
      <MusicEffect name={'bpm'}>
        <Knob
          scrollParent={containerRef}
          value={bpm}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          onChange={updateBpm}
          min={60}
          max={180}
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
          <Value decimalPlace={0} marginBottom={20} className="knob-value" />
        </Knob>
        <label>bpm</label>
      </MusicEffect>
      <MusicEffect name={'loops'}>
        <Knob
          scrollParent={containerRef}
          value={loops === true ? 0 : loops}
          size={knobSize}
          angleOffset={220}
          angleRange={280}
          onChange={attemptToUpdateLoops}
          min={0}
          max={totalAvailableLoops}
          steps={totalAvailableLoops - 1}
          snap={true}
        >
          <Arc arcWidth={arcSize} color={lighter} background={darker} />
          <Value
            fixedText={loops === true ? '∞' : null}
            decimalPlace={0}
            marginBottom={20}
            className="knob-value"
          />
        </Knob>
        <label>Loops</label>
      </MusicEffect>
    </EffectsControlsContainer>
  );
};

export default BeatsCreatorEffects;
