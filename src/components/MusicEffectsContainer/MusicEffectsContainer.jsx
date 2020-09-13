import React, {useRef} from 'react';
import EffectsControlsContainer from 'components/EffectsControlsContainer/EffectsControlsContainer';
import { MusicEffectAmplify } from "components/MusicEffectAmplify/MusicEffectAmplify";
import './Knob.css';
import './Toggle.css';
import { MusicEffectSpeed } from "components/MusicEffectSpeed/MusicEffectSpeed";
import { MusicEffectDetune } from "components/MusicEffectDetune/MusicEffectDetune";
import { MusicEffectReverberation } from "components/MusicEffectReverberation/MusicEffectReverberation";
import { MusicEffectDistortion } from "components/MusicEffectDistortion/MusicEffectDistortion";
import { MusicEffectEqualizer } from "components/MusicEffectEqualizer/MusicEffectEqualizer";
const knobSize = 90;
const arcSize = 29;

const MusicEffectContainer = ({player, updateDuration}) => {
  const containerRef = useRef();
  return (
    <EffectsControlsContainer containerRef={containerRef}>
      <MusicEffectAmplify
        arcSize={arcSize}
        knobSize={knobSize}
        player={player}
        containerRef={containerRef}
      />
      <MusicEffectSpeed
        arcSize={arcSize}
        knobSize={knobSize}
        player={player}
        containerRef={containerRef}
        updateDuration={updateDuration}
      />
      <MusicEffectDetune
        arcSize={arcSize}
        knobSize={knobSize}
        player={player}
        containerRef={containerRef}
      />
      <MusicEffectReverberation
        arcSize={arcSize}
        knobSize={knobSize}
        player={player}
        containerRef={containerRef}
      />
      <MusicEffectDistortion
        arcSize={arcSize}
        knobSize={knobSize}
        player={player}
        containerRef={containerRef}
      />
      <MusicEffectEqualizer
        arcSize={arcSize}
        knobSize={knobSize}
        player={player}
        containerRef={containerRef}
      />

    </EffectsControlsContainer>
  );
};

export default MusicEffectContainer;
