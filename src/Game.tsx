import React from 'react';
import './styles.css';

const Game: React.FC = () => {
  const handlePlay = () => {
    console.log("Play clicked");
    // Play logic here
  };

  const handleGallery = () => {
    console.log("Gallery clicked");
    // Gallery logic here
  };

  const handleSettings = () => {
    console.log("Settings clicked");
    // Settings logic here
  };

  const handleCredits = () => {
    console.log("credits clicked");
    window.open("./credits.html", "_self");
    // Settings logic here
  };

  const handleRules = () => {
    console.log("Settings clicked");
    window.open("./rules.html", "_self");
    // Settings logic here
  };

return (
  <div className="game-container">
  <div className="scrolling-background"></div>
  <div className="main-menu">
    <h1 className="menu-title">Critter Clicks</h1>

    <div className="menu-buttons">
      <button className="menu-button play-button" onClick={handlePlay}>Play</button>
      <button className="menu-button gallery-button" onClick={handleGallery}>Pet Gallery</button>
      <button className="menu-button settings-button" onClick={handleSettings}>Settings</button>
      <button className="menu-button credits-button" onClick={handleCredits}>Credits</button>
      <button className="menu-button rules-button" onClick={handleRules}>Rules</button>
    </div>
    <div className="team-text">By Cat Loafers</div>
  </div>
  </div>
);
};

export default Game;