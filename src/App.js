import React from 'react';
import LoFiMaker from './components/LofiMaker/LoFiMaker';
import {PlayersProvider} from './contexts/PlayersContext';

function App() {
  return (
    <PlayersProvider>
      <LoFiMaker />
    </PlayersProvider>
  );
}

export default App;
