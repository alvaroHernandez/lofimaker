import React from 'react';
import {Arc, Knob, Value} from 'components/MusicEffectsContainer/rc-knob';
import MusicEffect from 'components/MusicEffect/MusicEffect';
import {darker, lighter} from 'styles/colors';
import { jsx } from "@emotion/core";

const MusicEffectSpeed = ({containerRef, knobSize, arcSize, player, updateDuration}) => {
  const onStop = value => {
    player.player['playbackRate'] = value;
    player.effects['playbackRate'] = value;
    updateDuration(value);
  };

  return (
    <MusicEffect name={'Speed'}>
      <Knob
        scrollParent={containerRef}
        value={player.player.playbackRate}
        size={knobSize}
        angleOffset={220}
        angleRange={280}
        min={0.8}
        max={2}
        steps={200}
        onStop={onStop}
      >
        <Arc arcWidth={arcSize} color={lighter} background={darker} />
        <Value decimalPlace={1} marginBottom={20} className="knob-value" />
      </Knob>
      <label>Speed</label>
    </MusicEffect>
  );
};

export {MusicEffectSpeed};
