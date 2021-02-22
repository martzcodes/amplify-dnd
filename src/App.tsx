import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthState, onAuthUIStateChange } from "@aws-amplify/ui-components";
import './App.css';
import Footer from './Footer';
import Games from './Games';
import Header from './Header';
import TileMap from './TileMap';
import { AmplifyAuthenticator } from '@aws-amplify/ui-react';
import DM from './DM';
import Player from './Player';

const ProtectedRoute = ({path, children, authState}: { path: string; children: JSX.Element, authState: AuthState }) => (
  <Route path={path} children={authState === AuthState.SignedIn ? children : <AmplifyAuthenticator />} />
);

function App() {
  const [authState, setAuthState] = useState<AuthState>(AuthState.SignedOut);
  const [user, setUser] = useState<any>();

  useEffect(() => {
    return onAuthUIStateChange((nextAuthState, authData) => {
      setAuthState(nextAuthState);
      setUser(authData);
      console.log(authData);
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
            <ProtectedRoute
              path="/games/:gameId/dm"
              children={<DM user={user} />}
              authState={authState}
            />
            <ProtectedRoute
              path="/games/:gameId/characters/:characterId"
              children={<Player />}
              authState={authState}
            />
            <Route path="/">
              <Games user={user || {}}></Games>
            </Route>
          </Switch>
        </main>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
