import styled from '@emotion/styled/macro';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import {tracks} from '../../assets/sounds/tracks';
import BeatsCreatorGrid from '../BeatsCreatorGrid/BeatsCreatorGrid';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import * as Tone from "tone";

const totalBeats = 20;

const TrackControls = styled.div`
  margin-top: 1em;
  grid-gap: 1em;
  display: grid;
  grid-template-columns: 60px 60px 60px;
`;

const TrackControl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BeatsCreator = ({setCurrentSong, playRef, stopRef}) => {
  const beatsContainer = useRef([]);
  const [currentBeat, setCurrentBeat] = useState(0);
  const player = useRef(null);


  useEffect(() => {
    setCurrentSong({
      title: 'Drum Kit',
      duration: lofiDurationMinutes * 60 * 1000,
    });
    for (let i = 0; i < totalBeats; i++) {
      beatsContainer.current.push({});
    }
  }, [setCurrentSong]);

  function stop() {
    if (player.current !== null) {
      clearInterval(player.current);
      player.current = null;
      setCurrentBeat(0);
    }
  }

  function play() {
    if (player.current !== null) {
      return;
    }
    let beat = 0;
    player.current = window.setInterval(function () {
      for (let [, value] of Object.entries(beatsContainer.current[beat])) {
        value.play();
      }

      beat += 1;
      if (beat === beatsContainer.current.length) {
        beat = 0;
      }
      setCurrentBeat(beat);
    }, 100);
  }

  const toggleBeat = (trackName, beatIndex) => {
    if (beatsContainer.current[beatIndex][trackName] === undefined) {
      beatsContainer.current[beatIndex][trackName] = new Audio(
        tracks[trackName].sound,
      );
    } else {
      delete beatsContainer.current[beatIndex][trackName];
    }
  };

  return (
    <div>
      <BeatsCreatorGrid
        totalBeats={totalBeats}
        tracks={tracks}
        toggleBeat={toggleBeat}
      />
      <TrackControls>
        <TrackControl>{currentBeat}</TrackControl>
      </TrackControls>
    </div>
  );
};

export default BeatsCreator;
