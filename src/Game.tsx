import React from 'react';
import './styles.css';

const Game: React.FC = () => {

  const handlePlay = () => {
    console.log("Play clicked");
  };

  const handleGallery = () => {
    console.log("Gallery clicked");
    window.open("./gallery.html", "_self");

  };

  const handleSettings = () => {
    console.log("Settings clicked");
    window.open("./settings.html", "_self");

    
  };

  const handleCredits = () => {
    console.log("credits clicked");
    window.open("./credits.html", "_self");
  };

  const handleRules = () => {
    console.log("Rules clicked");
    window.open("./rules.html", "_self");
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