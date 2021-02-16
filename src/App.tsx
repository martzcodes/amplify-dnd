import React from 'react';
import './App.css';
import Footer from './Footer';
import Game from './Game';
import Header from './Header';

function App() {
  return (
    <div className="flex flex-col h-screen">
      <Header></Header>
      <main className="flex-grow">
        <Game></Game>
      </main>
      <Footer></Footer>
    </div>
  );
}

export default App;
