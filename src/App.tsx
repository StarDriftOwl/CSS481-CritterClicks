// src/App.tsx
import React from 'react';
import Game from './Game';
// import './App.css';

function App() {
  console.log("App component rendering"); // Add this log
  return (
    // <div className="App" style={{ backgroundColor: "#f0f0f0", minHeight: "100vh" }}>
     <div> 
      <header>
      </header>
      <main>
      <Game />
      </main>
    </div>
  );
}

export default App;