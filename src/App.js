import React from 'react';
import LoFiMaker from './components/LofiMaker/LoFiMaker';
import {PlayersProvider} from './contexts/PlayersContext';
import {ImageProvider} from './contexts/ImageContext';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import LoFiLoader from './components/LoFiLoader/LoFiLoader';
import AutoFitGrid from "./components/AutoFitGrid/AutoFitGrid";
import Gallery from "./components/Gallery/Gallery";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <ImageProvider>
            <PlayersProvider>
              <LoFiMaker />
            </PlayersProvider>
          </ImageProvider>
        </Route>

        <Route exact path="/gallery">
          <PlayersProvider>
              <Gallery/>
          </PlayersProvider>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
