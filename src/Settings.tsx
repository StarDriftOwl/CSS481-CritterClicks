import React from "react";
import "./styles.css";

const Settings: React.FC = () => {
  const handleMain = () => {
    // Returning to main menu
    window.open("./index.html", "_self");
  };

  return (
    <div className="game-container">
      <div className="scrolling-background"></div>
      <div className="main-menu text">
        <h1 className="menu-title">Critter Clicks</h1>
        <h1>Settings</h1>
        <p>Coming soon. Check Github for updates</p>

        <div className="menu-buttons">
          <button className="menu-button play-button" onClick={handleMain}>
            Main Menu
          </button>
        </div>
        <div className="team-text">By Cat Loafers</div>
      </div>
    </div>
  );
};

export default Settings;
