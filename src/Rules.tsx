import React from 'react';
import './styles.css';

const Rules: React.FC = () => {
  const handleMain = () => {
    // Returning to main menu
    window.open("./index.html", "_self");
  };
    
  return (
    <div className="game-container">
      <div className="scrolling-background"></div>
        <div className="main-menu text">
          <h1 className="menu-title">Critter Clicks</h1>
          <h1>Rules</h1>
          <p>Buy pets and take care of them by clicking on them! Choose to
            feed, water, or play with your pet with each click. By taking
            care of your pet, you will also gain coins.
          </p>
          <p>Over time and with clicks, your pet will gain experience. With 
            enough experience, it will level up, increasing the amount of 
            coins per click.
          </p>
          <p>With enough coins, you can evolve your pet, giving them a new
            appearance and three levels!
          </p>
          <p>Additionally, you can buy items that will make it easier to
            take care of your pet.
          </p>
          <div className="menu-buttons">
            <button className="menu-button play-button" onClick={handleMain}>Main Menu</button>
          </div>
        <div className="team-text">By Cat Loafers</div>
      </div>
    </div>
  );
};

export default Rules;