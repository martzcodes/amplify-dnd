import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import './App.css';
import Footer from './Footer';
import Games from './Games';
import Header from './Header';
import TileMap from './TileMap';
import { AmplifyAuthenticator, withAuthenticator } from '@aws-amplify/ui-react';
import DM from './DM';
import Player from './Player';
import PublicGames from './PublicGames';
import Home from './Home';
import { Auth } from 'aws-amplify';

function App() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SignedOut);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const userInfo = await Auth.currentUserInfo();
        setUser(userInfo);
      } catch(e) {
        console.log(e);
      }
    };
    getUserInfo();
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
    });
  }, []);

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header authState={authState} email={user?.attributes?.email}></Header>
        <main className="flex-grow">
          <Switch>
            <Route path="/tile">
              <TileMap></TileMap>
            </Route>
            <Route
              path="/games/:gameId/dm"
              children={user ? <DM user={user} /> : <></>}
              authState={authState}
            />
            <Route
              path="/games/:gameId/characters/:characterId"
              children={user ? <Player user={user} /> : <></>}
            />
            <Route
              path="/games"
              children={user ? <Games user={user}></Games> : <></>}
            />
            <Route path="/">
              {user ? <PublicGames user={user}></PublicGames> : <></>}
            </Route>
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default withAuthenticator(App);
