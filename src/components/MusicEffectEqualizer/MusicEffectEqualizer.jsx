/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsx jsx */
import {jsx} from '@emotion/core';
import {Arc, Knob, Value} from 'components/MusicEffectsContainer/rc-knob';
import MusicEffect from 'components/MusicEffect/MusicEffect';
import {darker, lighter} from 'styles/colors';
import Toggle from 'react-toggle';
import {EQ3} from 'tone';
import { useMemo } from 'react';

const MusicEffectEqualizer = ({containerRef, knobSize, arcSize, player}) => {
  const equalizer = useMemo(() => new EQ3().toDestination(), []);

  const onStop = (property, value) => {
    equalizer[property].value = value;
    player.effects[property] = equalizer[property].value;
  };

  function toggleEffect(e) {
    if (player.player === undefined) {
      return;
    }
    if (e.target.checked) {
      player.player.connect(equalizer);
      player.effectsToggles[equalizer] = true;
      player.effects.low = equalizer.low.value;
      player.effects.mid = equalizer.mid.value;
      player.effects.high = equalizer.high.value;
    } else {
      player.player.disconnect(equalizer);
      player.effectsToggles[equalizer] = false;
    }
  }

  return (
    <div css={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div css={{display: 'inline-flex'}}>
        <MusicEffect>
          <Knob
            scrollParent={containerRef}
            value={equalizer.low.value}
            size={knobSize}
            angleOffset={220}
            angleRange={280}
            min={-18}
            max={18}
            steps={36}
            onStop={value => onStop('low', value)}
          >
            <Arc arcWidth={arcSize} color={lighter} background={darker} />
            <Value decimalPlace={1} marginBottom={20} className="knob-value" />
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
            min={-18}
            max={18}
            step={36}
            onStop={value => onStop('mid', value)}
          >
            <Arc arcWidth={arcSize} color={lighter} background={darker} />
            <Value decimalPlace={1} marginBottom={20} className="knob-value" />
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
            min={-18}
            max={18}
            step={36}
            onStop={value => onStop('high', value)}
          >
            <Arc arcWidth={arcSize} color={lighter} background={darker} />
            <Value decimalPlace={1} marginBottom={20} className="knob-value" />
          </Knob>
          <label>High</label>
        </MusicEffect>
      </div>
      <label
        css={{
          marginTop: '0.5em',
        }}
      >
        <Toggle icons={false} onChange={state => toggleEffect(state)} />
      </label>
    </div>
  );
};

export {MusicEffectEqualizer};
