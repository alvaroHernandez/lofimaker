import React, {useEffect, useRef, useState} from 'react';
import {tracks} from '../../assets/sounds/tracks';
import {Sequence, Transport, Time} from 'tone';
import BeatsCreatorGrid from '../BeatsCreatorGrid/BeatsCreatorGrid';
import styled from '@emotion/styled/macro';
import {lofiDurationMinutes} from '../../configs/playerConfig';
import {usePlayers} from '../../contexts/PlayersContext';
import {SequencePlayer} from '../../contexts/TrackPlayer';

const totalBeats = 30;
const beatColumnsIdicators = Array.from(Array(totalBeats).keys());

const ToneBeatsCreator = ({updateCurrentPlayer, trackId}) => {
  const [currentBeat, setCurrentBeat] = useState(-1);

  const beatsContainer = useRef([]);
  const {addPlayer} = usePlayers();
  const sequence = useRef();
  const [currentPlayer, setCurrentPlayer] = useState();

  useEffect(() => {
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
      beatColumnsIdicators,
      '20n',
    );
    const sequenceDuration = Time('20n').toMilliseconds() * totalBeats;
    const sequencePlayer = new SequencePlayer(sequence.current,trackId,'Drum Kit',sequenceDuration);
    addPlayer(trackId, sequencePlayer);
    setCurrentPlayer(sequencePlayer);
    updateCurrentPlayer(sequencePlayer);
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
