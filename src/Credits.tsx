import React from 'react';
import './styles.css';

const Credits: React.FC = () => {
  const handleMain = () => {
    // Returning to main menu
    window.open("./index.html", "_self");
  };
    
  return (
    <div className="game-container">
      <div className="scrolling-background"></div>
        <div className="main-menu">
          <h1 className="menu-title">Critter Clicks</h1>

          <div className="text">
            
            <h1>Credits</h1>
            <p>Developed by team Cat Loafers for CSS 481, Web Development</p>
            <h3>Star</h3>
            <p>Star is a student majoring in computer science and minoring in math at the University of Washington, Bothell. She is a self-taught 2D/3D artist aspiring 
              to become a technical artist in the game industry. She has experience with data structures & algorithms, database systems, and high-performance computing
              (working with CUDA). She knows Python, Java, Swift, C++, and C# but prefers to code in C++. She is a C++, NVIDIA graphic card, and Unreal Engine 
              superfan and swears by it.</p>
            <h3>Charlie</h3>
            <p>Charlie is a computer science student at University of Washington, Bothell. They have experience working with cloud computing, APIs, SQL, noSQL, cybersecurity, 
              and socket programming. They are proficient with Python, Javascript, C++, and Java.</p>
            <h3>Jackie</h3>
            <p>Lok is a cs student at UWB, experienced with frameworks like Django, network programming, and databases like MySQL, and SQL lite. He is also familiar with 
              coding languages like C++, C#, Java, Javascript, and Python.</p>
            <h3>Ben</h3>
                    
            <div className="menu-buttons">
              <button className="menu-button play-button" onClick={handleMain}>Main Menu</button>
            </div>
          </div>
        <div className="team-text">By Cat Loafers</div>
      </div>
    </div>
  );
};

export default Credits;