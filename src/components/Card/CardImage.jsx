import React from "react";
// import "./image.css";

const Image = ({ src, alt }) => {
  return (
    <div className="card-image-container">
      <img src={src} alt={alt} />
    </div>
  );
};

export default Image;
