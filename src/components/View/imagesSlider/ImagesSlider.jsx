// import React, { useRef, useState } from "react";
// import "./imageSlider.css";
// function ImagesSlider({ images }) {
//   const imagesURL = "https://app.having.market/public/images/";
//   const [selectedImg, setSelectedImg] = useState(0);
//   // console.log(images);
//   const imgContainer = useRef();
//   function sliding() {}
//   function handelSelectingImage(imgIndex) {
//     setSelectedImg(imgIndex);
//   }
//   return (
//     <div className="imgs-slider">
//       <div className="imgs-main">
//         <img
//           src={`https://app.having.market/public/images/${images[selectedImg].img_name}`}
//           alt=""
//           width="100%"
//           ref={imgContainer}
//         />
//       </div>
//       <div className="view-images">
//         {images.map((e, i) => {
//           return (
//             <div
//               key={i}
//               className={`view-image ${selectedImg == i && "selected"}`}
//               onClick={() => handelSelectingImage(i)}
//             >
//               <img src={imagesURL + e.img_name} width="100%" />
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// export default ImagesSlider;

import React, { useState } from "react";
import PropTypes from "prop-types";
import "./imageSlider.css";

function ImagesSlider({ images }) {
  const imagesURL = "https://app.having.market/public/images/";
  const [selectedImg, setSelectedImg] = useState(0);

  const handleSelectingImage = (imgIndex) => {
    setSelectedImg(imgIndex);
  };

  return (
    <div className="imgs-slider">
      <div className="imgs-main">
        <div className="img-container">
          <img
            src={`${imagesURL}${images[selectedImg].img_name}`}
            alt={`Image ${selectedImg + 1}`}
            className="main-image"
          />
        </div>
      </div>
      <div className="view-images">
        {images.map((image, index) => (
          <div
            key={image.img_name}
            className={`view-image ${selectedImg === index ? "selected" : ""}`}
            onClick={() => handleSelectingImage(index)}
          >
            <div className="thumbnail-container">
              <img
                src={`https://app.having.market/public/images/${images[index].img_name}`}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail-image"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

ImagesSlider.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      task_id: PropTypes.number.isRequired,
      img_name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ImagesSlider;
