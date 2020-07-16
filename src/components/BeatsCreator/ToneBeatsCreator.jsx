import React, {useEffect, useRef, useState} from 'react';
import {tracks, tracks2} from '../../assets/sounds/tracks';
import {Player, Players, Sequence} from 'tone';
import BeatsCreatorGrid from '../BeatsCreatorGrid/BeatsCreatorGrid';
import styled from '@emotion/styled/macro';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import Button from '../Button/Button';
import {Transport} from 'tone';

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

const totalBeats = 20;

const ToneBeatsCreator = ({setCurrentSong}) => {
  const [currentBeat, setCurrentBeat] = useState(-1);
  const beatsContainer = useRef([]);

  const players = useRef({});
  const sequence = useRef();

  useEffect(() => {
    setCurrentSong({
      title: 'Drum Kit',
      duration: lofiDurationMinutes * 60 * 1000,
    });
    for (let i = 0; i < totalBeats; i++) {
      beatsContainer.current.push({});
    }

    Object.entries(tracks).map(([key, value]) => {
      const newPlayer = new Player(value.sound);
      newPlayer.toDestination();
      newPlayer.autostart = false;
      players.current = {...players.current, [key]: newPlayer};
    });
  }, [setCurrentSong]);

  function stop() {
    if (sequence.current !== undefined) {
      console.log(sequence.current)
      sequence.current.stop();
      sequence.current.dispose();
    }
    Object.entries(players.current).forEach(([, player]) => {
      player.stop();
      player.unsync();
    });
    setCurrentBeat(-1);
    Transport.stop();
  }

  const play = () => {
    if (sequence.current !== undefined) {
      sequence.current.stop(0);
      sequence.current.dispose();
    }

    sequence.current = new Sequence(
      function (time, col) {
        setCurrentBeat(col);
        for (let [, value] of Object.entries(beatsContainer.current[col])) {
          value.start(time);
        }
      },
      [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      '20n',
    ).start(0);
    Transport.start();
  };

  const toggleBeat = (trackName, beatIndex) => {
    if (beatsContainer.current[beatIndex][trackName] === undefined) {
      beatsContainer.current[beatIndex][trackName] = players.current[trackName];
    } else {
      beatsContainer.current[beatIndex][trackName] = undefined;
    }
  };

  return (
    <div>
      <Button onClick={play}>play</Button>
      <Button onClick={stop}>stop</Button>
      <BeatsCreatorGrid
        highlightedColumn={currentBeat}
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

export default ToneBeatsCreator;
