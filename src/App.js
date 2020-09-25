import React from 'react';
import LoFiMaker from './components/LofiMaker/LoFiMaker';
import {PlayersProvider} from './contexts/PlayersContext';
import {ImageProvider} from './contexts/ImageContext';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import Gallery from './components/Gallery/Gallery';
import { Transport } from "tone";

function App() {
  const history = useHistory();
  history.listen((location, action) => {
    Transport.cancel();
  });
  return (
    <>
      <Route exact path="/">
        <ImageProvider>
          <PlayersProvider>
            <LoFiMaker />
          </PlayersProvider>
        </ImageProvider>
      </Route>

      <Route exact path="/gallery">
        <ImageProvider>
          <PlayersProvider>
            <Gallery />
          </PlayersProvider>
        </ImageProvider>
      </Route>
    </>
  );
}

export default App;
