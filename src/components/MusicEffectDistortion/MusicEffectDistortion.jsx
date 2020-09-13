import React, {useMemo} from 'react';
import {Arc, Knob, Value} from 'components/MusicEffectsContainer/rc-knob';
import MusicEffect from 'components/MusicEffect/MusicEffect';
import {darker, lighter} from 'styles/colors';
import Toggle from 'react-toggle';
import { Distortion } from 'tone';

const MusicEffectDistortion = ({
  containerRef,
  knobSize,
  arcSize,
  player,
}) => {
  const distortion = useMemo(() => new Distortion().toDestination(), []);

  const onStop = value => {
    distortion['distortion'] = value;
    player.effects['distortion'] = distortion['distortion'];
  };

  function toggleEffect(e) {
    if (player.player === undefined) {
      return;
    }
    if (e.target.checked) {
      player.player.connect(distortion);
      player.effectsToggles[distortion] = true;
      player.effects['distortion'] = distortion['distortion'];
    } else {
      player.player.disconnect(distortion);
      player.effectsToggles[distortion] = false;
    }
  }

  return (
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
        onStop={onStop}
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
        <Toggle icons={false} onChange={state => toggleEffect(state)} />
      </label>
    </MusicEffect>
  );
};

export {MusicEffectDistortion};
