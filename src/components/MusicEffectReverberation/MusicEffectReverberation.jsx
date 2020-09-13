import React, { useMemo} from 'react';
import {Arc, Knob, Value} from 'components/MusicEffectsContainer/rc-knob';
import MusicEffect from 'components/MusicEffect/MusicEffect';
import {darker, lighter} from 'styles/colors';
import Toggle from 'react-toggle';
import {Reverb} from 'tone';

const MusicEffectReverberation = ({
  containerRef,
  knobSize,
  arcSize,
  player,
}) => {
  const reverberation = useMemo(() => new Reverb().toDestination(), []);

  const onStop = value => {
    reverberation['decay'] = value;
    player.effects['decay'] = reverberation['decay'];
  };

  function toggleEffect(e) {
    if (player.player === undefined) {
      return;
    }
    if (e.target.checked) {
      player.player.connect(reverberation);
      player.effectsToggles[reverberation] = true;
      player.effects['decay'] = reverberation['decay'];
    } else {
      player.player.disconnect(reverberation);
      player.effectsToggles[reverberation] = false;
    }
  }

  return (
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
        onStop={onStop}
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
        <Toggle icons={false} onChange={state => toggleEffect(state)} />
      </label>
    </MusicEffect>
  );
};

export {MusicEffectReverberation};
