/** @jsx jsx */
import {jsx} from '@emotion/core';
import React, {useCallback} from 'react';
import {Transport} from 'tone';

const PlayersContext = React.createContext();
PlayersContext.displayName = 'PlayersContext';

function PlayersProvider(props) {
  const players = React.useRef({});
  const [isPlaying, setIsPlaying] = React.useState(false);

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
    const np = {...players.current, [trackId]: {player, startTime: 0}};
    players.current = np;
  }, []);

  const updatePlayerStartingOffset = useCallback((trackId, startTime) => {
    players.current[trackId].startTime = startTime;
  }, []);

  const playAll = useCallback(async () => {
    for (let [, value] of Object.entries(players.current)) {
      await value.player.unsync();
      value.player.sync(value.startTime);
    }
    Transport.start();
    setIsPlaying(true);
  }, []);

  const pauseAll = useCallback(() => {
    Transport.pause();
    setIsPlaying(false);
  }, []);

  const stopAll = useCallback(() => {
    for (let [, value] of Object.entries(players.current)) {
      value.player.unsync();
    }
    Transport.stop();
    setIsPlaying(false);
  }, []);

  const value = {
    player: players.current,
    addPlayer,
    getPlayer,
    updatePlayerStartingOffset,
    playAll,
    stopAll,
    pauseAll,
    unmute,
    mute,
    isPlaying,
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
