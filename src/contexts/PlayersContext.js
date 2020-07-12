/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';
import {Transport} from 'tone';

const PlayersContext = React.createContext();
PlayersContext.displayName = 'PlayersContext';

function PlayersProvider(props) {
  const [players, setPlayers] = React.useState({});
  const [isPlaying, setIsPlaying] = React.useState(false);

  function getPlayer(trackId) {
    if (players[trackId] !== undefined) {
      return players[trackId].player;
    }
  }

  function addPlayer(trackId, player) {
    if (players[trackId] !== undefined) {
      players[trackId].player.dispose();
    }
    const np = {...players, [trackId]: {player, startTime: 0}};
    setPlayers(np);
  }

  function updatePlayerStartingOffset(trackId, startTime) {
    players[trackId].startTime = startTime;
  }

  async function playAll() {
    for (let [, value] of Object.entries(players)) {
      await value.player.unsync();
      value.player.sync().start(value.startTime);
    }
    Transport.start();
    setIsPlaying(true);
  }

  function pauseAll() {
    for (let [, value] of Object.entries(players)) {
      value.player.unsync();
    }

    Transport.pause();
    setIsPlaying(false);
  }

  function stopAll() {
    Transport.stop();
    setIsPlaying(false);
  }

  const value = {
    players,
    addPlayer,
    getPlayer,
    updatePlayerStartingOffset,
    playAll,
    stopAll,
    pauseAll,
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
