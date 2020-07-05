import React from 'react';
import LoFiMaker from './components/LofiMaker/LoFiMaker';
import {PlayersProvider} from './contexts/PlayersContext';
// import Tones from "./Tones/Tones";

function App() {
  // return <Tones/>
  return (
    <PlayersProvider>
      <LoFiMaker />;
    </PlayersProvider>
  );
}

export default App;
