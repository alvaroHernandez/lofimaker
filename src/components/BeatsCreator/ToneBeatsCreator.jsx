/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {tracks} from '../../assets/sounds/tracks';
import {Sequence, Transport} from 'tone';
import BeatsCreatorGrid from '../BeatsCreatorGrid/BeatsCreatorGrid';
import {usePlayers} from '../../contexts/PlayersContext';
import {SequencePlayer} from '../../contexts/TrackPlayer';
import BeatsCreatorEffects from '../BeatsCreatorEffects/BeatsCreatorEffects';
import {lofiDurationMinutes} from '../../configs/playerConfig';

const totalBeats = 28;

const ToneBeatsCreator = ({updateCurrentPlayer, trackId}) => {
  const [bpm, setBpm] = useState(120);
  const [loops, setLoops] = useState(true);
  const [currentPlayer, setCurrentPlayer] = useState();
  const {addPlayer, stopAll} = usePlayers();

  const playbackRate = bpm / 120;
  const sequenceDuration = (totalBeats * 60) / (bpm * 4);

  const [currentBeat, setCurrentBeat] = useState(-1);


  const updateBpm = async value => {
    if (Transport.state !== 'stopped') {
      stopAll();
    }
    await setBpm(value);
    currentPlayer.updatePlaybackRate(playbackRate);
  };

  const updateLoops = async value => {
    if (value !== loops) {
      if (Transport.state !== 'stopped') {
        stopAll();
      }
      if (value === 0) {
        value = true;
      }
      await setLoops(value);
      currentPlayer.updateLoop(value);
    }
  };


  useLayoutEffect(() => {
    if (!currentPlayer) {
      const timeBetweenBeats = sequenceDuration / totalBeats;
      const sequencePlayer = new SequencePlayer(
        setCurrentBeat,
        timeBetweenBeats,
        totalBeats,
        trackId,
        'Drum Kit',
        loops * sequenceDuration * 1000,
      );
      setCurrentPlayer(sequencePlayer);
      addPlayer(trackId, sequencePlayer);
      sequencePlayer.duration =
        loops === 0
          ? lofiDurationMinutes * 60 * 1000
          : loops * sequenceDuration * 1000;
      updateCurrentPlayer(sequencePlayer);
    } else {
      currentPlayer.updateDuration(
        loops === true
          ? lofiDurationMinutes * 60 * 1000
          : loops * sequenceDuration * 1000,
      );
      updateCurrentPlayer(currentPlayer);
    }
  }, [
    addPlayer,
    currentPlayer,
    loops,
    sequenceDuration,
    setCurrentPlayer,
    trackId,
    updateCurrentPlayer,
  ]);

  const toggleBeat = (trackName, beatIndex) => {
    if (currentPlayer.beatsContainer[beatIndex][trackName] === undefined) {
      currentPlayer.beatsContainer[beatIndex][
        trackName
      ] = currentPlayer.getPlayer(trackName);
    } else {
      currentPlayer.beatsContainer[beatIndex][trackName] = undefined;
    }
  };

  return (
    <div>
      bpm: {Math.round(bpm)}
      <BeatsCreatorEffects
        bpm={bpm}
        loops={loops}
        updateBpm={updateBpm}
        updateLoops={updateLoops}
      />
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
