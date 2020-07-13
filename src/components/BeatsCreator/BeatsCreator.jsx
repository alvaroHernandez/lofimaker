import styled from '@emotion/styled/macro';
import React, {useEffect, useRef, useState} from 'react';
import Button from '../Button/Button';
import BoxWithCenteredContent from '../BoxWithCenteredText/BoxWithCenteredContent';
import {tracks} from '../../assets/sounds/tracks';
import BeatsCreatorGrid from '../BeatsCreatorGrid/BeatsCreatorGrid';
import {lofiDurationMinutes} from "../../configs/playerConfig";

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

const BeatsCreator = ({setCurrentSong}) => {
  const beatsContainer = useRef([]);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [player, setPlayer] = useState();

  useEffect(() => {
    setCurrentSong({title: 'Drum Kit', duration: lofiDurationMinutes * 60 * 1000});
    for (let i = 0; i < totalBeats; i++) {
      beatsContainer.current.push({});
    }
  }, [setCurrentSong]);

  function stop() {
    if (player !== undefined) {
      clearInterval(player);
      setPlayer();
      setCurrentBeat(0);
    }
  }
  function play() {
    if (player !== undefined) {
      return;
    }
    let beat = 0;
    setPlayer(
      window.setInterval(function () {
        for (let [, value] of Object.entries(beatsContainer.current[beat])) {
          value.play();
        }

        beat += 1;
        if (beat === beatsContainer.current.length) {
          beat = 0;
        }
        setCurrentBeat(beat);
      }, 100),
    );
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
      <BoxWithCenteredContent>Make your own beat!</BoxWithCenteredContent>
      <BeatsCreatorGrid
        totalBeats={totalBeats}
        tracks={tracks}
        toggleBeat={toggleBeat}
      />
      <TrackControls>
        <TrackControl>
          <Button variant={'secondary'} onClick={play}>
            Play
          </Button>
        </TrackControl>
        <TrackControl>
          <Button variant={'secondary'} onClick={stop}>
            Stop
          </Button>
        </TrackControl>
        <TrackControl>{currentBeat}</TrackControl>
      </TrackControls>
    </div>
  );
};

export default BeatsCreator;
