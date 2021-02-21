import React from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import './App.css';
import Footer from './Footer';
import Game from './Game';
import Games from './Games';
import Header from './Header';
import TileMap from './TileMap';

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header></Header>
        <main className="flex-grow">
          <Switch>
            <Route path="/tile">
              <TileMap></TileMap>
            </Route>
            <Route
              path="/games/:gameId/dm"
              children={<Game dm={true}/>}
            />
            <Route
              path="/games/:gameId/players/:playerId"
              children={<Game />}
            />
            <Route path="/">
              <Games></Games>
            </Route>
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
