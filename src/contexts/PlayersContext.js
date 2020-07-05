/** @jsx jsx */
import {jsx} from '@emotion/core';
import React from 'react';

const PlayersContext = React.createContext();
PlayersContext.displayName = 'PlayersContext';

function PlayersProvider(props) {
  const [players, setPlayers] = React.useState({});

  function getPlayer(trackId) {
    return players[trackId];
  }

  function addPlayer(trackId, player) {
    if (players[trackId] !== undefined) {
      players[trackId].dispose();
    }
    const np = {...players, [trackId]: player};
    setPlayers(np);
  }

  const value = {players, addPlayer, getPlayer};
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
