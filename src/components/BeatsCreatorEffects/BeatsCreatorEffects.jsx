/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import MusicEffect from '../MusicEffect/MusicEffect';
import {Arc, Knob, Value} from '../../MusicEffectsContainer/rc-knob';
import {darker, lighter} from '../../styles/colors';
import {findClosest} from '../../utils/findClosest';
const totalAvailableLoops = 10;
const availableLoops = Array.from(Array(totalAvailableLoops).keys());

const BeatsCreatorEffects = ({bpm, loops, updateBpm, updateLoops}) => {
  const attemptToUpdateLoops = value => {
    const newValue = findClosest(availableLoops, value);
    if (newValue !== loops) {
      updateLoops(newValue);
    }
  };
  return (
    <React.Fragment>
      <MusicEffect name={'bpm'}>
        <Knob
          value={bpm}
          size={70}
          angleOffset={220}
          angleRange={280}
          onChange={updateBpm}
          min={60}
          max={180}
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={0} marginBottom={20} className="knob-value" />
        </Knob>
        <label>bpm</label>
      </MusicEffect>
      <MusicEffect name={'loops'}>
        <Knob
          value={loops}
          size={70}
          angleOffset={220}
          angleRange={280}
          onChange={attemptToUpdateLoops}
          min={1}
          max={totalAvailableLoops}
          steps={totalAvailableLoops - 1}
          snap={true}
        >
          <Arc arcWidth={11} color={lighter} background={darker} />
          <Value decimalPlace={0} marginBottom={20} className="knob-value" />
        </Knob>
        <label>Loops</label>
      </MusicEffect>
    </React.Fragment>
  );
};

export default BeatsCreatorEffects;
