import React, { useState } from 'react';
import ImagePreview from './ImagePreview'; // Adjust the path as needed
import './Style.css'; // Adjust the path as needed

const ImageSlider = ({ images, height, onDelete }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // const nextSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === images.length - 1 ? 0 : prevIndex + 1
  //   );
  // };

  // const prevSlide = () => {
  //   setCurrentIndex((prevIndex) =>
  //     prevIndex === 0 ? images.length - 1 : prevIndex - 1
  //   );
  // };

  return (
    <div className="img-slider-container">
      <div className="img-slider-wrapper">
        {images?.map((image, index) => (
          <div key={index} className="img-slider-slide">
              <ImagePreview image={image} height={height} onDelete={onDelete} />
          </div>
        ))}
      </div>
  </div>
  );
};

export default ImageSlider;