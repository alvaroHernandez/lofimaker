import React from 'react';
import {Arc, Knob, Value} from 'components/MusicEffectsContainer/rc-knob';
import MusicEffect from 'components/MusicEffect/MusicEffect';
import {darker, lighter} from 'styles/colors';
import { jsx } from "@emotion/core";

const MusicEffectDetune = ({containerRef, knobSize, arcSize, player}) => {
  const onStop = value => {
    player.player['detune'] = value;
    player.effects['detune'] = value;
  };

  return (
    <MusicEffect>
      <Knob
        scrollParent={containerRef}
        value={player.player.detune}
        size={knobSize}
        angleOffset={220}
        angleRange={280}
        min={-1200}
        max={1200}
        onStop={onStop}
      >
        <Arc arcWidth={arcSize} color={lighter} background={darker} />
        <Value decimalPlace={0} marginBottom={20} className="knob-value" />
      </Knob>
      <label>Detune</label>
    </MusicEffect>
  );
};

export {MusicEffectDetune};
