import React from 'react';
import {Arc, Knob, Value} from 'components/MusicEffectsContainer/rc-knob';
import MusicEffect from 'components/MusicEffect/MusicEffect';
import {darker, lighter} from 'styles/colors';

const MusicEffectAmplify = ({containerRef, knobSize, arcSize, player}) => {
  const onStop = value => {
    player.player['volume'].value = value;
    player.effects['volume'] = value;
  };

  return (
    <MusicEffect name={'Amplify'}>
      <Knob
        scrollParent={containerRef}
        value={0}
        size={knobSize}
        angleOffset={220}
        angleRange={280}
        min={-35}
        max={15}
        onStop={onStop}
      >
        <Arc arcWidth={arcSize} color={lighter} background={darker} />
        <Value decimalPlace={1} marginBottom={20} className="knob-value" />
      </Knob>
      <label>Amplify</label>
    </MusicEffect>
  );
};

export {MusicEffectAmplify};
