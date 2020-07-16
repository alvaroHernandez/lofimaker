import React, {useEffect, useRef, useState} from 'react';
import {tracks} from '../../assets/sounds/tracks';
import {Sequence} from 'tone';
import BeatsCreatorGrid from '../BeatsCreatorGrid/BeatsCreatorGrid';
import styled from '@emotion/styled/macro';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import Button from '../Button/Button';
import {usePlayers} from '../../contexts/PlayersContext';
import {SequencePlayer} from '../../contexts/TrackPlayer';

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

const ToneBeatsCreator = ({setCurrentSong, trackId}) => {
  const [currentBeat, setCurrentBeat] = useState(-1);

  const beatsContainer = useRef([]);
  const {addPlayer} = usePlayers();
  const sequence = useRef();
  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
    setCurrentSong({
      title: 'Drum Kit',
      duration: lofiDurationMinutes * 60 * 1000,
    });

    for (let i = 0; i < totalBeats; i++) {
      beatsContainer.current.push({});
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
    );
    const sequencePlayer = new SequencePlayer(sequence.current);
    addPlayer(trackId, sequencePlayer);
    setCurrentPlayer(sequencePlayer);
  }, []);

  const toggleBeat = (trackName, beatIndex) => {
    if (beatsContainer.current[beatIndex][trackName] === undefined) {
      beatsContainer.current[beatIndex][trackName] = currentPlayer.getPlayer(
        trackName,
      );
    } else {
      beatsContainer.current[beatIndex][trackName] = undefined;
    }
  };

  return (
    <div>
      <BeatsCreatorGrid
        highlightedColumn={currentBeat}
        totalBeats={totalBeats}
        tracks={tracks}
        toggleBeat={toggleBeat}
      />
    </div>
  );
};

export default ToneBeatsCreator;
