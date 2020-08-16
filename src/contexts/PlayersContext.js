/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useCallback, useEffect} from 'react';
import {Transport, context} from 'tone';
import {lofiDurationMinutes} from '../configs/playerConfig';

const PlayersContext = React.createContext();
PlayersContext.displayName = 'PlayersContext';

function PlayersProvider(props) {
  const players = React.useRef({});
  const [isPlaying, setIsPlaying] = React.useState(false);

  useEffect(() => {
    Transport.on('stop', () => {
      setIsPlaying(false);
    });

    Transport.on('pause', () => {
      setIsPlaying(false);
    });
  }, []);

  const getPlayer = useCallback(trackId => {
    if (players.current[trackId] !== undefined) {
      return players.current[trackId].player;
    }
  }, []);

  const unmute = useCallback(
    trackId => {
      const player = getPlayer(trackId);
      if (player !== undefined) {
        player.unmute();
      }
    },
    [getPlayer],
  );

  const mute = useCallback(
    trackId => {
      const player = getPlayer(trackId);
      if (player !== undefined) {
        player.mute();
      }
    },
    [getPlayer],
  );

  const addPlayer = useCallback((trackId, player) => {
    if (players.current[trackId] !== undefined) {
      players.current[trackId].player.dispose();
    }
    const np = {...players.current, [trackId]: {player}};
    players.current = np;
  }, []);

  const updatePlayerStartingOffset = useCallback((trackId, startTime) => {
    players.current[trackId].startTime = startTime;
    players.current[trackId].player.sync(startTime);
  }, []);

  const playAll = useCallback(async () => {
    if (context.state !== 'running') {
      await context.resume();
    }
    Transport.start();
    Transport.stop(`+${lofiDurationMinutes * 60}`);
    setIsPlaying(true);
  }, []);

  const pauseAll = useCallback(() => {
    Transport.pause();
  }, []);

  const stopAll = useCallback(() => {
    Transport.stop();
  }, []);

  const disposeAll = useCallback(() => {
    Object.values(players.current).forEach(player => player.player.dispose() );
    players.current = {};
  }, []);

  const serialize = useCallback(() => {
    return Object.values(players.current).map(player =>
      player.player.serialize(),
    );
  }, []);

  const value = {
    player: players.current,
    addPlayer,
    getPlayer,
    playAll,
    stopAll,
    pauseAll,
    unmute,
    mute,
    isPlaying,
    serialize,
    disposeAll,
  };
  return <PlayersContext.Provider value={value} {...props} />;
}

function usePlayers() {
  const context = React.useContext(PlayersContext);
  if (context === undefined) {
    throw new Error(`useAuth must be used within a AuthProvider`);
  }
  return context;
}

export {PlayersProvider, usePlayers};
