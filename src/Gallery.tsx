import "./gallery.css";
import React, { useState } from "react";

const Gallery: React.FC = () => {
  const handleMain = () => {
    window.open("./index.html", "_self");
  };

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openImage = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };
  return (
    <div className="gallery-container">
      <div className="scrolling-background"></div>
      <div className="main-menu">
        <div className="gallery-cell">
          <h1 className="menu-title">Pet Gallery</h1>
          <img
            src="Pictures/ghostcat1.png"
            className="galleryCell"
            onClick={() => openImage("Pictures/ghostcat1.png")}
            alt="Ghost Cat 1"
          />
          <img
            src="Pictures/ghostcat2.png"
            className="galleryCell"
            onClick={() => openImage("Pictures/ghostcat2.png")}
            alt="Ghost Cat 2"
          />
          <img
            src="Pictures/evilcat1.png"
            className="galleryCell"
            onClick={() => openImage("Pictures/evilcat1.png")}
            alt="Evil Cat 1"
          />
          <img
            src="Pictures/evilcat2.png"
            className="galleryCell"
            onClick={() => openImage("Pictures/evilcat2.png")}
            alt="Evil Cat 2"
          />
        </div>
      </div>
      <div className="menu-buttons">
        <button className="menu-button play-button" onClick={handleMain}>
          Main Menu
        </button>
      </div>
      <div className="team-text">By Cat Loafers</div>

      {selectedImage && (
        <div className="image-modal" onClick={closeImage}>
          <div className="modal-content">
            <img src={selectedImage} alt="Enlarged pet" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
