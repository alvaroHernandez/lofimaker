import React from 'react';
import Tone from '../Tone/Tone';
import Button from '../components/Button/Button';
import {
  AutoFilter,
  BitCrusher,
  Chebyshev,
  Chorus,
  Distortion,
  EQ3,
  FrequencyEnvelope,
  Noise,
  PitchShift,
  Player,
  Reverb,
  Vibrato,
} from 'tone';
import am from './am.mp3';

var player = new Player(am).toDestination();
player.autostart = true;

var eq = new EQ3().toDestination();

var reverb = new Reverb().toDestination();
var distortion = new Distortion().toDestination();
var vibrato = new Vibrato({type: 'sine'}).toDestination();
var cheby = new Chebyshev(50).toDestination();
var pitch = new PitchShift().toDestination();
var crusher = new BitCrusher(4).toDestination();

var noise = new Noise('white').start();
var autoFilter = new AutoFilter({
  frequency: '8m',
  min: 800,
  max: 900,
}).toDestination();

var chorus = new Chorus(4, 2.5, 0.5);

function play() {
  player.start();
}

function stop() {
  player.stop();
}

const Tones = () => {
  return (
    <>
      <Tone
        player={player}
        name={'eq'}
        effect={eq}
        property={'low'}
        from={-10}
        to={10}
        step={0.1}
      />
      <Tone
        player={player}
        name={'eq'}
        effect={eq}
        property={'mid'}
        from={-10}
        to={10}
        step={0.1}
      />
      <Tone
        player={player}
        name={'eq'}
        effect={eq}
        property={'high'}
        from={-10}
        to={10}
        step={0.1}
      />
      <Tone
        player={player}
        name={'reverb'}
        effect={reverb}
        property={'decay'}
        from={0}
        to={10}
        step={0.1}
      />
      <Tone
        player={player}
        name={'distortion'}
        effect={distortion}
        property={'distortion'}
        from={0.001}
        to={3}
        step={0.1}
      />
      <Tone
        player={player}
        name={'vibrato'}
        effect={vibrato}
        property={'frequency'}
        from={0}
        to={10}
        step={1}
      />
      <Tone
        player={player}
        name={'cheby'}
        effect={cheby}
        property={'frequency'}
        from={1}
        to={100}
        step={1}
      />
      <Tone
        player={player}
        name={'pitch'}
        effect={pitch}
        property={'pitch'}
        from={-8}
        to={8}
        step={1}
      />
      <Tone
        player={player}
        name={'crusher'}
        effect={crusher}
        property={'bits'}
        form={1}
        to={8}
        step={1}
      />
      <Tone
        player={noise}
        name={'noise'}
        effect={autoFilter}
        property={'playbackRate'}
        form={0.1}
        to={1}
        step={0.1}
      />
      <Tone
        player={player}
        name={'chorus'}
        effect={chorus}
        property={'playbackRate'}
        form={0.1}
        to={1}
        step={0.1}
      />
      <Tone
        player={player}
        name={'speed'}
        effect={player}
        property={'playbackRate'}
        form={0.1}
        to={1}
        step={0.1}
      />
      <Button onClick={play}>Play</Button>
      <Button onClick={stop}>Stop</Button>
    </>
  );
};

export default Tones;
